<template>
  <yi-container class="contain" :show-loading="isLoading">
    <div class="content">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">杂费总额</div>
          <div class="header-content">{{12321321}}</div>
        </div>
      </div>
      <div class="margin-top">
        <list-info v-for="(item,index) in info" :key="index" :form="item" class="table">
        </list-info>
      </div>
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
  name: 'extraApply',
  props: ['allData'],
  extends: Page,
  data() {
    return {
      id: this.$route.params.id,
      isLoading: true,
      data: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.data = await new Promise((resolve) => {
        setTimeout(() => resolve([{
          totalIncome: '1211',
          carPriceSpread: '3200',
          status: '付款中',
          carPurchasingPrice: '2018-212-211',
          carPrice: '20000',
          insuranceIncome: '1211',
          financialIncome: '1211',
          financialDetail: '1211',
          freightIncome: '1211',
          licensePlateIncome: '1211',
          boutiqueIncome: '1211',
          otherIncome: '1211',
          otherIncomeRemark: '我是备注'
        }, {
          totalIncome: '1211',
          status: '已取消',
          carPriceSpread: '3200',
          carPurchasingPrice: '2018-212-211',
          carPrice: '20000',
          insuranceIncome: '1211',
          financialIncome: '1211',
          financialDetail: '1211',
          freightIncome: '1211',
          licensePlateIncome: '1211',
          boutiqueIncome: '1211',
          otherIncome: '1211',
          switch: true,
          otherIncomeRemark: '我是备注'
        }]), 1000);
      });
      this.isLoading = false;
    }
    // getValue(key, type = 'price') {
    //   return getInfoValue({data: this.defaultData, key, type});
    // }
  },
  computed: {
    defaultData() {
      return this.data.map(delayeringValue);
    },
    info() {
      let list = [
        {title: '付款日期', key: 'freightIncome'},
        {title: '款项类型', key: 'licensePlateIncome'},
        {title: '付款类型', key: 'boutiqueIncome'},
        {title: '银行账户', key: 'boutiqueIncome'},
        {title: '开户名', key: 'boutiqueIncome'},
        {title: '开户行', key: 'boutiqueIncome'},
        {title: '支付金额', key: 'boutiqueIncome', type: 'price'},
        {title: '付款附言', key: 'boutiqueIncome'},
        {title: '费用月结', key: 'switch', type: 'switch'}];
      return this.defaultData.map((item, index) => ({
        title: `付款指令-${index + 1}`,
        tag: item.status,
        showMore: true,
        data: list.map(t => ({
          ...t,
          value: getInfoValue({...t, data: item}),
          values: t.values ? t.values.map(v => ({
            ...v,
            value: getInfoValue({...v, data: item})
          })) : undefined
        }))
      }));
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
    }

  }

  .header-contain {
    box-shadow: 0 px2rem(4) px2rem(4) 0 rgba(0, 0, 0, 0.05);
    height px2rem(84)
    margin-bottom px2rem(24)
    display flex
    position: fixed;
    width: 100%;
    background: white;
    .item {
      flex 1;
      display flex;
      flex-direction column;
      align-items center
      justify-content center
    }
    .header-title {
      color #8D8D8D
      font-size px2rem(14)
    }
    .header-content {
      margin-top px2rem(8)
      font-size px2rem(20)
      color #348EED
      medium()
    }
  }

  .margin-top {
    margin-top px2rem(108)
  }

  .table {
    margin-bottom px2rem(24) !important
  }
</style>
