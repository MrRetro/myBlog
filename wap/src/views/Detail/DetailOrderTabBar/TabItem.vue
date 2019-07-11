<template>
  <yi-touch class="item" @click="$emit('click',item)">
    <div class="icon-contain">
      <img class="icon" :src="item.icon"/>
      <div v-if="item.badge" class="badge">{{item.badge}}</div>
    </div>
    <div class="title">{{item.title}}</div>
  </yi-touch>
</template>

<script>
export default {
  name: 'TabItem',
  props: ['item']
};
</script>
<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .item {
    margin px2rem(16) 0
    width 20%
    display flex
    flex-direction column
    align-items center
    .icon-contain {
      width px2rem(36)
      height px2rem(36)
      position relative
    }
    .icon {
      width px2rem(36)
      height px2rem(36)
    }
    .title {
      font-size px2rem(14)
      color $deepBlack
      line-height px2rem(20)
      margin-top px2rem(6)
      regular()
    }

    .badge {
      position absolute
      left px2rem(18)
      top px2rem(-7)
      text-align center
      height px2rem(13)
      width px2rem(22)
      line-height px2rem(13)
      border-radius px2rem(7)
      background-color $red
      font-size px2rem(10)
      color white
      regular()
    }
  }
</style>
