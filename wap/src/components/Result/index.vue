<template>
  <div class="suc-box">
    <img v-if="form.type==='success'" class="img" :src="$images.all.ico_ok"  alt="img">
    <img v-if="form.type==='fail'" class="img" :src="$images.all.ico_err"  alt="img">
    <p class="p-name">{{ form.title }}</p>
    <div class="p-word-box">
      <p class="p-word" v-for="(item, index) in form.content" :key="index">{{ item.value }}</p>
    </div>
    <div class="btn-box">
      <p
        class="p-btn"
        :class="{'odd': index % 2 === 1}"
        v-for="(item, index) in form.btn"
        :key="index">
        <yi-touch component-name="p" class="sp-btn" @click="item.event">{{ item.name }}</yi-touch>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'result',
  props: {
    form: Object,
    default: {
      type: 'success',
      title: '',
      content: '',
      btn: [{
        name: '查看详细',
        event: ()=>{}
      }]
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .suc-box{
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow-y auto
    flex-direction column
    align-items center

    .img{
      width px2rem(60)
      margin-top px2rem(60)
    }
    .p-name{
      font-size px2rem(20)
      color #31363B
      margin-top px2rem(30)
      medium()
    }
    .p-word-box{
      padding px2rem(10) px2rem(14)
    }
    .p-word{
      font-size px2rem(14)
      color $darkBlack
      line-height px2rem(20)
    }
    .btn-box{
      display flex
      flex-direction row
      justify-content space-between
      margin-top px2rem(20)
    }
    .p-btn{
      display flex
      flex 1
      flex-direction row
      justify-content center
      margin-left px2rem(10)
      border-radius px2rem(4)
      height px2rem(50)
      line-height px2rem(50)
      text-align center
      color white
      font-size px2rem(16)
      margin-top px2rem(10)
      border 1px solid #348EED
      color #348EED

      &.odd{
        color #fff
        background-color #348EED
        margin-right px2rem(10)

        span{
          color $deepBlack
        }
      }
      &:active{
        opacity .8
      }
      .sp-btn{
        width 100%
        height 100%
        display inline-block
      }
    }
  }
</style>
