<template>
  <yi-touch
    class="deal-box"
    :class="{
      'voilet':color==='voilet',
      'pink':color==='pink',
      'orange':color==='orange',
      'coffee':color==='coffee',
      'blue':color==='blue',
      'yellow':color==='yellow'
    }"
    @click="onBacklog(color,form)"
  >
      <p class="p-box">
        <img class="img-bg" :src="$images.work.card_bg" alt="img-bg">
        <span class="title">
          {{form.title}}：
        </span>
      </p>
      <div class="count-box">
        <p class="count"><span class="sp-number">{{form.count}}</span>条</p>
        <p class="count-add">今日新增{{form.count}}条</p>
      </div>
  </yi-touch>
</template>

<script>
export default {
  name: 'deal-card',
  props: {
    color: {
      type: String,
      // violet|紫色 pink|粉红 orange|橙 coffee|咖啡 blue|蓝 yellow|黄
      default: 'violet'
    },
    form: {
      type: Object,
      default: ()=>{
        return {
          code: '',
          title: '',
          count: 0,
          addCount: 0
        };
      }
    }
  },
  methods: {
    // 点击回调
    onBacklog(type, data) {
      this.$emit('onBacklog', {type, data});
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.deal-box{
  display flex
  flex-direction column
  justify-content space-between
  background-image: linear-gradient(-180deg, #7B8AFF 0%, #4C59FE 100%);
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.15);
  border-radius: px2rem(8);
  width 100%
  height px2rem(174)
  margin-right px2rem(14)

  &.violet{
    background-image: linear-gradient(-180deg, #7B8AFF 0%, #4C59FE 100%);
  }
  &.pink{
    background-image: linear-gradient(-180deg, #FF73A0 0%, #FD4B85 100%);
  }
  &.orange{
    background-image: linear-gradient(-180deg, #F78243 0%, #F77248 98%);
  }
  &.blue{
    background-image: linear-gradient(-180deg, #26B6FD 0%, #0098EA 100%);
  }
  &.yellow{
    background-image: linear-gradient(-180deg, #FFAF1B 0%, #F5A300 95%);
  }

  .p-box{
    display flex
    width 100%
    flex-direction row
    justify-content flex-end
    position relative

    .img-bg{
      width px2rem(125)
      height px2rem(63)
      margin-left px2rem(16)
    }
    .title{
      position absolute
      left px2rem(15)
      top px2rem(24)
      margin-right px2rem(10)
      font-size px2rem(14)
      color white
      text-align left
      line-height px2rem(20)
    }
  }
  .count-box{
    display flex
    flex-direction column
    align-items flex-start
    padding-left px2rem(15)
    font-size px2rem(14)
    color white

    .count{
      font-size px2rem(16)
      line-height px2rem(30)
      margin-bottom px2rem(12)

      .sp-number{
        font-size px2rem(28)
      }
    }
    .count-add{
      line-height px2rem(20)
      margin-bottom px2rem(18)
      margin-left px2rem(8)
      position relative
      text-align left

      &:before{
        content ''
        position absolute
        left px2rem(-6)
        top px2rem(8)
        width px2rem(4)
        height px2rem(4)
        border-radius 50%
        background-color white
      }
    }
  }
}

</style>
