<template>
  <yi-container class="contain" :show-loading="isLoading">
    <div class="content">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">运费合计</div>
          <div class="header-content">{{getValue('totalIncome')}}</div>
        </div>
      </div>
      <list-info class="margin-top" :form="info">
      </list-info>
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
  name: 'CostSubtotal',
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
          totalIncome: '1211',
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
      return delayeringValue(this.data);
    },
    info() {
      let list = [{title: '资金成本', key: 'freightIncome', type: 'price'},
        {
          title: '实际保费',
          key: 'insuranceIncome',
          type: 'price',
          values: [
            {title: '交强险', key: 'moreRetreat', type: 'price'},
            {title: '车船税', key: '', type: 'price'},
            {title: '商业险', key: '', type: 'price'},
            {title: '其他险', key: '', type: 'price'}]
        },
        {title: '金融支出', key: 'financialIncome', type: 'price'},
        {
          title: '运费支出',
          key: 'freightIncome',
          type: 'price',
          values: [
            {title: '大阪运费', key: 'moreRetreat', type: 'price'},
            {title: '小板运费', key: '', type: 'price'},
            {title: '空板运费', key: '', type: 'price'},
            {title: '调拨运费', key: '', type: 'price'}]
        },
        {title: '上牌费', key: 'licensePlateIncome', type: 'price'},
        {title: '精品成本', key: 'boutiqueIncome', type: 'price'},
        {title: 'POS机手续费', key: 'otherIncome', type: 'price'},
        {title: '其他成本', key: 'otherIncome', type: 'price', values: [{title: '其他成本备注', key: 'deliveryImg'}]}
      ];

      return {
        title: '运费详情',
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
</style>
