<template>
  <yi-touch class="select-box" @click="onSelect">
    <input
      class="input"
      :value="vl"
      :placeholder="placeholder"
      readonly
    />
    <img class="angle-right" :src="$images.base.ic_next_grey" alt="ico" />
  </yi-touch>
</template>

<script>
export default {
  name: 'select',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择手续详情'
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
    onSelect() {
      this.$emit('onSelect');
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.select-box{
  display flex
  flex-direction row
  line-height px2rem(20)
  align-items center
  padding px2rem(10) 0 px2rem(8)
  border-bottom 1px solid $lightGray

  .input{
    font-size px2rem(14)
    color $deepBlack
  }
  .angle-right{
    width px2rem(10)
    height px2rem(10)
    margin 0 px2rem(14)
    margin-right px2rem(0)
    margin-left 0
  }
}
</style>
