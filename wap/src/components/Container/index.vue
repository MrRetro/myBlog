<template>
  <div class="base-container">
    <!--<nav-bar v-show="showNav" :hide-back="hideBack" :hide-close="hideClose" :title="title">-->
      <!--<slot slot="left" name="nav-left"/>-->
      <!--<slot slot="right" name="nav-right"/>-->
    <!--</nav-bar>-->
    <div class="base-content" v-show="!showError">
      <slot/>
    </div>
    <div v-if="showError" class="full-view">
      <slot name="error-view">
        <yi-error-view :message="errorMessage" :hide-btn="hideBtn" :src="errorSrc" :btn-params="errorBtnParams"/>
      </slot>
    </div>
    <transition name="fade">
      <div v-show="showLoading" style="z-index: 1000;" class="full-view" :class="{'no-nav':!showNav}">
        <slot name="loading-view">
          <div
            class="loading-view">
            <img style="width: 25%"  src="../../../static/loading.gif"/>
            <div class="loading_text">正在加载...</div>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'container',
  components: {
    NavBar
  },
  props: {
    title: String,
    showNav: Boolean,
    hideClose: Boolean,
    hideBack: Boolean,
    showError: Boolean,
    showLoading: Boolean,
    hideBtn: Boolean,
    errorSrc: String,
    errorBtnParams: Object,
    errorMessage: {
      type: String,
      default: '发生错误了'
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .base-container {
    position fixed;
    flex-direction: column;
    width 100%;
    height 100%;
  }

  .full-view {
    position: absolute;
    top: $headerHeight;
    z-index 1
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .loading_text{
    color: #8D8D8D;
    font-size: 14px;
    margin-top: 10px;
  }
  .base-content {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    flex-direction column
    display flex
  }

  .no-nav {
    top: 0;
  }

  .error-view {
    background-color: white;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size px2rem(14)
    z-index 1
  }

  .loading-view {
    background-color: white;
    flex: 1;
    display: flex;
    flex-direction column
    align-items: center;
    justify-content: center;
    z-index 1
  }
</style>
