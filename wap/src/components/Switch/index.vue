<template>
  <div class="switch-box">
    <cube-switch v-model="newValue" :disabled="disabled">
      <span v-if="isWord" class="word-box">
        <span class="on">ON</span>
        <span v-if="!newValue" class="off">OFF</span>
      </span>
    </cube-switch>
  </div>
</template>

<script>

export default {
  name: 'yi-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isWord: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(vl) { this.newValue = vl; },
    newValue(vl) { this.$emit('input', vl); }
  },
  data() {
    return {
      newValue: this.value
    };
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.switch-box >>> .cube-switch .cube-switch-input:checked + .cube-switch-ui {
  border-color: #34d574 !important;
  background-color: #34d574 !important;
}
.switch-box >>> .cube-switch .cube-switch-input{
  width 56px
}
.switch-box >>> .cube-switch .cube-switch-ui{
  width 56px
}
.switch-box >>> .cube-switch .cube-switch-input:checked+.cube-switch-ui:after{
  transform translateX(29px)
}
.switch-box >>> .cube-switch-label{
  width 56px
  height 100%
  line-height 30px
  position absolute
  font-size px2rem(12)
  margin-left px2rem(1)
  color white
}
.switch-box .on{
  position absolute
  left 0
  top 0
  width 50%
  height 100%
  text-align center
}
.switch-box .off{
  margin-right px2rem(1)
  color $deepGray
  position absolute
  right 0
  top 0
  width 50%
  height 100%
  text-align center
}
</style>
