<template>
  <div class="count-box">
    <p class="input-box">
      <yi-touch class="btn" @click.passive="vl=vl-1<1?1:vl-1"><span class="sub"></span></yi-touch>
      <span class="value">{{vl}}</span>
      <yi-touch class="btn add" @click.passive="vl=vl+1">
        <span class="sub"></span>
        <span class="add"></span>
      </yi-touch>
    </p>
    <yi-touch class="del" @click="onDel(index)">删除</yi-touch>
  </div>
</template>

<script>
export default {
  name: 'count',
  props: {
    index: {
      type: Number
    },
    value: {
      type: Number,
      default: 1
    }
  },
  watch: {
    value(vl) { this.vl = vl; },
    vl(vl) { this.$emit('input', vl); }
  },
  data() {
    return {
      vl: this.value
    };
  },
  methods: {
    onDel(index) {
      // console.log(index);
      // 删除第index行
      this.$emit('onDel', index);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.count-box{
  display flex
  flex-direction row !important
  width 100%
  line-height px2rem(20)
  align-items center
  font-size px2rem(14)

  .input-box{
    display flex
    flex 1
    flex-direction row
    justify-content space-between
    align-items center
    border-bottom 1px solid $lightGray
    padding px2rem(10) 0 px2rem(8)

    .btn{
      width px2rem(17)
      height px2rem(17)
      line-height px2rem(17)
      border 1px solid #C9C9C9
      border-radius 4px
      position relative

      .sub{
        position absolute
        left px2rem(-3.5)
        top px2rem(-0.5)
        margin-left 50%
        margin-top 50%
        width px2rem(7)
        height 1px
        background-color $deepBlack
      }
      .add{
        position absolute
        left px2rem(-0.5)
        top px2rem(-3.5)
        margin-left 50%
        margin-top 50%
        width 1px
        height px2rem(7)
        background-color $deepBlack
      }
    }
  }
  .del{
    display flex
    padding px2rem(10) px2rem(0) px2rem(8) px2rem(12)
    color red
  }
}
</style>
