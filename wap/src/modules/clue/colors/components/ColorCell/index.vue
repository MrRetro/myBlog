<template>
  <div class="color-box">
    <div class="color">
      <p v-if="data.color && data.color.hex"
        class="p-color"
        :style="`background-image:linear-gradient(-287deg, ${data.color && data.color.hex||'#f1f2f3'} 0%, #FFFFFF 100%)`"
      ></p>
      <p v-else class="p-color"></p>
      <div class="word-box">
        <p class="name">{{data.name}}</p>
        <p class="sub-box">
          <span class="sub-name">{{data.subName}}</span>
          <span class="change-name">{{data.changeName}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    form: {
      type: Object,
      default: ()=>{
        return {
          color: '',
          name: '暂无颜色',
          subName: '内饰颜色',
          changeName: '选择颜色'
        };
      }
    }
  },
  watch: {
    form(vl) { this.data = vl; },
    data(vl) { this.$emit('input', vl); }
  },
  data() {
    return {
      data: this.form
    };
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.color-box{
  display flex
  flex-direction row
  justify-content center
  margin px2rem(28) 0 px2rem(14)

  .color {
    display flex
    flex-direction column
    box-shadow 0 px2rem(2) px2rem(12) 0 rgba(0, 0, 0, 0.10)
    border-radius px2rem(4)
    width px2rem(240)
    height px2rem(200)
    overflow hide

    .p-color{
      width 100%
      height px2rem(130)
      background #D8D8D8
      border-top-left-radius px2rem(4)
      border-top-right-radius px2rem(4)
    }
    .word-box{
      display flex
      flex-direction column
      align-items flex-start
      width 100%
      height px2rem(30)

      .name{
        font-family PingFangSC-Medium
        font-size: px2rem(16)
        line-height px2rem(22)
        color #2E3443
        letter-spacing 0
        margin px2rem(12)
        margin-bottom 0
      }
      .sub-box{
        display flex
        flex-direction row
        flex 1
        justify-content space-between
        margin-top px2rem(4)
        width 100%
        font-size px2rem(14)
        line-height px2rem(20)

        .sub-name{
          margin-left px2rem(12)
          color #8D8D8D
        }
        .change-name{
          margin-right px2rem(12)
          color #348EED
        }
      }
    }
  }
}

</style>
