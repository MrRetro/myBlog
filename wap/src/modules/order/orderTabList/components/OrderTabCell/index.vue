<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="top">
      <span class="cell-title">单据编号：TLY3788812921</span>
      <span class="tag">已作废</span>
    </div>
    <div class="middle">
      <span>车身进价:¥ 278,000</span>
      <span>状态:已完成</span>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <span>负责人:李文分</span>
      <span>创建时间:2018-8-8</span>
    </div>
  </yi-touch>
</template>

<script>

export default {
  name: 'OrderTabCell',
  props: {
    hasShadow: Boolean,
    item: Object
  },
  methods: {
    getLevelIcon(level) {
      switch (level) {
        case 'A':
          return this.$images.base.level_a;
        case 'B':
          return this.$images.base.level_b;
        case 'C':
          return this.$images.base.level_c;
        case 'H':
          return this.$images.base.level_h;
        default:
          return this.$images.base.level_no;
      }
    },
    handleClick() {
      // TODO 回传数据待做
      this.$emit('onItemClick', this.item);
    },
    getDistance(distance) {
      if (distance / 1000 > 1) {
        return `${(distance / 1000).toFixed(2)}km`;
      }
      return `${distance}m`;

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"
  .top {
    display flex
    align-items center
    margin-top px2rem(22)
    padding 0 px2rem(18)
    color $darkBlack
    font-size px2rem(14)
    regular()
  }

  .tag {
    height px2rem(20)
    background-color $red
    padding 0 px2rem(4)
    font-size px2rem(12)
    line-height px2rem(20)
    margin-left px2rem(6)
    color white
    border-radius px2rem(4)
    regular()
  }

  .middle {
    regular()
    margin-top px2rem(8)
    color $deepBlack
    font-size px2rem(14)
    margin-left px2rem(18)
    line-height px2rem(20)
    margin-right px2rem(18)
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .bottom {
    regular()
    color $darkBlack
    font-size px2rem(14)
    margin px2rem(14) px2rem(18) px2rem(2) px2rem(18)
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .cell-title {
    font-size px2rem(16)
    line-height px2rem(22)
    text-align left
    color $deepBlack
    medium()
  }
</style>
