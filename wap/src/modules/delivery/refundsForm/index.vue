<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="margin-top">
          <list-info :form="showForm" class="table"/>
        </div>
        <div class="content">
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
      </cube-scroll>
    </div>
    <yi-btn-box
      name="下一步"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import ListInfo from '../../../views/ListInfo';
import {getInfoValue} from '../../../utils/paramsUtil';

export default {
  name: 'refundsForm',
  extends: EditPage,
  components: {
    ListInfo
  },
  data() {
    return {
      initData: null,
      data: {},
      form: [
        {title: '实际交强险', attr: ''},
        {title: '实际车船税', attr: ''},
        {title: '实际商业险', attr: ''},
        {title: '实际其他险', attr: ''},
        {title: '实际购置税', attr: ''}
      ].map(item => this.getFormItem(item))
    };
  },
  computed: {
    showForm() {
      let list = [
        {
          title: '客户应退款',
          key: 'freightIncome',
          values: [
            {title: '交强险', key: 'freightIncome'},
            {title: '车船税', key: 'freightIncome'},
            {title: '商业险', key: 'freightIncome'},
            {title: '其他险', key: 'freightIncome'},
            {title: '车辆购置税', key: 'freightIncome'}
          ]
        }];
      return {
        title: '款项详情',
        data: list.map(t => ({
          ...t,
          value: getInfoValue({...t, data: this.data}),
          values: t.values ? t.values.map(v => ({
            ...v,
            value: getInfoValue({...v, data: this.data})
          })) : undefined
        }))
      };
    }
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    getFormItem(data) {
      return {
        type: 'money',
        text: '',
        value: null,
        placeholder: `请输入${data.title}`,
        rules: {required: true},
        required: true,
        indent: true,
        ...data
      };
    },
    onBtnClick() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          let params = {};
          this.form.forEach(item=>params[item.attr] = item.value);
          this.$RouteUtil.push({
            name: 'refundsFormTwo', params: {data: params}
          });
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
