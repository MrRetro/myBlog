<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="top">
      <span class="tag" :style="{backgroundColor:tagColor}">{{item.status.name}}</span>
      <span>归属门店：{{item.belongStore || '无'}}</span>
    </div>
    <div class="cell-title">{{item.vehicleModel || '无'}}</div>
    <div class="middle">
      <span>归属省份：{{item.belongPlace || '无'}}</span>
      <span>{{no}}</span>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <span>询价人：{{item.enquiryName || '无'}}</span>
      <span>{{showTimeText}}</span>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'EnquiryCell',
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
    },
    tagColor() {
      switch (this.item.status.code) {
        case 0:
          return '#FBA839';
        case 1:
          return '#7EC685';
        case 2:
          return '#EF465B';
        case 3:
          return '#EF465B';
        default:
          return '#FBA839';
      }
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
