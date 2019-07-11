<template>
  <div class="container">
    <div class="input-box2">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">已收款合计</div>
          <div class="header-content">{{213421}}</div>
        </div>
      </div>
      <div class="scroll">
        <div class="content">
          <div  class="section-title section-margin-top">
            {{form.title}}
          </div>
          <div
            :key="'index2'+index1"
            class="in-box"
            :class="{'self':item1.columnWidth===50}"
            v-for="(item1,index1) in form.form"
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

export default {
  name: 'refundsFormTwo',
  extends: EditPage,
  components: {
    ListInfo
  },
  data() {
    // eslint-disable-next-line no-unused-vars
    const refund = {
      title: '退款详情',
      form: [{
        attr: 'receiptVoucher',
        type: 'date',
        title: '付款申请时间',
        value: null,
        placeholder: '请选择付款申请时间',
        rules: {required: true},
        required: true,
        indent: true
      }]
    };

    const replenish = {
      title: '补款详情',
      form: [{
        attr: 'receiptVoucher',
        type: 'date',
        title: '收款时间',
        value: null,
        placeholder: '请选择收款时间',
        rules: {required: true},
        required: true,
        indent: true
      }, {
        attr: 'receiptVoucher',
        type: 'fileUpload',
        title: '客户应补款付款凭证',
        value: null,
        line: false,
        placeholder: '请选择客户应补款付款凭证',
        rules: {required: true},
        required: true,
        indent: true
      }]
    };

    return {
      initData: null,
      // TODO 需要根据条件判断渲染哪个表单
      form: replenish
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          console.log(this.form, '校验成功并提交数据');
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
