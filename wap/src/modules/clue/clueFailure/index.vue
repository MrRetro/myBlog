<template>
  <div class="follow-up app-init">
    <div class="input-box">
      <cube-scroll>
        <template v-for="(item, index) in form">
          <yi-input
            :ref="!!item.rules?'va':null"
            :key="index"
            v-bind="item"
            v-model="item.text"
            :value.sync="item.value"
            :selData="item.selData || null"
            :indent="true"
          />
        </template>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import Page from '../../../components/Mixins/EditPage';
import {markCluefailures} from '../../../api/clue';
import {handleForm, handleMenuSource} from '../../../utils/commonUtil';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'ClueFailure',
  extends: Page,
  data() {
    const {params} = this.$route;
    return {
      params,
      form: [{
        type: 'select',
        title: '失效类型',
        text: '',
        tag: 'failureType',
        placeholder: '请选择失效类型',
        selData: {source: handleMenuSource(this.$store.state.menu.clueFailureType)},
        rules: {required: true},
        required: true,
        indent: true
      }, {
        type: 'select',
        title: '失效理由',
        text: '',
        selData: {source: handleMenuSource(this.$store.state.menu.clueFailureReason)},
        tag: 'failureReasonDefeat',
        key: 'failureReason',
        placeholder: '请选择失效理由',
        rules: {required: true},
        required: true,
        indent: true
      },
      {
        type: 'textarea',
        title: '失效备注',
        text: '',
        placeholder: '请输入失效备注',
        tag: 'failureRemark',
        rules: {required: true, min: 5, max: 100},
        required: true,
        indent: true
      }]
    };
  },
  activated() {
    ddApi.setRight();
  },
  computed: {
    failureTypeValue() {
      return this.form[this.form.findIndex(item=>item.tag === 'failureType')].value;
    }
  },
  watch: {
    failureTypeValue(val) {
      console.log(val);
      let reasonForm = this.form[this.form.findIndex(item=>item.key === 'failureReason')];
      switch (parseInt(val)) {
        case 1:
          reasonForm.selData = {source: handleMenuSource(this.menu.clueFailureReason)};
          reasonForm.text = '';
          reasonForm.tag = 'failureReasonDefeat';
          reasonForm.value = '';
          break;
        case 2:
          reasonForm.selData = {source: handleMenuSource(this.menu.clueFailureReasonInvalid)};
          reasonForm.text = '';
          reasonForm.tag = 'failureReasonInvalid';
          reasonForm.value = '';
          break;
        default:
          break;
      }
    }
  },
  methods: {
    onBtnClick() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          markCluefailures({clueId: this.params.id, ...handleForm(this.form)}).then(() => {
            this.params.onSuccess && this.params.onSuccess();
            this.$router.go(-1);
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .follow-up {

    .input-box {
      display flex
      flex-direction column
      flex 1
      height calc(100% - 50px)
    }

    .btn-box {
      display flex
      flex-direction row
      justify-content center
      align-items center
      width 100%
      height 50px
      background-color #348EED

      .btn {
        font-size px2rem(16)
        font-weight bold
        color white
      }
    }
  }
</style>

