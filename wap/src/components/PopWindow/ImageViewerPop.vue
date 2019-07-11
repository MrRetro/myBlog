<template>
  <image-viewer
    class="viewer"
    v-model="visible"
    :list="images"
    :has-dots="true"
    :initial-index="activeIndex">
  </image-viewer>
</template>

<script>
import {ImageViewer} from 'mand-mobile';
import {AlertUtil} from '../../utils/AlertUtil';


export default {
  name: 'ImageViewerPop',
  components: {
    ImageViewer
  },
  data() {
    return {
      images: [],
      activeIndex: 0,
      visible: false,
      onSuccess: () => {
      }
    };
  },
  methods: {
    /**
       * 显示图片预览
       * @param images
       * @param activeIndex
       */
    show({images, activeIndex = 0}) {
      this.images = images;
      this.activeIndex = activeIndex;
      this.visible = true;
    },
    hide() {
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('imageViewer', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('imageViewer');
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
    background-color #FFF5
  }

  >>> .viewer-item-wrap .item {
    left 0
    right 0
    top 50%
    bottom 0
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
