<template>
  <div class="bar">
    <div class="bar-item-contain" @click.stop="">
      <template v-for="(item,i) in data">
        <yi-touch
          v-if="!item.isAllFilter"
          class="bar-item"
          :class="{flex1:data.length !== 3}"
          @click="mBarItemClick(i)"
          :key="i">
          <div class="bar-item-text" :style="{color:item.selectedIndex !== -1 ? '#348EED':'#8d8d8d'}">
            {{item.selectedIndex === -1 ? item.name : item.values[item.selectedIndex].name}}
          </div>
          <img
            class="bar-item-icon"
            :style="{transform:`rotate(${selectedIndex  === i ? (item.selectedIndex !== -1 ? 0 : 180) : (item.selectedIndex !== -1 ? 180 : 0)}deg)`}"
            :src="getBarSmallIcon({item,index:i})"/>
        </yi-touch>
        <yi-touch
          v-else
          class="bar-item bar-item-reverse"
          :class="{flex1:data.length !== 3}"
          @click="$emit('barItemClick', i)"
          :key="i">
          <div class="bar-item-text" :style="{color:item.selectedIndex !== -1 ? '#348EED':'#8d8d8d'}">
            {{item.name}}
          </div>
          <img
            class="bar-item-icon-filter"
            :src="getBarSmallIcon({item,index:i})"/>
        </yi-touch>
      </template>
    </div>
    <div v-if="hasLine" class="bar-line"></div>

  </div>
</template>

<script>

export default {
  name: 'filter-bar',
  props: {
    data: Array,
    selectedIndex: Number,
    hasLine: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mData: this.data
    };
  },
  methods: {
    getBarSmallIcon({item}) {
      if (item.isAllFilter) {
        return item.selectedIndex !== -1 ? this.$images.filter.small_filter_selected :
          this.$images.filter.small_filter_normal;
      }
      return item.selectedIndex !== -1 ? this.$images.all.arrows_up :
        this.$images.all.arrows_down;
    },
    mBarItemClick(index) {
      this.$emit('barItemClick', index);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .bar {
    font-size px2rem(14)
    display flex
    flex-direction column
  }

  .bar-item-contain {
    height px2rem(48)
    padding 0 px2rem(28)
    display flex
    background-color white
    align-items center
    justify-content space-between
    z-index 100
  }
  .flex1{
    flex 1
  }
  .bar-item-icon {
    width px2rem(6)
    margin 0 px2rem(3)
  }
  .bar-item-icon-filter {
    width px2rem(10)
    margin 0 px2rem(3)
  }

  .menu-item {
    background-color white
    height px2rem(50)
    border-bottom-style double
    border-bottom-width 1px
    border-bottom-color #eaeaea
    display flex
    align-items center
    padding 0 px2rem(14)
  }

  .bar-line {
    height 1px
    background-color #F3F3F3
  }

  .bar-item-text {
    color $darkBlack
    font-size px2rem(14)
    regular()
    line-height px2rem(20)
  }

  .bar-item {
    display flex
    height 100%
    margin-right 1px
    align-items center
    justify-content center
    flex-direction row
  }
  .bar-item-reverse {
    flex-direction row-reverse
  }
</style>
