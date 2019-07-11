<template>
  <cube-popup :visible="visible">
    <div class="pop-content">
      <div v-if="version" class="img-box">
        <img class="image" :src="icon"/>
        <div class="title">{{title}}</div>
      </div>
      <div v-else class="title">{{title}}</div>
      <UpdateCell v-if="isObject" class="message" :form="content"/>
      <div v-else class="message" v-html="newContent"></div>
      <div class="bottom">
        <yi-touch v-if="btnCancel" class="button cancel" @click="handleCancelClick">{{btnCancel}}</yi-touch>
        <yi-touch class="button sure" @click="handleSureClick">{{btnSure}}</yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';
import {UpdateCell} from '../../modules/main/components';

export default {
  name: 'DialogInfo',
  components: {
    UpdateCell
  },
  computed: {
    isObject() {
      if (typeof this.content === 'object') {
        return true;
      }
      return false;
    },
    // 处理过换行的内容
    newContent() {
      try {
        return this.content.replace(/\\\\n|\\n|\\r|(\\r\\n)|(\u0085)|(\u2028)|(\u2029)/g, '<br/>');
      } catch (e) {
        return this.content;
      }
    }
  },
  data() {
    return {
      version: false,
      title: '标记无效',
      content: '取消原因：',
      btnCancel: '',
      btnSure: '我知道了',
      visible: false,
      icon: this.$images.work.img_update,
      type: 'default',
      onSuccess: null
    };
  },
  methods: {
    handleSureClick() {
      this.onSuccess && this.onSuccess({state: true});
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
    show({version = false, title, content, btnCancel, btnSure, icon, type = 'default', onSuccess}) {
      this.visible = true;
      this.version = version;
      this.content = content;
      this.btnCancel = btnCancel || this.btnCancel;
      this.btnSure = btnSure || this.btnSure;
      this.type = type;
      this.title = title;
      this.onSuccess = onSuccess;
      if (icon) { this.icon = icon; }
    },
    hide() {
      this.value = '';
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('dialogInfo', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('dialogInfo');
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
    .message{
      line-height px2rem(25)
      font-size px2rem(16)
      margin-top px2rem(10)
      text-align left
      padding px2rem(10) px2rem(20)
      color #31363B
      max-height px2rem(280)
      overflow-y auto
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
        border-right 1px solid $lightGray
      }
      .sure {
        color $themeColor
      }
    }
  }
</style>
