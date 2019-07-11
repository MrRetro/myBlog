<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="margin-top">
          <list-info v-for="(item,index) in showForm" :key="index" :form="item" class="table"/>
        </div>
        <div v-for="(item,index) in form" :key="index" class="content">
          <div class="section-title section-margin-top">
            {{item.title}}
          </div>
          <div
            :key="'index2'+index1"
            class="in-box"
            :class="{'self':item1.columnWidth===50}"
            v-for="(item1,index1) in item.form"
          >
            <yi-input
              ref="va"
              v-bind="item1"
              v-model="item1.text"
              :value.sync="item1.value"
              :indent="true"
              :selData="item1.selData || null"
            />
          </div>
        </div>
        <div class="space-box"></div>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="完成交车"
      :icon="$images.delivery.ic_delivery"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import ListInfo from '../../../views/ListInfo';
import {getInfoValue, handleFormParams} from '../../../utils/paramsUtil';
import {getLiveryCost, getLiveryIncome, submitTransferComplete} from '../../../api/delivery';

export default {
  name: 'finishDelivery',
  extends: EditPage,
  components: {
    ListInfo
  },
  data() {
    return {
      initData: null,
      data: {},
      inComeData: {},
      costData: {},
      form: [{
        title: '车辆详情',
        form: [
          {
            attr: 'deliveryTime',
            type: 'date',
            title: '线下交车时间',
            text: '',
            placeholder: '请选择车辆入库时间',
            rules: {required: true},
            required: true,
            indent: false
          },
          {
            attr: 'plateNumber',
            type: 'text',
            title: '车牌号',
            rules: {required: false, carNumber: true},
            required: false,
            text: null,
            value: null,
            placeholder: '请输入车牌号',
            indent: false,
            hint: '若未提供报牌服务，则车牌号可不填写。'
          }
        ]
      }, {
        title: '附件信息',
        form: [
          {
            attr: 'deliveryProcedure',
            type: 'fileUpload',
            title: '交车车辆手续',
            value: null,
            line: false,
            placeholder: '请选择交车车辆手续',
            rules: {required: true},
            required: true,
            indent: false
          },
          {
            attr: 'deliveryImg',
            type: 'fileUpload',
            title: '交车图片',
            value: null,
            line: false,
            placeholder: '请选择交车图片',
            rules: {required: true},
            required: true,
            indent: false
          },
          {
            attr: 'receiptConfirmation',
            type: 'fileUpload',
            title: '客户收款确认书',
            value: null,
            line: false,
            placeholder: '请选择客户收款确认书',
            rules: {required: true},
            required: true,
            indent: false
          }
        ]
      }]
    };
  },
  computed: {
    showForm() {
      let income = [
        {title: '总计收入', type: 'price', key: 'totalIncome'},
        {
          title: '车身售价',
          key: 'carPrice',
          type: 'price',
          values: [
            {title: '车身进价', type: 'price', key: 'carPurchasingPrice'},
            {title: '车身差价', type: 'price', key: 'carPriceSpread'}]
        }, {
          title: '保险收入',
          type: 'price',
          key: 'insuranceIncome',
          values: [
            {title: '交强险', type: 'price', key: 'clivta'},
            {title: '车船税', type: 'price', key: 'travelTax'},
            {title: '商业险', type: 'price', key: 'vehicleInsurance'},
            {title: '其他险', type: 'price', key: 'otherInsurance'},
            {title: '保险返点', type: 'price', key: 'insuranceRebate'}]
        }, {
          title: '金融收入',
          key: 'financialIncome',
          type: 'price',
          values: [
            {title: '金融返点', type: 'price', key: 'financialRebate'},
            {title: '金融服务费', type: 'price', key: 'financialServiceFee'}]
        },
        {title: '运费收入', type: 'price', key: 'freightIncome'},
        {title: '报牌费收入', type: 'price', key: 'licensePlateIncome'},
        {title: '精品收入', type: 'price', key: 'boutiqueIncome'},
        {title: '其他收入', type: 'price', key: 'otherIncome', values: [{title: '其他收入备注', key: 'otherIncomeRemark'}]}];
      //  成本小计
      let cost = [
        {title: '总计成本', type: 'price', key: 'totalCost'},
        {title: '资金成本', type: 'price', key: 'capitalCost'},
        {
          title: '实际保费',
          key: 'actualPremium',
          type: 'price',
          values: [
            {title: '交强险', type: 'price', key: 'clivta'},
            {title: '车船税', type: 'price', key: 'travelTax'},
            {title: '商业险', type: 'price', key: 'vehicleInsurance'},
            {title: '其他险', type: 'price', key: 'otherInsurance'}]
        },
        {title: '金融支出', type: 'price', key: 'financialExpenditure'},
        {
          title: '运费合计',
          key: 'totalFreight',
          type: 'price',
          values: [
            {title: '大板运费', type: 'price', key: 'bigBoard'},
            {title: '小板运费', type: 'price', key: 'smallBoard'},
            {title: '空板运费', type: 'price', key: 'emptyBoard'},
            {title: '调拨运费', type: 'price', key: 'transfer'}]
        },
        {title: '上牌费', type: 'price', key: 'licensePlateExpense'},
        {title: '精品成本', type: 'price', key: 'boutiqueCost'},
        {title: 'POS机手续费', type: 'price', key: 'posServiceCharge'},
        {title: '其他成本', type: 'price', key: 'otherCost', values: [{title: '其他成本备注', key: 'otherCostRemake'}]}];
      return [{title: '收入小计', list: income, data: this.inComeData}, {title: '成本小计', list: cost, data: this.costData}].map((item) => ({
        title: item.title,
        showMore: true,
        data: item.list.map(t => ({
          ...t,
          value: getInfoValue({...t, data: item.data}),
          values: t.values ? t.values.map(v => ({
            ...v,
            value: getInfoValue({...v, data: item.data})
          })) : undefined
        }))
      }));
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    async fetchData() {
      const res = await Promise.all([getLiveryIncome(this.params), getLiveryCost(this.params)]);
      this.inComeData = res[0];
      this.costData = res[1];
    },
    onBtnClick() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      Promise.all(arr).then(async data => {
        let state = data.every(item => item);
        if (state) {
          let list = [];
          this.form.forEach(t => list.push(...t.form));
          await submitTransferComplete(handleFormParams(list, {deliveryId: this.params.id}));
          this.params.onSuccess && this.params.onSuccess();
          this.$router.go(-1);
        }
      });
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .container {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    display flex
    flex-direction column

    .section-title {
      width 100%
      font-size: px2rem(16);
      color: $deepBlack
      text-align left
      margin 0 px2rem(14)
      medium()
    }
    .section-margin-top {
      margin-top px2rem(28)
    }
    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto

      .content {
        display flex
        flex-direction row
        flex-wrap wrap
        .id-box {
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
        }
        .in-box {
          width 100%
        }
        .self {
          width 48%
        }

      }
    }

    .p-warm {
      width 100%
      background-color #FDFCEA
      height px2rem(28);
      line-height px2rem(28)
      font-size px2rem(12)
      color #EF465B
    }

    .space-box {
      display flex
      width 100%
      height px2rem(78)
    }
  }

  .margin-top {
    margin-top px2rem(24)
  }

  .table {
    margin-bottom px2rem(24) !important
  }
</style>
