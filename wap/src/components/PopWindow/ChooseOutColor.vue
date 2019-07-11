<template>
  <div @click="hide" class="color-box outBox" :class="{'show': visible, 'hide': !visible}" v-show="visible2">
    <div @click.stop class="content">
      <p class="p-btns">
        <yi-touch component-name="span" class="left" @click="cancel">取消</yi-touch>
        <yi-touch component-name="span" class="right" @click="handleSureClick">确认</yi-touch>
      </p>
      <div class="list-box">
        <span class="line top"></span>
        <span class="line bottom"></span>
        <cube-scroll
          v-if="visible2"
          ref="scroll"
          :scroll-events="['scroll','before-scroll-start','scroll-end']"
          @scroll="scroll"
          @scroll-end="scrollEnd"
          class="list-scroll"
        >
          <ul class="ul-box">
            <yi-touch component-name="li" :key="index" class="li" :class="{'over':selectIndex===index}"
                      v-for="(item, index) in colorList" @click="selectColor(item,index)">
                <p class="p-box"><yi-out-color :colors="item"/>
                  <span class="name">{{item.name}}</span>
                </p>
            </yi-touch>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'ChooseOutColor',
  mounted() {
    this.$AlertUtil.saveInstance('chooseOutColor', this);
  },
  beforeDestroy() {
    this.$AlertUtil.removeInstance('chooseOutColor');
  },
  watch: {
    visible(vl) {
      if (!vl) {
        setTimeout(()=>{
          this.visible2 = false;
        }, 800);
      }
    }
  },
  data() {
    return {
      initial: true,
      isScroll: true,
      visible: true,
      visible2: false,
      selectIndex: 0,
      isOther: false,
      colorList: [
        {
          'name': '摩登灰',
          'hex': '#404040'
        }
        // {
        //   name: '无',
        //   colors: {size: 1, color: ['', '']}
        // }
      ],
      onSuccess: null
    };
  },
  methods: {
    handleSureClick() {
      if (this.isScroll) {
        this.onSuccess && this.onSuccess({key: this.selectIndex, value: this.colorList[this.selectIndex]});
        this.hide();
      } else {
        AlertUtil.showToast({txt: '您点太快了', type: 'warn'});
      }
    },
    cancel() {
      this.hide();
    },
    // 选中颜色
    selectColor(obj, index) {
      this.selectIndex = index;

      let div = document.querySelectorAll('.ul-box .li');
      let h = div[0].clientHeight;
      let x = 0;
      let y = -100;
      let time = 1000;
      y = h * index * -1;
      this.$refs.scroll.scrollTo(x, y, time);
      console.log(this.selectIndex);
    },
    // 弹出
    show({selKey, colorList, onSuccess, isOther}) {
      if ((!colorList || colorList === []) && !isOther) {
        AlertUtil.showToast({txt: '无颜色可选', type: 'warn'});
      } else {
        this.visible = true;
        this.visible2 = true;
        this.colorList = colorList;
        this.onSuccess = onSuccess;
        // this.isOther = true;// isOther;

        if (isOther) {
          if (this.colorList !== 'object' && !this.colorList) {
            this.colorList = [];
          }
          let state = true;
          this.colorList.forEach(item=>{
            if (item.name === '其他颜色') {
              state = false;
            }
          });
          state && this.colorList.push({
            'name': '其他颜色',
            'hex': ''
          });
        }

        let fn = setTimeout(() => {
          let listBox = document.querySelectorAll('.outBox .list-box');
          let box = document.querySelectorAll('.outBox .ul-box');
          let div = document.querySelectorAll('.outBox .ul-box .li');
          let l = document.querySelectorAll('.outBox .top');
          let r = document.querySelectorAll('.outBox .line.bottom');
          let h = div[0].clientHeight;
          listBox[0].style.height = `${h * 4}px`;
          box[0].style.paddingTop = `${h}px`;
          box[0].style.paddingBottom = `${h * 2 + 10}px`;
          l[0].style.top = `${h}px`;
          r[0].style.top = `${h * 2}px`;

          // 默认选中状态
          if (selKey && this.colorList[selKey]) {
            this.selNowItem(selKey);
          }
          // 最后处理
          if (selKey === -1 && this.colorList[this.colorList.length - 1]) {
            this.selNowItem(this.colorList.length - 1);
          }

          console.log(this.selectIndex, '10');
          clearTimeout(fn);
        }, 200);
      }
    },
    // 关闭
    hide() {
      this.onSuccess = null;
      this.visible = false;
    },
    // 监听滚动
    scroll() {
      this.isScroll = false;
      // console.log(obj, 'scroll');
    },
    beforeScroll(obj) {
      console.log(obj, 'beforeScroll');
    },
    scrollEnd(obj) {
      console.log('end');
      let index = 0;
      let div = document.querySelectorAll('.ul-box .li');
      let h = div[0].clientHeight;
      let x = 0;
      let y = -100;
      let time = 10;
      index = parseInt(obj.y / h);
      y = index * h;
      if (Math.abs(obj.y) - Math.abs(y) > (h / 2)) {
        index -= 1;
        y = parseInt(index) * h;
      }
      this.selectIndex = Math.abs(index);
      console.log(this.selectIndex);
      if (obj.y % h !== 0) {
        this.$refs.scroll.scrollTo(x, y, time);
      }

      this.isScroll = true;
    },
    // 当前选中的值
    selNowItem(key) {
      if (this.colorList[key]) {
        let div = document.querySelectorAll('.ul-box .li');
        let h = div[0].clientHeight;
        let x = 0;
        let y = key * h * -1;
        let time = 0;

        this.$refs.scroll.scrollTo(x, y, time);
        console.log(key, 'initail');
        this.selectIndex = key;
        console.log(this.selectIndex);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
  .color-box{
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(0,0,0,.4)
    z-index 10001
    display flex
    flex-direction column
    justify-content flex-end
    transition opacity .2s linear
    opacity 0

    .content{
      display flex
      background-color white
      flex-direction column

      .p-btns{
        width 100%
        display flex
        flex-direction row
        justify-content space-between
        background-color #f9f9f9
        line-height px2rem(24)
        color #007AFF
        font-size px2rem(16)

        .left{
          display flex
          padding px2rem(12)
        }
        .right{
          display flex
          padding px2rem(12)
        }
      }
      .list-box {
        display flex
        width 100%
        height 180px
        position relative

        .line{
          position absolute
          left 0
          top 0
          width 100%
          border-top 1px solid #f2f2f2
          z-index 10

          &.top{
            top 0
          }
          &.bottom{
            top px2rem(50)
          }
        }

        .list-scroll{
          width 100%
        }

        .ul-box {
          display flex
          flex-direction column
          width 100%

          .li {
            display flex
            width 100%
            flex-direction row
            justify-content center
            align-content center
            line-height px2rem(28)
            padding px2rem(10) px2rem(0)

            .p-box {
              display flex
              flex-direction row
              justify-content center
              align-content center

              .name {
                margin-left px2rem(6)
                position relative
                top px2rem(-2)
                font-size px2rem(16)
              }
            }
          }
        }
      }
    }
  }


&.show {
  opacity 1

  .content {
    animation-duration: .3s;
    animation-fill-mode: both;
    animation-name: slideInUp;
  }
}
.hide{
  animation-duration: .8s;
  animation-fill-mode: both;
  animation-name: hideBox;

  .content{
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-name: slideOutDown;
  }
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes hideBox {
  from {
    opacity 1
  }

  to {
    opacity 0
  }
}

</style>
