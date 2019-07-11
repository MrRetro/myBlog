<template>
  <div class="nav-container">
    <div class="nav-left">
      <img class="nav-arrows-icon" v-if="!hideBack" @click="handleLeftClick" :src="$images.base.arrows_left"/>
      <img class="nav-close-icon" v-if="!hideClose" :src="$images.all.cancel"/>
      <slot name="left"/>
    </div>
    <div class="nav-center">
      <span class="nav-title-text">{{title}}</span>
    </div>
    <div v-if="right && right.text && right.show" class="nav-right" style="right:50px;" @click="handleRightClick">
      {{right.text}}
    </div>
    <div v-if="menus && menus.items" class="nav-right" @click="menuShow = !menuShow">
      ...
    </div>
    <div class="nav-menu" v-if="menuShow">
      <div class="menu-item" v-for="item in menus.items" :key="item.id" @click="handleMenuClick(item)">
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
import {BackHandler} from '../../../../utils/handleBack';

export default {
  name: 'NavBar',
  props: {
    hideBack: Boolean,
    hideClose: Boolean,
    title: String,
    right: Object,
    menus: Object
  },
  data() {
    return {
      menuShow: false
    };
  },
  methods: {
    handleLeftClick() {
      BackHandler.handleBackAction();
    },
    handleRightClick() {
      this.right.control && this.right.onSuccess && this.right.onSuccess();
    },
    handleMenuClick(data) {
      this.menus.onSuccess && this.menus.onSuccess({id: data.id});
      this.menuShow = false;
    }
  }
};

</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .nav-container {
    display flex
    width 100%
    align-items center
    background-color #0006
    height $headerHeight
    z-index 9999
  }

  .nav-center {
    position absolute
    left px2rem(80)
    right px2rem(80)
    align-items center
    justify-content center
  }

  .nav-title-text {
    color #fff
    font-size px2rem(15)
    word-break keep-all
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    semibold()
  }

  .nav-left {
    display flex
    flex-direction row
    margin-left px2rem(20)
    float left
    align-items center
  }

  .nav-right {
    position absolute
    right px2rem(20)
    color #fff
  }

  .nav-arrows-icon {
    width px2rem(18)
    height px2rem(14)
  }

  .nav-close-icon {
    width px2rem(14)
    height px2rem(14)
    margin-left px2rem(24)
  }

  .nav-menu {
    position absolute
    right 10px
    top 40px
    background-color white
    border-color #333333
    border-width 1px;
    border-style double
    z-index 2000
    .menu-item {
      color black
      padding 10px
    }
  }

</style>
