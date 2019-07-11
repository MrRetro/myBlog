<template>
<cube-popup :visible="visible">
    <div class="pop-content">
      <img class="image" :src="icon"/>
      <div class="title">{{title}}</div>
      <div class="message" v-html="message"></div>
      <div class="bottom">
        <yi-touch class="button sure" @click="handleSureClick">我知道了</yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'DialogPop',
  data() {
    return {
      message: '取消原因：',
      title: '标记无效',
      visible: false,
      icon: this.$images.base.ic_danger,
      type: 'default'
    };
  },
  methods: {
    handleSureClick() {
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
    show({title, message, icon, type = 'default'}) {
      this.visible = true;
      this.message = message;
      this.type = type;
      this.title = title;
      if (icon) { this.icon = icon; }
    },
    hide() {
      this.value = '';
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('dialog', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('dialog');
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
      padding 0 px2rem(20)
      color $deepBlack
      medium()
    }

    .image{
      width px2rem(28)
      height px2rem(28)
      margin-top px2rem(16)
      align-self center
    }
    .message{
      line-height px2rem(25)
      font-size px2rem(16)
      margin-bottom px2rem(14)
      padding 0 px2rem(20)
      color #31363B
      regular()
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
