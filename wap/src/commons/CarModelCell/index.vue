<template>
  <yi-touch class="item-contain touch-highlight" @click="$emit('click')">
    <div style="flex-direction: column">
      <div class="item-name">
        {{item.name}}
      </div>
      <div class="item-content">
        指导价：<span class="red">{{item.indicativePrice}}万</span>
      </div>
    </div>
  </yi-touch>
</template>

<script>
export default {
  name: 'CarModelCell',
  props: {
    item: Object
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .item-contain {
    display flex
    align-items center
    margin-left px2rem(14)
    border-bottom-style double
    border-bottom-width 1px
    border-bottom-color $lightGray
    padding-right px2rem(14)
    padding-bottom px2rem(10)
    padding-top px2rem(10)
    height auto
  }

  .item-name {
    font-size px2rem(14)
    color $deepBlack
    medium()
    text-align left
    line-height px2rem(20)
  }

  .item-content {
    color $darkBlack
    font-size px2rem(12)
    margin-top px2rem(8)
    text-overflow: ellipsis;
    white-space: nowrap;
    width 100%;
    text-align left
    medium()
  }

  .red {
    color $red
    medium()
  }

</style>
