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
import {config} from './config';
import {ddApi} from '../../../api/dingding';
import {getFollowUpRecord} from '../../../api/common';
import Page from '../../../components/Mixins/EditPage';
import {getSpaceDate} from '../../../utils/TimeUtil';
import {isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'CommonFollowUp',
  extends: Page,
  data() {
    let params = this.$route.params;
    return {
      data: null,
      isEditMode: params.type === 'edit',
      form: config[params.module].transformData(this),
      initData: config[params.module].transformData(this)
    };
  },
  methods: {
    onBtnClick() {
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          config[this.params.module].commit(this, this.form);
        }
      });
    }
  },
  computed: {
    // 获取线索等级参数以便于监听
    clueLevelParams() {
      if (this.params.module === 'clues') {
        return this.form[2].text;
      }
      return null;
    },
    // 获取跟进目的参数以便于监听
    purposeParams() {
      let index = this.form.findIndex(item=>item.tag === 'purpose');
      return index === -1 ? null : this.form[index].text;
    }
  },
  watch: {
    // 根据选择的线索等级做时间的联动处理
    clueLevelParams(value) {
      if (this.params.module === 'clues' && !this.isEditMode) {
        const timeParams = this.form[3];
        switch (value) {
          case 'H':
            timeParams.disable = true;
            timeParams.text = getSpaceDate(-1, 'yyyy-MM-dd');
            timeParams.value = getSpaceDate(-1, 'yyyy-MM-dd');
            break;
          case 'A':
            timeParams.disable = true;
            timeParams.text = getSpaceDate(-3, 'yyyy-MM-dd');
            timeParams.value = getSpaceDate(-3, 'yyyy-MM-dd');
            break;
          case 'B':
            timeParams.disable = false;
            timeParams.text = getSpaceDate(-15, 'yyyy-MM-dd');
            timeParams.value = getSpaceDate(-15, 'yyyy-MM-dd');
            break;
          case 'C':
            timeParams.disable = false;
            timeParams.text = getSpaceDate(-30, 'yyyy-MM-dd');
            timeParams.value = getSpaceDate(-30, 'yyyy-MM-dd');
            break;
          default:
            break;
        }
      }
    },
    purposeParams(value) {
      let index = this.form.findIndex(item=>item.tag === 'nextExecutionTime');
      if (index !== -1) {
        let params = this.form[index];
        params.rules.required = !!value;
        params.required = !!value;
      }
    }
  },
  mounted() {
    if (this.isEditMode) {
      getFollowUpRecord(this.params.id)
        .then(res => {
          this.data = res;
          let form = config[this.params.module].transformData(this);
          this.form = form;
          console.log('form', form);
          this.initData = JSON.parse(JSON.stringify(form));
        });
    }
  },
  activated() {
    ddApi.setTitle({title: config[this.params.module].title});
    ddApi.setRight();
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

