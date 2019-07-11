<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="cell-title">广州中泰国际文化传媒有限公司<span class="tag">精品商</span></div>
    <div class="middle">
      <span><img class="img-man" :src="$images.delivery.ic_man"/>{{'李文华' || '无'}}</span>
      <span><img class="img-card" :src="$images.delivery.ic_card"/>{{'6236 6819 3002 1009 888'}}</span>
    </div>
    <div class="bottom">
      <span><img class="img-map" :src="$images.delivery.ic_map"/>厦门建设银行夏禾支行</span>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'ServiceProviderCell',
  mixins: [CommonCell],
  computed: {}
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"

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
    span {
      display flex;
      align-items center
    }
    .img-man {
      width px2rem(14)
      height px2rem(14)
      margin-right px2rem(8)
    }
    .img-card {
      width px2rem(18)
      margin-right px2rem(8)
      height px2rem(14)
    }
  }

  .bottom {
    regular()
    color $deepBlack
    font-size px2rem(14)
    margin px2rem(14) px2rem(18) px2rem(12) px2rem(18)
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .img-map {
      width px2rem(12)
      height px2rem(12)
      margin-right px2rem(8)
    }
    span {
      display flex;
      align-items center
    }
  }

  .cell-title {
    font-size px2rem(16)
    line-height px2rem(22)
    display flex
    align-items center
    justify-content space-between
    text-align left
    padding px2rem(24) px2rem(18) px2rem(5) px2rem(18)
    color $deepBlack
    medium()
  }
</style>
