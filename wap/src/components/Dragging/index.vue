<template>
  <div class="dragging-box" :class="isShow && isShowLoc ?'show':'hide'">
    <div class="drag-content" :class="isShow && isShowLoc ?'show':'hide'">
      <div class="zhezhao" @click="onCloseNav"></div>
      <div class="menu-list" v-on:scroll.passive="()=>{}">
        <div
          v-for="item in menus"
          :key="item.id"
          class="menu-li"
          :class="{'isNoBorder':item.menus.length<=0}"
        >
          <div v-if="item.menus.length>0">
            <p class="title">{{item.name}}</p>
            <ul class="item-box">
              <li
                v-for="subItem in item.menus"
                :key="subItem.id"
                class="item-li"
                :rel="subItem.id"
                @touchstart="handleTouchStart"
                @touchmove="isScroll"
              >
                <p class="p-word">
                  <img class="img" :src="subItem.icon" />
                  <span class="name">{{subItem.name}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <p class="p-info">长按图标可以拖动调整位置</p>
      </div>
    </div>
    <!--底部菜单-->
    <yi-navbar
      :navData.sync="menuList"
      :hover="hover"
      title="收起菜单"
      type="down"
      @onChangeNav="onCloseNav"
    />
  </div>
</template>

<script>
import {menus} from '../../config/menus';
import Menus from '../../components/Mixins/Menus';

let MENUS_TABLE = {};
menus.forEach(item => item.menus.forEach(subItem => MENUS_TABLE[subItem.id] = subItem));

export default {
  name: 'dragging',
  mixins: [Menus],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array
    }
  },
  watch: {
    menuData(vl) {
      this.menuList = vl;
    }
  },
  data() {
    return {
      // 组件显示
      isShowLoc: true,
      // 列表滚动高度
      scrollTop: 0,
      // 定时器
      timeOutEvent: 0,
      // 可移动元素
      itemDiv: null,
      // 鼠标初次点击的x,y坐标
      mousePostion: {x: 0, y: 0},
      // 底部菜单拦实际x,y坐标组
      menuPosition: {
        tab1: {x: 0, y: 0},
        tab2: {x: 0, y: 0},
        tab3: {x: 0, y: 0},
        tab4: {x: 0, y: 0},
        tab5: {x: 0, y: 0}
      },
      // 被拖拽的信息
      idObj: {id: '', name: ''},
      // 菜单被拖放的下标索引
      hover: -1,
      // 菜单数据
      menuList: this.menuData,
      // 滚动 (如果是滚动那个就阻断长按和单击)
      isScrolling: false
    };
  },
  methods: {
    // 阻止浏览器事件
    disabledMouseWheel() {
      document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
      document.addEventListener('mousewheel', this.scrollFunc, false);
      window.addEventListener('touchmove', this.disabledMouseWheel2, false);
    },
    disabledMouseWheel2(e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      return false;
    },
    // 取消阻止浏览器事件
    cancelDisMouseWheel() {
      document.removeEventListener('DOMMouseScroll', this.scrollFunc, false);
      document.removeEventListener('mousewheel', this.scrollFunc, false);
      window.removeEventListener('touchmove', this.disabledMouseWheel2, false);
    },
    scrollFunc(evt) {
      evt = evt || window.event;
      if (evt.preventDefault) {
        // Firefox
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        // IE
        evt.cancelBubble = true;
        evt.returnValue = false;
      }
      return false;
    },
    // 点击菜单
    handleTouchStart() {
      this.isScrolling = false;
      this.cancelDisMouseWheel();
    },
    // 正在滚动
    isScroll() {
      this.isScrolling = true;
      // 阻断单击和长按
    },
    // 获取底部四个主菜单坐标
    getTabPosition() {
      const menus1 = document.querySelectorAll('.nav-box .item-li');
      // 菜单在浏览器的y偏移量
      const menuY = document.querySelector('.nav-box').offsetTop;
      for (let j = 1, len = 6; j < len; j++) {
        // console.log(menus[j - 1]);
        this.menuPosition[`tab${j}`].x = menus1[j - 1].offsetLeft;
        this.menuPosition[`tab${j}`].y = menuY;
      }
      // console.log(this.menuPosition);
    },
    // 开始按
    gtouchstart(div) {
      this.itemDiv = div;
      this.idObj.id = div.getAttribute('rel');
      this.idObj.name = div.innerText;
      this.timeOutEvent && clearTimeout(this.timeOutEvent);
      this.timeOutEvent = setTimeout(this.longPress, 500);// 这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
      return false;
    },
    // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gtouchend() {
      // 删除可移动的div
      const div = document.querySelector('.item-fixed');
      div && div.remove();
      // 清除选中，替换数据
      const menuItem = document.querySelector('.nav-box .item-li.hover');
      const menuItems = document.querySelectorAll('.nav-box .item-li');
      let state = false;
      for (let k = 0, len = menuItems.length; k < len; k++) {
        if (this.idObj.id === menuItems[k].getAttribute('rel')) {
          state = true;
          console.log('菜单已存在');
        }
      }

      // 拖到指定位置 并且菜单不存在
      if (menuItem && !state) {
        if (!state && this.idObj.id !== '') {
          menuItem.setAttribute('rel', this.idObj.id);
          menuItem.querySelector('.name').innerHTML = this.idObj.name;
        }

        // 鼠标左键弹起 回调出当前菜单列表
        const index1 = menuItem.getAttribute('index');
        console.log('index1', index1);
        console.log('this.menuList', this.menuList);
        console.log('MENUS_TABLE', MENUS_TABLE);
        let newData = this.menuList.map((item) => {
          if (item.index === index1) {
            item.id = this.idObj.id;
            item.name = this.idObj.name.trim();
            item = MENUS_TABLE[item.id];
          }
          return item;
        });
        newData[index1].index = index1;
        console.log('onData', newData);
        this.$emit('onData', newData);
      }
      menuItem && menuItem.classList.remove('hover');
      clearTimeout(this.timeOutEvent);// 清除定时器
      if (this.timeOutEvent !== 0) {
        // 这里写要执行的内容（尤如onclick事件）
        console.log('你这是点击，不是长按', this.idObj);

        if (this.isScrolling) {
          return false;
        }
        this.menus.forEach(item => item.menus.forEach(t => {
          if (t.id === this.idObj.id) {
            t.route();
            this.onCloseNav();
          }
        }));

      }

      return false;

    },
    // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gtouchmove() {
      clearTimeout(this.timeOutEvent);// 清除定时器
      this.timeOutEvent = 0;
    },
    // 真正长按后应该执行的内容
    longPress() {
      if (!this.isScrolling) {
        this.timeOutEvent = 0;
        // 执行长按要执行的内容，如弹出菜单
        console.log('长按事件触发发');

        // 创建可移动div
        this.gtouchmove();
        console.log(3);
        // 创建可移动的div
        // const newDiv = this.itemDiv;
        const newDiv = document.createElement('div');
        newDiv.classList.add('item-fixed');
        let x = 0;
        let y = 0;
        if (this.itemDiv) {
          x = this.itemDiv.offsetLeft;
          y = this.itemDiv.offsetTop - this.scrollTop;
          // console.log(x, '=====>', y);
          newDiv.style.left = `${x}px`;
          newDiv.style.top = `${y}px`;
        }
        document.body.appendChild(newDiv);
      }

      this.disabledMouseWheel();
    },
    // 菜单收起
    onCloseNav() {
      this.isShowLoc = false;
      let fn = setTimeout(() => {
        this.isShowLoc = true;
        this.$emit('onCloseMenu');
        clearTimeout(fn);
      }, 500);

      // 获取鼠标当前位置;
      document.removeEventListener('touchstart', this.documentTouchStart, false);

      // 鼠标移动
      document.removeEventListener('touchmove', this.documentTouchMove, false);
    },
    // 全局touch
    documentTouchStart(evt) {
      const touch = evt.touches[0]; // 获取第一个触点
      const demoX = Number(touch.pageX); // 页面触点X坐标
      const demoY = Number(touch.pageY); // 页面触点Y坐标
      this.mousePostion.x = demoX;
      this.mousePostion.y = demoY;

      if (this.itemDiv) {
        this.mousePostion.x -= this.itemDiv.offsetLeft;
        this.mousePostion.y -= this.itemDiv.offsetTop;
      }

      console.log('x===>', demoX, 'y===>', demoY);
      // console.log('x1===>', this.itemDiv.offsetLeft, 'y2===>', this.itemDiv.offsetTop);
    },
    // 全局移动
    documentTouchMove(evt) {

      const touch = evt.touches[0]; // 获取第一个触点
      const demoX = Number(touch.pageX); // 页面触点X坐标
      const demoY = Number(touch.pageY); // 页面触点Y坐标
      const newDiv = document.querySelector('body .item-fixed');
      // const menuDiv = document.querySelectorAll('.nav-box .item-li');
      if (newDiv) {
        const left = demoX - this.mousePostion.x;
        const top = demoY - this.mousePostion.y - this.scrollTop;
        newDiv.style.left = `${left}px`;
        newDiv.style.top = `${top}px`;

        const ban = (this.menuPosition.tab2.x / 2);
        if (
          left > -ban &&
      left < this.menuPosition.tab2.x - ban &&
      top >= this.menuPosition.tab1.y - 31 &&
      top < this.menuPosition.tab1.y + 31
        ) {
          // console.log('001');
          // menuDiv[0].classList.add('hover');
          this.hover = 0;
        } else if (
          left > this.menuPosition.tab2.x - ban &&
      left < this.menuPosition.tab3.x - ban &&
      top >= this.menuPosition.tab2.y - 31 &&
      top < this.menuPosition.tab2.y + 31
        ) {
          // console.log('002');
          // menuDiv[1].classList.add('hover');
          this.hover = 1;
        } else if (
          left > this.menuPosition.tab3.x - ban &&
      left < this.menuPosition.tab4.x - ban &&
      top >= this.menuPosition.tab3.y - 31 &&
      top < this.menuPosition.tab3.y + 31
        ) {
          // console.log('003');
          // menuDiv[2].classList.add('hover');
          this.hover = 2;
        } else if (
          left > this.menuPosition.tab4.x - ban &&
      left < this.menuPosition.tab5.x - ban &&
      top >= this.menuPosition.tab4.y - 31 &&
      top < this.menuPosition.tab4.y + 31
        ) {
          // console.log('004');
          // menuDiv[3].classList.add('hover');
          this.hover = 3;
        } else {
          // console.log('other');
          this.hover = -1;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 监听列表滚动高度
      const scrollList = document.querySelector('.dragging-box .menu-list');
      scrollList.addEventListener('scroll', () => {
        this.scrollTop = scrollList.scrollTop;
      });

      // 获取四个主菜单位置坐标
      this.getTabPosition();

      window.onresize = ()=>{
        this.getTabPosition();
      };
      // console.log(this.menuPosition, '===>pos');
    });

    // 禁用右击事件
    document.oncontextmenu = () => {
      return false;
    };
    // 长按菜单图标
    const item = document.querySelectorAll('.dragging-box .menu-list .item-li');
    // console.log('anniu', item.length);
    for (let i = 0, len = item.length; i < len; i++) {
      item[i].addEventListener('touchstart', () => {
        this.gtouchstart(item[i]);
        // console.log('1');
      });
      item[i].addEventListener('touchend', () => {
        this.gtouchend && this.gtouchend(item[i]);
        // console.log('2');
      });
    }
    console.log(this.isShow, 'isShow');
    // 鼠标点击 获取鼠标坐标
    // 获取鼠标当前位置;
    document.addEventListener('touchstart', this.documentTouchStart, false);

    // 鼠标移动
    document.addEventListener('touchmove', this.documentTouchMove, false);
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .dragging-box {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: calc(100% - 2.56rem);
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: rgba(0, 0, 0, .6);
    z-index: 1001;

    animation-duration: .5s;
    animation-fill-mode: both;

    .drag-content {
      display flex
      flex 1
      flex-direction column
      animation-duration: .3s;
      animation-fill-mode: both;

      .zhezhao{
        position: absolute;
        width: 100%
        height: 40px;
        top: 0px;
        left: 0px;
      }
    }
    .drag-content.show {
      animation-name: fadeInUp;
    }
    .drag-content.hide {
      animation-name: fadeOutDown;
    }
  }

  .dragging-box.show {
    animation-name: fadeIn;
  }

  .dragging-box.hide {
    animation-name: fadeOut;
  }

  .dragging-box .p-info {
    background-color: white;
    font-size: 14px;
    color: #c1c1c1;
    line-height: 20px;
    margin-bottom 12px
  }

  .dragging-box .menu-list {
    display: block;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-top: 40px;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow-y: auto;
  }

  .dragging-box .menu-li {
    width: 100%;
    padding-bottom 20px
    border-top: 10px solid #f3f3f3;

    &:nth-child(1){
      border:none;
    }

    &.isNoBorder{
      border-top none
    }
  }

  .dragging-box .menu-li .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 15px;
    font-size: 16px;
    color: #31363B;
    margin-top 20px
    medium()
  }

  .dragging-box .menu-li .item-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #8D8D8D;
    /*border-bottom: 1px solid #f3f3f3;*/
  }
  .dragging-box .menu-li .item-box .p-word{
    display flex
    flex-direction column
    align-items center
  }

  .dragging-box .menu-li .item-box .item-li {
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;
    /*padding-bottom: 10px;*/
  }

  .dragging-box .menu-li .item-box .item-li .img {
    width: px2rem(28);
    height: px2rem(28);
    display: inline-block;
    border-radius: 4px;
    margin-bottom: 4px;
    pointer-events: none;
  }
  .dragging-box .menu-li .item-box .item-li .name{
    line-height 17px
  }

  @keyframes fadeIn {
    from {
      opacity 0
    }

    to {
      z-index 1000
      opacity 1
    }
  }

  @keyframes fadeOut {
    from {
      opacity 1
    }

    to {
      z-index -1
      opacity 0
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
