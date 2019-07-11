<template>
  <div class="funnel-box">
    <ul class="ul-box">
      <li class="li-box" v-for="(item,index) in titles" :key="'li'+index">
        <p class="name">
          <span
            class="color"
            :class="{
              'color1': index === 0,
              'color2': index === 1,
              'color3': index === 2,
              'color4': index === 3,
            }"
          ></span>
          {{item.name | wordEnd}}
        </p>
        <p class="value">{{item.value | number}}</p>
      </li>
    </ul>
    <div class="angle-box">
      <div class="angle">
        <p
          class="p-box"
          :class="{
              'color1': index === 0,
              'color2': index === 1,
              'color3': index === 2,
              'color4': index === 3,
            }"
          v-for="(item,index) in titles" :key="'p'+index">
        </p>
        <p class="angle-left"></p>
        <p class="angle-right"></p>
      </div>
      <div class="titles">
        <p class="p-line" v-for="(item,index) in titles" :key="index">
          <span
            class="line"
            :class="{
              'color1': index === 0,
              'color2': index === 1,
              'color3': index === 2,
              'color4': index === 3,
              'line1': index === 0,
              'line2': index === 1,
              'line3': index === 2,
              'line4': index === 3,
            }"
          ></span>
          <span
            class="name"
            :class="{
              'fontColor1': index === 0,
              'fontColor2': index === 1,
              'fontColor3': index === 2,
              'fontColor4': index === 3,
            }"
          >
            {{item.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Numeral from 'numeral';

export default {
  name: 'funnel',
  props: {
    form: {
      type: Array,
      default: ()=>{
        return [
          {
            name: '线索',
            value: 392480
          },
          {
            name: '签约合同',
            value: 392470
          },
          {
            name: '跟进线索',
            value: 3924
          },
          {
            name: '完成合同',
            value: 392
          }
        ];
      }
    }
  },
  watch: {
    form() {
      this.calcAngle();
    }
  },
  filters: {
    number(vl) {
      return Numeral(vl).format('0,00');
    },
    wordEnd(vl) {
      return `${vl}数`;
    }
  },
  mounted() {
    this.calcAngle();
    window.addEventListener('resize', this.reloadWindow, false);
  },
  data() {
    return {
      titles: this.form
    };
  },
  methods: {
    reloadWindow() {
      // window.location.reload();
      setTimeout(()=>{
        this.calcAngle();
      }, 500);

    },
    calcAngle() {
      // 计算有多少层沙漏
      let len = this.form.length;
      let angle = 200 / 120; // tan@
      let divPre = document.querySelectorAll('.angle');
      // 总高度
      let height = divPre[0].clientHeight;
      let div = document.querySelectorAll('.p-box');
      let divLineBox = document.querySelectorAll('.p-line');
      let line = document.querySelectorAll('.p-line .line');
      let boxH = height / len;
      if (len > 1) {
        boxH -= 2;
      }
      console.log('-------------------高度---------------------------');
      console.log(div);
      console.log(height);
      // debugger;
      for (let i = 0; i < len; i++) {
        console.log('div的高度=>', div[i].clientHeight);
        div[i].style.height = `${boxH}px`;
        divLineBox[i].style.height = `${boxH}px`;
        let lineH = height - (boxH + 2) * (i + 1) + boxH / 2;
        line[i].style.width = `${lineH / angle + 20}px`;
        // debugger;
      }
    }
  },
  destroyed() {
    // window.removeEventListener('resize',this.reloadWindow);
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.funnel-box{
  display flex
  width 100%
  padding px2rem(8) px2rem(15) px2rem(20)
  flex-direction column

  .color1{
    background-color #FFB980
  }
  .fontColor1{
    color #FFB980
  }
  .color2{
    background-color #5AB1EF
  }
  .fontColor2{
    color #5AB1EF
  }
  .color3{
    background-color #FA6F85
  }
  .fontColor3{
    color #FA6F85
  }
  .color4{
    background-color #18D4AE
  }
  .fontColor4{
    color #18D4AE
  }
  .ul-box{
    display flex
    flex-direction row
    justify-content space-between
    width 100%
    flex-wrap wrap

    .li-box{
      font-size px2rem(14)
      line-height px2rem(20)
      color #2E3443
      display flex
      width 45%
      flex-direction row
      justify-content space-between
      margin-top px2rem(12)

      .name{
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
      }
      .color{
        width px2rem(10)
        height px2rem(6)
        margin-right px2rem(6)
        display inline-block
      }
    }
  }
  .angle-box{
    display flex
    width 100%
    flex-direction row
    justify-content center
    position relative

    .angle{
      width px2rem(240)
      height px2rem(200)
      margin-top px2rem(28)
      /*background-color wheat*/
      overflow hidden

      .p-box{
        width 100%
        height px2rem(48)
        border-bottom px2rem(2) solid white
      }
    }
    .angle-left{
      position absolute
      left px2rem(52)
      top px2rem(26)
      width: 0px;
      height: 0px;
      width: 0;
      height: 0;
      border-bottom: px2rem(220) solid white;
      border-right: px2rem(140) solid transparent;
    }
    .angle-right{
      position absolute
      right  px2rem(52)
      top px2rem(26)
      width: 0;
      height: 0;
      border-bottom: px2rem(220) solid white;
      border-left: px2rem(140) solid transparent;
    }

    .titles{
      position absolute
      top px2rem(28)
      right 0
      width 50%
      height px2rem(260)
      z-index 100

      .p-line{
        display flex
        flex-direction row
        align-items center
        width 100%
        height px2rem(48)
        border-bottom px2rem(2) solid rgba(0,0,0,0)

        .line{
          display flex
          height 1px
          margin-right px2rem(6)
        }
        .line1{
          width px2rem(118)
        }
        .line2{
            width px2rem(88)
        }
        .line3{
            width px2rem(58)
        }
        .line4{
            width px2rem(28)
        }
      }
    }
  }
}
</style>
