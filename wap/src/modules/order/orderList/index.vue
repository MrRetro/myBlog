<template>
  <yi-auto-list :fetch-data="fetchData" empty-text="订单列表为空" :enabled-pull-up="false">
    <OrderCell slot-scope="{item,index}" :item="item" @onItemClick="itemClick"/>
  </yi-auto-list>
</template>

<script>
import OrderCell from '../../../commons/OrderCell';
import {getOrderList} from '../../../api/order';
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'OrderList',
  extends: Page,
  components: {
    OrderCell
  },
  activated() {
    ddApi.setRight();
  },
  methods: {
    async fetchData() {
      const data = await getOrderList({id: this.params.id, type: this.params.module});
      return data.content;
    },
    itemClick(item) {
      if (this.params.onSuccess) {
        this.params.onSuccess({type: 'model', data: item});
        this.$router.go(-1);
      } else {
        this.$RouteUtil.commonDetail({id: item.id, module: 'order'});
      }
    }
  }
};
</script>

<style scoped>

</style>
