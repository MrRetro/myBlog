<template>
  <div class="contain">
    <div v-if="!showEmpty" class="section-title accessory">签约相关图片</div>
    <div v-else class="data-none">
      <yi-image class="img" :src="$images.base.img_record"/>
      <span class="word">暂无相关文件</span>
    </div>
    <template v-for="(item,index) in allData.orderFileCabinetList">
      <MoreImages
        :key="index" :title="item.title" :allData="allData.orderFileCabinetList" :images="item.images"/>
    </template>
  </div>
</template>

<script>
import CommonTab from '../CommonTab';
import MoreImages from '../../../MoreImages';

export default {
  components: {
    CommonTab,
    MoreImages
  },
  props: ['allData'],
  name: 'FileCaseTab',
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type
    };
  },
  computed: {
    showEmpty() {
      return this.allData.orderFileCabinetList.filter(item => item.images.length !== 0).length === 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain {
    margin-top px2rem(4)
  }

  .section-title {
    medium()
    margin-left px2rem(14)
    color $deepBlack
    font-size px2rem(16)
    padding-top px2rem(16)
    margin-bottom px2rem(6)
    line-height px2rem(22)
    text-align left
  }

  .accessory {
    margin-bottom px2rem(16)
  }

  .info-contain {
    margin 0 px2rem(14)
    display flex
    .item {
      color $darkBlack
      font-size px2rem(14)
      line-height px2rem(20)
      text-align left
      margin px2rem(8) 0
    }

    .value {
      color $deepBlack
    }
  }

  .data-none {
    display flex
    flex-direction column
    align-items center
    padding px2rem(60) px2rem(0)

    .img {
      width px2rem(92)
      height px2rem(70)
    }
    .word {
      color $darkBlack
      regular()
      font-size px2rem(12)
      margin-top px2rem(15)
    }
  }

</style>
