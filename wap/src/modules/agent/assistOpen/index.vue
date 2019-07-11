<template>
  <div>
    <div class="input-box2">
      <cube-scroll>
        <template v-for="(item, index) in form.data">
          <yi-input
            :ref="!!item.rules?'va':null"
            :key="index"
            :type="item.type"
            :title="item.title"
            v-model="item.text"
            :value.sync="item.value"
            :placeholder="item.placeholder"
            :indent="item.indent"
            :selData="item.selData || null"
            :rules="item.rules"
          />
        </template>
      </cube-scroll>
    </div>
    <p class="warn">
      <span v-if="warn">验证码有误，请重新输入！</span>
    </p>
    <yi-touch component-name="p" class="p-btn" :class="form.data[0].text && form.data[1].text?null:'gray'" @click="onBtnClick">
      <span>下一步</span></yi-touch>
  </div>
</template>

<script>
import BasePage from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'assist-open',
  extends: BasePage,
  data: ()=>{
    return {
      warn: false,
      form: {
        data: [
          {
            type: 'text',
            title: '经纪人手机号',
            text: '',
            placeholder: '请输入经纪人手机号',
            rules: {required: true, mobile: true},
            indent: false
          },
          {
            type: 'message',
            title: '验证码',
            text: '',
            placeholder: '请输入手机验证码',
            rules: {required: true},
            indent: false
          }
        ]
      }
    };
  },
  activated() {
    ddApi.setRight();
  },
  methods: {
    onBtnClick() {
      const arr = this.$refs.va.map((item)=>{
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          console.log(this.form, '校验成功并提交数据');

          this.warn = true;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.warn{
  display flex
  text-align left
  height px2rem(60)
  padding px2rem(0) px2rem(20)
  font-size px2rem(14)
  color #e64340

  span{
    margin-top px2rem(16)
  }
}
.p-btn{
  display flex
  flex-direction row
  justify-content center
  width calc(100% - 30px)
  margin px2rem(0) px2rem(15)
  border-radius px2rem(4)
  height px2rem(50)
  line-height px2rem(50)
  text-align center
  background-color #348EED
  color white
  font-size px2rem(16)

  &:active{
    opacity .8
  }

  &.gray{
    background-color $deepGray
  }
}
</style>
