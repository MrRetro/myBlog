<template>
  <yi-container class="contain" :show-loading="isLoading">
    <div class="content">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">已收款合计</div>
          <div class="header-content">{{getValue('totalIncome')}}</div>
        </div>
        <div class="item">
          <div class="header-title">剩余应收款合计</div>
          <div class="header-content" style="color:#FDA926">{{getValue('totalIncome')}}</div>
        </div>
      </div>
      <list-info class="margin-top" :form="info"/>
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
  name: 'customerReceipt',
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
      // return delayeringValue(this.allData);
      return delayeringValue(this.data);
    },
    info() {
      let list = [
        {title: '车身售价', key: 'carPrice', type: 'price'},
        {title: '客户支付定金', key: 'freightIncome', type: 'price'},
        {title: '车辆尾款', key: 'licensePlateIncome', type: 'price'},
        {title: '交强险', key: 'boutiqueIncome', type: 'price'},
        {title: '交强险', key: 'boutiqueIncome', type: 'price'},
        {title: '车船税', key: 'boutiqueIncome', type: 'price'},
        {title: '商业险', key: 'boutiqueIncome', type: 'price'},
        {title: '其他险', key: 'boutiqueIncome', type: 'price'},
        {title: '金融服务费', key: 'boutiqueIncome', type: 'price'},
        {title: '运费收入', key: 'boutiqueIncome', type: 'price'},
        {title: '运费收入', key: 'boutiqueIncome', type: 'price'},
        {title: '报牌费收入', key: 'boutiqueIncome', type: 'price'},
        {title: '精品收入', key: 'boutiqueIncome', type: 'price'},
        {title: '质保费用', key: 'boutiqueIncome', type: 'price'},
        {title: '购置税', key: 'boutiqueIncome', type: 'price'},
        {title: '其他收入', key: 'otherIncome', type: 'price'},
        {title: '其他收入备注', key: 'deliveryImg'}];
      return {
        title: '收入详情',
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
    position: fixed;
    width: 100%;
    background: white;
    display flex
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
