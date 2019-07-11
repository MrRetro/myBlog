<template>
  <div class="btn-box">
    <template v-for="(item,index) in buttons">
      <yi-touch class="btn left"
                :auth="item.auth"
                :style="{flex:item.flex || 1,borderRightWidth:index === buttons.length - 1 ?'0px':'1px'}"
                :class="{right:index === buttons.length - 1}" :key="index" @click="handleClick(item)">
        <span style="display: flex;align-items: center">
          <yi-image class="img" :src="item.icon"/>
          <span>{{item.title}}</span>
        </span>
      </yi-touch>
      <!--<p v-else class="btn right" :key="index" @click="onInquiryClick">-->
      <!--<img class="img" :src="$images.all.ico_money" alt="">-->
      <!--<span>询价</span>-->
      <!--</p>-->
    </template>
  </div>
</template>

<script>

export default {
  name: 'btn-box',
  props: {
    buttons: {
      type: Array
    }
  },
  methods: {
    handleClick({click}) {
      click && click();
    }
    // // 跟进回调
    // onFollowClick() {
    //   this.$emit('onFollowClick');
    // },
    // // 询价回调
    // onInquiryClick() {
    //   this.$emit('onInquiryClick');
    // }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .btn-box {
    display flex
    width 100%
    height px2rem(50)
    flex-direction row
    position fixed
    bottom 0
    left 0
    border-top-color $lightGray
    border-top-width 1px
    border-top-style double

    .btn {
      font-size px2rem(16)
      display flex
      flex-direction row
      justify-content center
      align-items center
      height 100%
      flex 1
      background-color #F6FBFF
      border-right-color $lightGray
      border-right-width 1px
      border-right-style double

      &.left {
        span {
          color #348EED
          margin-left px2rem(5)
        }
      }

      &.right {
        background-color #348EED

        span {
          color #fff
          margin-left px2rem(5)
        }
      }

      .img {
        width px2rem(14)
        height px2rem(14)
      }
    }
  }

</style>
