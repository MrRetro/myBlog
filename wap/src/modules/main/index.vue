<template>
  <yi-container>
    <div>
      <!--<Home/>-->
      <Menu/>
    </div>
    <!--<yi-navbar-->
      <!--:navData="dragData.menuData"-->
      <!--title="更多菜单"-->
      <!--type="up"-->
      <!--@onChangeNav="dragData.isShow=true"-->
      <!--@onSelectById="tabClick"-->
    <!--/>-->
    <!--<yi-dragging-->
      <!--:isShow="dragData.isShow"-->
      <!--v-if="dragData.isShow"-->
      <!--:menuData.sync="dragData.menuData"-->
      <!--@onData="onDraggingData"-->
      <!--@onCloseMenu="onCloseMenu"-->
    <!--/>-->
  </yi-container>
</template>

<script>
import {ddApi} from '../../api/dingding';
import Home from './home';
import {menus} from '../../config/menus';
import Menu from '../home/main';
import Page from '../../components/Mixins/BasePage';

const TABS_KEY = 'LOCAL_STORAGE_TABS_KEY';
export default {
  name: 'main-page',
  components: {
    Home,
    Menu
  },
  extends: Page,
  data() {
    let tabs = localStorage.getItem(TABS_KEY);
    let menuData = [];
    let number = 0;
    if (!tabs) {
      menus.forEach(item => item.menus.forEach(t => {
        if (number < 4) {
          menuData.push(t);
          number++;
        }
      }));
    } else {
      let tabsIds = JSON.parse(tabs);
      menuData = tabsIds.map(item => {
        let itemData = {};
        menus.forEach(data => data.menus.forEach(t => {
          if (t.id === item) {
            itemData = t;
          }
        }));
        return itemData;
      });
    }
    return {
      dragData: {
        isShow: false,
        menuData: menuData.map((t, index) => ({...t, index: `${index}`}))
      },
      showLoading: false,
      CREATE_TIME: Date.now()
    };
  },
  watch: {
    activeIndex(value) {
      this.configNav(value);
    }
  },
  methods: {
    canGoBack() {
      ddApi.close();
      console.log('关闭');
      return false;
    },
    tabClick(index) {
      if (index < 4) {
        this.dragData.menuData[index].route();
      } else {
        this.dragData.isShow = true;
      }
    },
    // 菜单返回
    onDraggingData(data) {
      localStorage.setItem(TABS_KEY, JSON.stringify(data.map(item => item.id)));
      console.log(localStorage.getItem(TABS_KEY));
      this.dragData.menuData = data;
    },
    // 菜单收起
    onCloseMenu() {
      this.dragData.isShow = false;
    },
    // 选中菜单
    onSelectById(id) {
      console.log('选中id===>', id);
    }
  },
  activated() {
    ddApi.setTitle({title: '宜买车'});
    ddApi.setRight({
      text: '更多',
      onSuccess: () => {
        ddApi.share({type: 2});
      }
    });
    // ddApi.setRight({
    //   text: '个人中心',
    //   onSuccess: ()=>{
    //     console.log('跳转到个人中心');
    //     this.$RouteUtil.clientEditInfo({onSuccess:this.params.onSuccess});
    //   }
    // });
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  >>> .md-tab-bar {
    height 0
    overflow: hidden
  }

  >>> .md-tabs {
    flex none
  }

  .content {
    width 100%
    height calc(100% - 2.56rem)
    position relative
    overflow hidden
  }

  .tab-bar {
    width 100%
    flex-direction row
    display flex
    float bottom
    height px2rem(60)
    background-color #F8F8F8
    border-top-color #333333
  }


</style>
