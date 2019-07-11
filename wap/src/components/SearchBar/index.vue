<template>
  <div class="contain">
    <yi-touch class="search-bar" @click="$emit('click')">
      <img :src="$images.all.small_search" class="search-icon"/>
      <div class="search-text">{{text}}</div>
    </yi-touch>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    text: {
      type: String,
      default: '搜索姓名/手机/备注名称'
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain{
    height: px2rem(54)
    display flex
    align-items flex-end
    background-color white;
    justify-content center
    background-color white
    .search-bar {
      height px2rem(40)
      width px2rem(348)
      background-color: #F8F8F8;
      border-radius: px2rem(4);
      align-items: center;
      display flex
    }
  }
  .search-icon {
    height: px2rem(12)
    width: px2rem(13)
    margin-left px2rem(19)
    margin-right px2rem(5)
  }

  .search-text {
    font-size px2rem(12)
    color #B0B0B0
    regular()
  }
</style>
