<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="cell-title top">{{item.vehicleModel || '无'}}</div>
    <div class="middle">
      <yi-image class="icon" :src="$images.base.ic_eq_price"/>
      <span>报价单：{{item.quotedNo}}</span>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <span>询价单：{{item.enquiryNo}}</span>
      <span>{{showTimeText}}</span>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'QuotedRecordCell',
  mixins: [CommonCell],
  data() {
    return {
      module: this.$route.params.module
    };
  },
  computed: {
    no() {
      switch (this.module) {
        case 'enquiryPrices':
          return this.item.enquiryNo;
        case 'quotedPrices':
          return this.item.quotedNo;
        default:
          return this.item.enquiryNo;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"
  .top {
    margin-top px2rem(18)
    padding 0 px2rem(18)
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
    .icon {
      width px2rem(14)
      height px2rem(14)
      margin-right px2rem(4)
    }
  }

  .bottom {
    regular()
    color $darkBlack
    font-size px2rem(12)
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
