<template>
  <cube-popup :visible="visible">
    <div class="pop-content">
      <div class="title">{{title}}</div>
      <div v-if="type === 'amount'" class="content-box">
        <input
          ref="inputAmount"
          class="content"
          type="text"
          v-model="value"
          pattern="[1-9]*"
        />
        <span class="sp-word">台</span>
      </div>
      <div v-if="type === 'insurer'" class="content-box">
        <input
          ref="inputInsurer"
          class="content"
          type="text"
          v-model="value"
          :placeholder="placeholder"
        />
      </div>
      <div class="bottom">
        <yi-touch v-if="btnCancel" class="button cancel" @click="handleCancelClick">{{btnCancel}}</yi-touch>
        <yi-touch class="button sure" @click="handleSureClick">{{btnSure}}</yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';
import {changeMoneyToChinese} from '../../utils/commonUtil';

export default {
  name: 'choose-amount',
  computed: {
    contentName() {
      return changeMoneyToChinese(this.value);
    }
  },
  data() {
    return {
      title: '标记无效',
      btnCancel: '',
      btnSure: '我知道了',
      placeholder: '请输入保险公司名称',
      visible: false,
      icon: this.$images.work.img_update,
      type: 'default',
      value: 1
    };
  },
  methods: {
    handleSureClick() {
      if (this.type === 'amount') {
        this.onSuccess && this.onSuccess({
          key: this.contentName,
          value: this.value
        });
      }
      if (this.type === 'insurer') {
        if (this.value) {
          this.onSuccess && this.onSuccess({
            key: this.value,
            value: this.value
          });
        } else {
          this.$AlertUtil.showToast({txt: '您还未输入！', type: 'warn'});
          return;
        }
      }
      this.hide();
    },
    handleCancelClick() {
      this.hide();
    },
    /**
       * 显示弹窗
       * @param hint        底部提示
       * @param title       标题
       * @param type        类型
       */
    show({type = 'default', title, value, btnCancel, btnSure, onSuccess, placeholder}) {
      this.visible = true;
      this.type = type;
      this.title = title;
      this.value = value;
      this.btnCancel = btnCancel || this.btnCancel;
      this.btnSure = btnSure || this.btnSure;
      this.onSuccess = onSuccess;
      this.placeholder = placeholder || this.placeholder;

      if (this.type === 'amount') {
        this.$refs.inputAmount && this.$refs.inputAmount.focus();
      }
      if (this.type === 'insurer') {
        this.$refs.inputInsurer && this.$refs.inputInsurer.focus();
      }
    },
    hide() {
      this.value = '';
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('chooseCustomize', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('chooseCustomize');
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .pop-content {
    width px2rem(346)
    border-radius px2rem(4)
    background-color white
    display flex
    overflow hidden
    flex-direction column
    .title {
      line-height px2rem(40)
      font-size px2rem(16)
      line-height px2rem(22)
      padding px2rem(16) px2rem(20)
      color $deepBlack
      medium()
    }
    .img-box{
      background-image: linear-gradient(-180deg, #48D1FC 0%, #348EED 100%);
      border-bottom-left-radius 50%
      border-bottom-right-radius 50%

      .title{
        color white
        line-height px2rem(45)
      }
    }
    .image{
      width px2rem(206)
      height px2rem(71)
      margin-top px2rem(16)
      align-self center
    }
    .content-box{
      display flex
      flex-direction row
      justify-content center
      align-items center
      margin px2rem(0) px2rem(0) px2rem(14)

      .content{
        width px2rem(208)
        height px2rem(40)
        line-height px2rem(40)
        background-color #f8f8f8
        border-radius px2rem(4)
        padding 0 px2rem(8)
        text-align center
      }
      .sp-word{
        font-size px2rem(14)
        color $deepBlack
        margin-left px2rem(10)
      }
    }

    .bottom {
      height px2rem(46)
      width 100%
      border-top-style double
      margin-top px2rem(6)
      border-top-width 1px
      border-top-color #eaeaea
      display flex
      regular()
      .line {
        width 1px;
        background-color #eaeaea
      }
      .button {
        flex 1
        font-size px2rem(14)
        line-height px2rem(46)
      }
      .cancel {
        color $darkBlack
        border-right 1px solid $lightGray
      }
      .sure {
        color $themeColor
      }
    }
  }
</style>
