<template>
<cube-popup :visible="visible">
    <div class="pop-content">
      <div class="title">{{title}}</div>
      <div class="input-contain" v-if="type === 'default'">
        <textarea v-if="type === 'default'" class="input" v-model="value" :placeholder="placeholder"/>
      </div>
      <div class="single-input-contain" v-else-if="type === 'number'" >
        <input class="input" v-model="value" :placeholder="placeholder" onkeyup="value=value.replace(/[^\d]/g,'') "
               ng-pattern="/[^a-zA-Z]/"/>
      </div>
      <div v-if="hint" class="hint">{{hint}}</div>
      <div class="bottom">
        <yi-touch class="button cancel" @click="handleCancelClick">取消</yi-touch>
        <div class="line"></div>
        <yi-touch class="button sure" @click="handleSureClick">确定提交</yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'InputPop',
  data() {
    return {
      hint: '',
      title: '标记无效',
      placeholder: '请输入无效理由...',
      visible: false,
      value: '',
      onSuccess: null,
      type: 'default'
    };
  },
  methods: {
    handleSureClick() {
      if (this.type === 'number') {
        this.value = this.value.replace(/[^\d]/g, '');
      }
      this.onSuccess && this.onSuccess(this.value, this.hide);
    },
    handleCancelClick() {
      this.hide();
    },
    /**
       * 显示弹窗
       * @param hint        底部提示
       * @param title       标题
       * @param placeholder 默认
       * @param onSuccess   确定回调(text,hide)=>void
       * @param type        类型
       */
    show({hint, title, placeholder, onSuccess, type = 'default'}) {
      this.visible = true;
      this.hint = hint;
      this.type = type;
      this.title = title;
      this.placeholder = placeholder;
      this.onSuccess = onSuccess;
    },
    hide() {
      this.value = '';
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('input', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('input');
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
      height px2rem(50)
      line-height px2rem(50)
      font-size px2rem(16)
      color $deepBlack
      medium()
    }
    .single-input-contain{
      margin px2rem(14)
      height px2rem(40)
      background-color #F8F8F8
      border-radius px2rem(4)
      text-align left
      padding 0 px2rem(14)
    }
    .input-contain {
      margin 0 px2rem(14) px2rem(14) px2rem(14)
      height px2rem(120)
      background-color #F8F8F8
      border-radius px2rem(4)
      text-align left
      padding px2rem(14)
    }
    .input {
        background-color transparent
        width 100%
        height 100%
        font-size px2rem(14)
        color $deepBlack
      }
    .hint {
      color $darkBlack
      font-size px2rem(12)
      line-height px2rem(18)
      text-align left
      margin px2rem(6) px2rem(14) px2rem(14) px2rem(14)
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
      }
      .sure {
        color $themeColor
      }
    }
  }
</style>
