<template>
  <div class="contain">
    <list-info :form="info"/>
  </div>
</template>

<script>
import ListInfo from '../../../../views/ListInfo';
import {getInfoValue, delayeringValue} from '../../../../utils/paramsUtil';
import {RouteUtil} from '../../../../utils/routeUtil';

export default {
  components: {
    ListInfo
  },
  name: 'DeliveryCarTab',
  props: ['allData'],
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      show: false
    };
  },
  methods: {
    navigateToDetail(name) {
      RouteUtil.push({name});
    }
  },
  computed: {
    defaultData() {
      // return delayeringValue(this.allData);
      return delayeringValue({
        totalCollection: '3200',
        storageTime: '2018-212-211',
        totalIncidentals: '20000',
        moreRetreat: '1211',
        totalCost: '1211',
        totalIncome: '1211',
        grossProfit: '1211',
        storeBonus: '1211',
        grossProfitAfterDeductingStoreBonus: '1211',
        consultantFee: '1211',
        salesBonus: '1211',
        platformNetProfit: '1211',
        images: ['http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP',
          'http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP',
          'http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP',
          'http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP',
          'http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP',
          'http://pbfevxle8.bkt.clouddn.com/Fhv1gwKLAjf3a42k6mODb_v4FysP']
      });
    },
    info() {
      let list = [{title: '入库时间', key: 'storageTime', click: () => this.navigateToDetail('arrivalStore')},
        {title: '客户收款', key: 'totalCollection', type: 'price', click: () => this.navigateToDetail('customerReceipt')},
        {title: '杂费申请', key: 'totalIncidentals', type: 'price', click: () => this.navigateToDetail('extraApply')},
        {title: '金融款项', key: 'financialTotalIncome', type: 'price', click: () => this.navigateToDetail('financialFund')},
        {title: '多退少补', key: 'moreRetreat', type: 'price', click: () => this.navigateToDetail('checkIncome')},
        {title: '车牌号', key: 'plateNumber'},
        {title: '收入小计', key: 'totalIncome', type: 'price', click: () => this.navigateToDetail('checkIncome')},
        {title: '成本小计', key: 'totalCost', type: 'price', click: () => this.navigateToDetail('costSubtotal')},
        {title: '总毛利', key: 'grossProfit', type: 'price'},
        {title: '地面店分成', key: 'storeBonus', type: 'price'},
        {title: '扣除店面成本毛利', key: 'grossProfitAfterDeductingStoreBonus', type: 'price'},
        {title: '顾问费', key: 'consultantFee', type: 'price'},
        {title: '销售提成', key: 'salesBonus', type: 'price'},
        {title: '平台净利润', key: 'platformNetProfit', type: 'price'},
        {title: '交车车辆手续', key: 'deliveryProcedure', type: 'images'},
        {title: '交车图片', key: 'deliveryImg', type: 'images'},
        {title: '客户收款确认书', key: 'receiptConfirmation', type: 'images'}
      ];
      return {
        title: '交车信息',
        data: list.map(t => ({
          ...t,
          value: getInfoValue({...t, data: this.defaultData})
        }))
      };

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    margin-top px2rem(20)
    margin-bottom px2rem(60)
  }
</style>
