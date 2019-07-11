<template>
  <list-info :form="form" @rightClick="$emit('del')">
    <template slot-scope="{list,moreIndex}">
      <template v-for="(t,i) in list">
        <yi-input ref="va" v-show="i < moreIndex" v-bind="t" :key="t.attr" v-model="t.value" :value.sync="t.value"/>
      </template>
    </template>
  </list-info>
</template>

<script>
import ListInfo from '../../../../views/ListInfo';
import {AlertUtil} from '../../../../utils/AlertUtil';

export default {
  name: 'form',
  components: {
    ListInfo
  },
  props: ['index'],
  data() {
    return {
      form: {
        title: `付款指令-${this.index + 1}`,
        showMore: true,
        defaultShow: true,
        rightBtnText: '删除',
        tag: '付款中',
        data: [{
          attr: 'paymentRequestTime',
          type: 'date',
          title: '付款申请日期',
          placeholder: '请选择付款申请日期'
        }, {
          attr: 'fundType',
          type: 'select',
          title: '款项类型',
          selData: {
            source: [{value: 0, key: '上牌费'}, {value: 1, key: '精品费'}, {value: 2, key: '交强险'}, {value: 3, key: '车船税'},
              {value: 4, key: '商业险'}, {value: 5, key: '其他险种'}, {value: 6, key: '购置税'}, {value: 7, key: '其他费用'}]
          },
          placeholder: '请选择款项类型'
        }, {
          attr: 'paymentType',
          type: 'select',
          title: '付款类型',
          selData: {
            source: [{value: 1, key: '公对公'}, {value: 2, key: '公对私'}, {value: 3, key: '私对私'}, {value: 4, key: '私对公'}]
          },
          placeholder: '请选择款项类型'
        }, {
          attr: 'account',
          title: '账户',
          placeholder: '请输入账户'
        }, {
          attr: 'accountName',
          title: '户名',
          placeholder: '请输入户名'
        }, {
          attr: 'bankOfDeposit',
          title: '开户行',
          placeholder: '请输入开户行'
        }, {
          attr: 'amount',
          type: 'money',
          title: '支付金额',
          placeholder: '请输入支付金额'
        }, {
          attr: 'postscript',
          title: '付款附言',
          placeholder: '请输入付款附言'
        }].map(this.getItemValue)
      }
    };
  },
  watch: {
    typeItemValue(val) {
      console.log('哈哈', val);
      if (['上牌费', '交强险', '车船税', '商业险', '其他险种', '精品费'].includes(val)) {
        this.delItem('其他费用备注');
        if (this.form.data.findIndex(item => item.title === '月结') === -1) {
          this.form.data.splice(2, 0, this.getItemValue({
            attr: 'serviceProviderId',
            type: 'click',
            title: '服务商',
            placeholder: '请选择服务商',
            onClick: () => {
              this.$RouteUtil.push({
                name: 'serviceProviderList',
                params: {
                  onSuccess: (item) => {
                    this.form.data.forEach(t => {
                      if (t.attr === 'serviceProviderId') {
                        t.text = item.serviceProviderId;
                        t.value = item.serviceProviderId;
                      } else if (t.attr === 'account') {
                        t.value = item.account;
                        t.text = item.account;
                        t.disable = true;
                      } else if (t.attr === 'accountName') {
                        t.value = item.accountName;
                        t.text = item.accountName;
                        t.disable = true;
                      } else if (t.attr === 'bankOfDeposit') {
                        t.value = item.bankOfDeposit;
                        t.text = item.bankOfDeposit;
                        t.disable = true;
                      }
                    });
                  }
                }
              });
            }
          }));
          this.form.data.push(this.getItemValue({
            attr: 'isMonthly',
            type: 'switch',
            text: '有值',
            title: '月结',
            rules: {},
            line: false
          }));
        } else {
          this.resetItems();
        }
      }
      if (['其他费用'].includes(val)) {
        this.delItem('服务商');
        this.delItem('月结');
        if (this.form.data.findIndex(item => item.title === '其他费用备注') === -1) {
          this.form.data.splice(2, 0, this.getItemValue({
            attr: 'remark',
            title: '其他费用备注',
            placeholder: '请输入其他费用备注'
          }));
        }
        this.resetItems();
      }
    },
    index() {
      this.form.title = `付款指令-${this.index + 1}`;
    }
  },
  methods: {
    getItemValue(item) {
      return {
        text: '',
        value: null,
        indent: true,
        type: 'text',
        required: true,
        placeholder: '',
        rules: {required: true},
        ...item
      };
    },
    validate() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      return Promise.all(arr).then(data => {
        let state = data.every(item => item);
        !state && AlertUtil.showToast({txt: `${this.form.title}表单校验不成功`});
        return state;
      });
    },
    getFormParams() {
      let params = {};
      this.form.data.forEach(t=>params[t.attr] = t.value);
      return params;
    },
    resetItems() {
      // 重置选项
      this.form.data.forEach(item => {
        if (['serviceProviderId', 'account', 'accountName', 'bankOfDeposit'].includes(item.attr)) {
          if (item.disable) {
            item.text = '';
            item.value = null;
            item.disable = false;
          }
        }
      });
    },
    delItem(name) {
      let i = this.form.data.findIndex(item => item.title === name);
      if (i !== -1) {
        this.form.data.splice(i, 1);
      }
    }
  },
  computed: {
    // 根据key拿到列表中的单个item的值
    typeItemValue() {
      let index = this.form.data.findIndex(item => item.attr === 'fundType');
      return index !== -1 ? this.form.data[index].value : null;
    }
  }
};
</script>

