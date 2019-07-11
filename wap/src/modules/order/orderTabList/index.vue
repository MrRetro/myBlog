<template>
  <yi-auto-list :fetch-data="fetchData" empty-text="订单列表为空">
    <div slot="header" class="header-text">共 <span class="header-text-number">{{totalNumber}}</span> {{totalText}}</div>
    <OrderTabCell slot-scope="{item,index}" :item="item" @onItemClick="itemClick"/>
  </yi-auto-list>
</template>

<script>
import OrderTabCell from './components/OrderTabCell';
import Page from '../../../components/Mixins/BasePage';
import {getChangeLogsWithPage} from '../../../api/common';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'OrderTabList',
  extends: Page,
  components: {
    OrderTabCell
  },
  data() {
    let params = this.$route.params;
    return {
      params,
      totalNumber: 0,
      totalText: params.title
    };
  },
  methods: {
    async fetchData(pageNum) {
      const data = await getChangeLogsWithPage({id: '40288a48644aad350164598506810043', pageNum});
      this.totalNumber = data.totalElements;
      return data.content;
    },
    itemClick() {

    }
  },
  activated() {
    ddApi.setTitle({title: this.totalText});
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .header-text {
    height px2rem(48)
    line-height px2rem(48)
    text-align: center
    font-size px2rem(16)
    color $darkBlack
    regular()
  }

  .header-text-number {
    color $themeColor
    medium()
  }

</style>
