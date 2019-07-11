<template>
  <Inquiry @commit="commit" :form="form"/>
</template>

<script>
import Inquiry from '../../../views/Inquiry/index';
import {saveEnquiryPrices} from '../../../api/common';
import Page from '../../../components/Mixins/EditPage';
import {transformColorName} from '../../../utils/commonUtil';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'CommonInquiry',
  extends: Page,
  components: {
    Inquiry
  },
  data() {
    const id = this.$route.params.id;
    let disable = false;
    let text = '';
    let carName = '';
    let inColor = '';
    let outColor = '';
    let level = '';
    if (this.$route.params.module === 'clues') {
      try {
        disable = true;
        text = this.$route.params.params.clueNo;
        carName = this.$route.params.params.carName;
        inColor = transformColorName(this.$route.params.params.interior);
        outColor = transformColorName(this.$route.params.params.appearance);
        level = this.$route.params.params.intentionGrade.name;
      } catch (e) {
        console.log('错误', e);
      }
    }
    return {
      module: this.$route.params.module,
      id,
      form: [
        {
          type: 'click',
          title: '询价线索',
          text,
          disable,
          placeholder: '请选择询价线索',
          onClick: () => {
            this.$RouteUtil.clueList({
              module: this.module,
              type: 'choose',
              id: this.id,
              onSuccess: (value) => {
                this.form[0].text = value.clueNo;
                this.form[0].id = value.id;
                this.form[1].title = value.carName;
                this.form[1].level = value.intentionGrade.name;
                this.form[1].inColor = transformColorName(value.interior);
                this.form[1].outColor = transformColorName(value.appearance);
                // todo 等级赋值
              }
            });
          },
          rules: {required: true},
          indent: false
        },
        {
          disable,
          type: 'car',
          title: carName,
          inColor,
          outColor,
          level
        },
        {
          type: 'address',
          title: '上牌地区',
          text: '',
          value: '',
          placeholder: '请选择地区',
          rules: {required: true},
          indent: true,
          required: true
        },
        {
          type: 'text',
          title: '其他需求',
          text: '',
          placeholder: '请输入其他需求',
          indent: true
        }
      ]
    };
  },
  activated() {
    ddApi.setRight();
  },
  methods: {
    isEdit() {
      return this.form.filter(item=>!item.disable && item.text).length !== 0;
    },
    async commit() {
      let type = '';
      let params = null;
      switch (this.module) {
        case 'customers':
          type = 'customer';
          params = {type, clueId: this.form[0].id, areaId: this.form[2].value, customerId: this.id, demand: this.form[3].text};
          break;
        case 'clues':
          type = 'clue';
          params = {type, clueId: this.id, areaId: this.form[2].value, customerId: this.params.params.customerId, demand: this.form[3].text};
          break;
        default:
          break;
      }
      await saveEnquiryPrices(params);
      this.params.onSuccess && this.params.onSuccess();
      this.$router.go(-1);
    }
  }
};
</script>
