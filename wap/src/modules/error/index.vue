<template>
  <div class="app-init contain">
    <img
      :src="$images.error.ic_blank"
      class="icon">
    <div class="error-text">{{ message }}</div>
    <yi-touch
      v-if="!hideBtn"
      @click="btnParams.click"
      class="btn">{{btnParams.title}}
    </yi-touch>
  </div>
</template>

<script>
import BasePage from '../../components/Mixins/BasePage';
import {ddApi} from '../../api/dingding';

export default {
  name: 'error',
  mixins: [BasePage],
  computed: {
    message() {
      return this.params.message || '发生错误';
    },
    hideBtn() {
      return this.params.hideBtn;
    },
    btnParams() {
      return this.params.btnParams || {
        title: '重试',
        click: ()=>this.retry()
      };
    }
  },
  methods: {
    retry() {
      $eventBus.$emit('reInit');
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .contain {
    display flex
    flex-direction column
    align-items center
    .icon {
      width px2rem(160)
      height px2rem(100)
      margin-top px2rem(200)
    }
    .error-text{
      font-size px2rem(14)
      color $deepBlack
      margin-top px2rem(20)
    }
  }

  .btn {
    width px2rem(160)
    height px2rem(35)
    background-color $themeColor
    color white
    line-height px2rem(35)
    border-radius px2rem(5)
    font-size px2rem(14)
    margin-top px2rem(40)
  }

</style>
