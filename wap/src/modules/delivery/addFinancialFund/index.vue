<template>
  <div class="container">
    <div class="input-box2">
      <div class="scroll">
        <div  class="content">
          <div
            :key="'index2'+index1"
            class="in-box"
            :class="{'self':item1.columnWidth===50}"
            v-for="(item1,index1) in form"
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
      name="确认申请"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import ListInfo from '../../../views/ListInfo';
import {submitFinanceFee} from '../../../api/delivery';
import {handleFormParams} from '../../../utils/paramsUtil';

export default {
  name: 'addFinancialFund',
  extends: EditPage,
  components: {
    ListInfo
  },
  data() {
    return {
      initData: null,
      data: {},
      form: [
        {
          attr: 'financialChannel',
          type: 'select',
          title: '金融渠道',
          placeholder: '请选择金融渠道'
        },
        {attr: 'financialCompanyId', type: 'select', title: '金融公司', placeholder: '请选择金融公司'},
        {attr: 'financialProductId', type: 'select', title: '金融产品', placeholder: '请选择金融产品'},
        {attr: 'grantAmount', title: '批贷金额'},
        {attr: 'dateOfArrival', title: '到账日期', type: 'date'},
        {attr: 'financialRebate', title: '金融返点'},
        {attr: 'financialExpenditure', title: '金融支出'},
        {attr: 'financialServiceFee', title: '金融服务费'},
        {attr: 'financialTotalIncome', title: '金融总收入'}
      ].map(this.getFormItem)
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
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
          await submitFinanceFee(handleFormParams(this.form, {deliveryId: this.params.id}));
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
      margin-top px2rem(24)
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
