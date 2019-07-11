<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="top">
      <span class="tag">{{status}}</span>
      <span>{{item.orderNo || '无'}}</span>
    </div>
    <div class="cell-title ">{{item.carName || '无'}}</div>
    <div class="middle">
      <span>客户:{{item.name || '无'}}</span>
      <span>类型:{{item.orderType.name}}</span>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <span>负责人:{{item.responsibleName || '无'}}</span>
      <span>{{showTimeText}}</span>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'OrderCell',
  mixins: [CommonCell],
  computed: {
    status() {
      return this.item.orderContractStatus ? this.item.orderContractStatus.name : this.item.status.name;
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
    justify-content space-between
    color $darkBlack
    font-size px2rem(14)
    regular()
  }

  .tag {
    height px2rem(20)
    background-color $orange
    padding 0 px2rem(4)
    font-size px2rem(12)
    line-height px2rem(20)
    color white
    border-radius px2rem(4)
    regular()
  }


  .middle {
    regular()
    margin-top px2rem(4)
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
    padding px2rem(9) px2rem(18) px2rem(5) px2rem(18)
    color $deepBlack
    medium()
  }
</style>
