<template>
  <yi-container class="contain" :show-loading="isLoading">
    <div class="content">
      <list-info :form="info"/>
    </div>
  </yi-container>
</template>

<script>
import ListInfo from '../../../views/ListInfo';
import {getInfoValue, delayeringValue} from '../../../utils/paramsUtil';
import Page from '../../../components/Mixins/BasePage';

export default {
  components: {
    ListInfo
  },
  extends: Page,
  name: 'financialFund',
  props: ['allData'],
  data() {
    return {
      id: this.$route.params.id,
      isLoading: true,
      data: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.data = await new Promise((resolve) => {
        setTimeout(() => resolve({
          financialChannel: '1211',
          financialCompany: '3200',
          financialProduct: '2018-212-211',
          grantAmount: '20000',
          dateOfArrival: '1211',
          financialIncome: '1211',
          financialRebate: '1211',
          financialExpenditure: '1211',
          licensePlateIncome: '1211',
          financialServiceFee: '1211',
          financialTotalIncome: '1211',
          otherIncomeRemark: '我是备注'
        }), 1000);
      });
      this.isLoading = false;
    },
    getValue(key, type = 'price') {
      return getInfoValue({data: this.defaultData, key, type});
    }
  },
  computed: {
    defaultData() {
      // return delayeringValue(this.allData);
      return delayeringValue(this.data);
    },
    info() {
      let list = [
        {title: '金融渠道', key: 'financialChannel'},
        {title: '金融公司', key: 'financialCompany'},
        {title: '金融产品', key: 'financialProduct'},
        {title: '批贷金额', key: 'grantAmount', type: 'price'},
        {title: '到账日期', key: 'dateOfArrival'},
        {title: '金融返点', key: 'financialRebate', type: 'price'},
        {title: '金融支出', key: 'financialExpenditure', type: 'price'},
        {title: '金融服务费', key: 'financialServiceFee', type: 'price'},
        {title: '金融总收入', key: 'financialTotalIncome', type: 'price'}];
      return {
        title: '款项详情',
        data: list.map(t => ({
          ...t,
          value: getInfoValue({...t, data: this.defaultData}),
          values: t.values ? t.values.map(v => ({
            ...v,
            value: getInfoValue({...v, data: this.defaultData})
          })) : undefined
        }))
      };

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    overflow-y auto
    margin-bottom px2rem(28)
    .content {
      margin-bottom px2rem(60)
      margin-top px2rem(24)
    }

  }

</style>
