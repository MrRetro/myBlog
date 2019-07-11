<template>
  <transition name="fade">
    <div class="contain" v-if="visible">
      <cube-loading :size="40"></cube-loading>
    </div>
  </transition>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';


export default {
  name: 'LoadingPop',
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleItemClick(index) {
      this.onSuccess && this.onSuccess(this.menus[index]);
      this.hide();
    },
    /**
       * 显示弹窗
       */
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('loading', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('loading');
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    position absolute
    top 0
    left 0;
    right 0
    bottom 0
    z-index 9999
    background-color #0003
    display flex
    align-items center
    justify-content center
  }

  .pop-content {
    width px2rem(110)
    position absolute
    right px2rem(14)
    border-radius px2rem(4)
    background-color white
    display flex
    overflow hidden
    flex-direction column

    .item {
      align-items center
      display flex
      justify-content center
      height px2rem(40)
      padding 0 px2rem(10)
      font-size px2rem(14)
      color $deepBlack
      regular()
      border-bottom-style double
      border-bottom-color $lightGray
      border-bottom-width 1px
    }
  }
</style>
