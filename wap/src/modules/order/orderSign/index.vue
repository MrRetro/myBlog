<template>
  <yi-container>
    <Signature class="signature" w="90%" h="65%" ref="signature"/>
    <div class="button-contain">
      <yi-touch class="button cancel" @click="cancel">取消</yi-touch>
      <div style="flex:1"/>
      <yi-touch class="button cancel" @click="clear">重置</yi-touch>
      <yi-touch class="button" @click="save">确认签名</yi-touch>
    </div>
    <div v-if="showImage"  class="img-contain">
      <img class="image box-shadow" @click="showImage = false" :src="imageData"/>
    </div>
  </yi-container>
</template>

<script>
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';
import Signature from './Signature';

export default {
  name: 'OrderSign',
  extends: Page,
  components: {
    Signature
  },
  data() {
    return {
      showImage: false,
      imageData: ''
    };
  },
  activated() {
    ddApi.setRight();
  },
  mounted() {
    ddApi.rotateView({
      onSuccess: () => {

      }
    });
  },
  beforeDestroy() {
    ddApi.resetView();
  },
  methods: {
    clear() {
      this.$refs.signature.clear();
    },
    save() {
      let png = this.$refs.signature.save();
      console.log(png);
      this.showImage = true;
      this.imageData = png;
      this.clear();
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .signature{
    align-self center
    margin-top 20px
    border: 4px dashed #E9F4FF;
  }
  .button-contain {
    margin 18px
    display flex;
    .button {
      flex 1
      width 100px
      height 40px
      background-color $themeColor
      color white;
      border-radius 4px
      line-height 40px
      font-size 16px
      margin 10px
    }
    .cancel{
      background-color white
      color $themeColor
      border: 1px solid #348EED;
      border-radius: 4px;
    }
  }

  .img-contain {
    position absolute;
    top 0;
    right 0;
    bottom 0;
    left 0;
    background-color $modelBg
    .image {
      position absolute;
      top 10%
      left 10%
      width 80%
      height 80%
    }
  }

</style>
