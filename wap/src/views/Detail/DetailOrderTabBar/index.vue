<template>
  <div class="tab">
    <tab-item v-for="(item,index) in list" :key="index" :item="item" @click="onItemClick"/>
  </div>
</template>

<script>
import TabItem from './TabItem';
import {images} from '../../../assets/index';

const menus = {
  orderCarDemand: {
    title: '订车需求',
    icon: images.order.ic_order_need
  },
  orderCarList: {
    title: '订车单',
    icon: images.order.ic_order_car_order
  },
  giveCarList: {
    title: '交车单',
    icon: images.order.ic_order_car_give
  },
  logisticsList: {
    title: '物流单',
    icon: images.order.ic_order_logistics
  },
  fundedList: {
    title: '垫资单',
    icon: images.order.ic_order_car
  },
  fundedPlan: {
    title: '垫资计划',
    icon: images.order.ic_order_plan
  },
  refundList: {
    title: '还款单',
    icon: images.order.ic_order_refund
  },
  finishList: {
    title: '结算单',
    icon: images.order.ic_order_finish
  },
  changeList: {
    title: '变更单',
    icon: images.order.ic_order_change
  },
  more: {
    title: '更多',
    icon: images.order.ic_order_more
  }
};
export default {
  name: 'DetailOrderTabBar',
  components: {
    TabItem
  },
  props: {
    orderList: {
      type: Array,
      default: ()=>{
        return [
          {
            tag: 'orderCarDemand',
            badge: 99
          },
          {
            tag: 'orderCarList'
          },
          {
            tag: 'giveCarList',
            badge: 1
          },
          {
            tag: 'logisticsList',
            badge: 1
          },
          {
            tag: 'fundedList',
            badge: 1
          },
          {
            tag: 'fundedPlan',
            badge: 1
          },
          {
            tag: 'refundList',
            badge: 2
          },
          {
            tag: 'finishList',
            badge: 3
          },
          {
            tag: 'changeList',
            badge: 1
          }
        ];
      }
    },
    isMore: Boolean
  },
  computed: {
    list() {
      let list = this.orderList.map(item=>({...menus[item.tag], ...item}));
      if (!this.isMore && this.orderList.length > 4) {
        let all = 0;
        list.forEach((item, index)=> index >= 4 && (all += item.badge));
        list.splice(4, this.orderList.length - 4, {badge: all, ...menus.more, tag: 'more'});
      }
      return list;
    }
  },
  methods: {
    onItemClick(item) {
      this.$emit('onItemClick', item);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .tab{
    display flex
    flex 1
    flex-wrap wrap
  }
</style>
