<template>
  <div class="suc-box">
    <canvas id="qrccode-canvas"></canvas>
    <p class="p-word">
      经纪人扫描该二维码进入注册页面<br />
      注册后自动绑定该二维码的地推账号
    </p>
    <p class="p-btn" @click="downImg">
      <span>下载二维码</span></p>
  </div>
</template>

<script>
import QRCode from 'qrcode';

let canvas = '';
export default {
  name: 'qr-code',
  props: {
    webUrl: {
      type: String,
      default: 'http://www.2tro.com'
    }
  },
  mounted() {
    this.$nextTick(() => {
      // DOM操作
      canvas = document.getElementById('qrccode-canvas');
      this.createQrc();
    });
  },
  data() {
    return {
      bannerUrl: this.webUrl
    };
  },
  methods: {
    createQrc() {
      if (!this.bannerUrl) {
        window.alert('链接不能为空');
        return false;
      }
      return QRCode.toCanvas(canvas, this.bannerUrl, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('success');
        }
      });
    },
    // 下载二维码
    downImg() {
      let a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = `ma2${parseInt(10000 * Math.random())}`;
      a.click();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.suc-box{
  display flex
  flex 1
  overflow-y auto
  flex-direction column
  align-items center

  #qrccode-canvas{
    width px2rem(280) !important
    height px2rem(280) !important
  }
  .p-word{
    font-size px2rem(14)
    line-height px2rem(20)
    color $darkBlack
    position relative
    top px2rem(-12)
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
    margin-top px2rem(30)

    &:active{
      opacity .8
    }
  }
}
</style>
