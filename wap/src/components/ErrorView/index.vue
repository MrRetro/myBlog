<template>
  <div class="contain">
    <img
      :src="src"
      class="icon">
    <div class="error-text">{{ message }}</div>
    <yi-touch
      v-if="!hideBtn"
      @click="btnClick"
      class="btn">{{btnParams.title}}
    </yi-touch>
  </div>
</template>

<script>

export default {
  name: 'ErrorView',
  props: {
    src: {
      type: String,
      default: require('../../assets/images/error/ic_blank.png')
    },
    message: {
      type: String,
      default: '发生错误'
    },
    hideBtn: {
      type: Boolean,
      default: true
    },
    btnParams: {
      type: Object,
      default: ()=>({
        title: '重试',
        click: ()=>$eventBus.$emit('reInit')
      })
    }
  },
  methods: {
    btnClick() {
      this.btnParams.click && this.btnParams.click();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .contain {
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    display flex
    flex-direction column
    justify-content center
    align-items center
    .icon {
      width px2rem(160)
      height px2rem(100)
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
