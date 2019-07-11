<template>
  <div class="container">
    <div class="input-box2">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">已收款合计</div>
          <div class="header-content">{{213421}}</div>
        </div>
        <div class="item">
          <div class="header-title">剩余应收款合计</div>
          <div class="header-content" style="color: #FDA926">{{213421}}</div>
        </div>
      </div>
      <div class="scroll">
        <div v-for="(item,index) in form" :key="index" class="content">
          <div v-if="item.title" class="section-title section-margin-top">
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
      </div>
    </div>
    <yi-btn-box
      name="确认收款"
      :icon="$images.delivery.ic_money"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import ListInfo from '../../../views/ListInfo';
import {getInfoValue, handleFormParams} from '../../../utils/paramsUtil';
import {addReceival, getReceivalHistoryDataById} from '../../../api/delivery';

export default {
  name: 'addReceipt',
  extends: EditPage,
  components: {
    ListInfo
  },
  data() {
    return {
      initData: null,
      data: {},
      subForm: [{
        form: [
          {attr: 'receiptTime', type: 'date', title: '收款时间', placeholder: '请选择收款时间', required: true},
          {attr: 'carPrice', title: '车身售价', disable: true, rules: {required: false}, required: false},
          {attr: 'deposit', title: '客户支付定金', disable: true, rules: {required: false}, required: false},
          {attr: 'retainage', title: '车辆尾款', detail: [{title: '已收款', key: 'retainage'}]},
          {attr: 'clivta', title: '交强险', detail: [{title: '已收款', key: 'clivta'}]},
          {attr: 'vehicleInsurance', title: '商业险', detail: [{title: '已收款', key: 'vehicleInsurance'}]},
          {attr: 'otherInsurance', title: '其他险', detail: [{title: '已收款', key: 'otherInsurance'}]},
          {
            attr: 'financialServiceFee',
            title: '金融服务费',
            detail: [{title: '已收款', key: 'financialServiceFee'}, {
              title: '剩余款',
              key: 'financialServiceFee',
              color: '#FDA926'
            }]
          },
          {attr: 'freightIncome', title: '运费收入', detail: [{title: '已收款', key: 'freightIncome'}]},
          {attr: 'licensePlateIncome', title: '报牌费收入', detail: [{title: '已收款', key: 'licensePlateIncome'}]},
          {attr: 'boutiqueIncome', title: '精品收入', detail: [{title: '已收款', key: 'boutiqueIncome'}]},
          {attr: 'warrantyPrice', title: '质保费用', detail: [{title: '已收款', key: 'warrantyPricev'}]},
          {attr: 'purchaseTax', title: '购置税', detail: [{title: '已收款', key: 'purchaseTax'}]},
          {attr: 'otherIncome', title: '其它收入', detail: [{title: '已收款', key: 'otherIncome'}]},
          {attr: 'otherIncomeRemark', title: '其它收入备注', type: 'text', placeholder: '精品收入包含...'}
        ].map(this.getFormItem)
      }, {
        title: '附件信息',
        form: [{
          attr: 'receiptVoucher',
          type: 'fileUpload',
          title: '客户收款支付凭证',
          value: null,
          line: false,
          placeholder: '请选择客户收款支付凭证',
          rules: {required: true},
          required: true,
          indent: false
        }]
      }],
      form: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    async fetchData() {
      this.data = await getReceivalHistoryDataById(this.params);
      this.form = this.subForm.map(item => ({
        ...item,
        form: item.form.map(t => ({
          ...t,
          // 判断如果是不可用数据则填充默认数据
          value: t.disable ? getInfoValue({...t, data: this.data, key: t.attr}) : '',
          text: t.disable ? getInfoValue({...t, data: this.data, key: t.attr}) : '',
          detail: t.detail ?
            t.detail.map(v => ({...v, value: getInfoValue({data: this.data, ...v, type: 'price'})}))
            : undefined
        }))
      }));
    },
    getFormItem(data) {
      return {
        type: 'money',
        rules: {required: true},
        required: true,
        text: null,
        value: null,
        placeholder: `请输入${data.title}`,
        indent: false,
        ...data
      };
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
          await addReceival(handleFormParams(list, {deliveryId: this.params.id}));
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
    width 100%
    flex-direction column
    .scroll {
      margin-top px2rem(84)
    }

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
      width 100%
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto
      overflow-x: hidden

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

  .header-contain {
    box-shadow: 0 px2rem(4) px2rem(4) 0 rgba(0, 0, 0, 0.05);
    height px2rem(84)
    margin-bottom px2rem(24)
    display flex
    position: fixed;
    width: 100%;
    z-index 1
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
    margin-top px2rem(24)
  }

  .table {
    margin-bottom px2rem(24) !important
  }
</style>
