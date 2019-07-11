<template>
  <!--<div>-->
  <!--<img-->
  <!--class="icon"-->
  <!--v-for="i in [1,2,3,4,5]"-->
  <!--:key="i"-->
  <!--@click="handleClick(i)"-->
  <!--:src="i <= value ? $images.base.star_active : $images.base.star_normal"-->
  <!--/>-->
  <!--</div>-->
  <!--<cube-rate class="icon" :value="2" :max="5" @input="handleClick" :disabled="disabled" :justify="false"></cube-rate>-->
  <cube-rate
    :class="{normal:size === 'normal',small:size==='small',big:size==='big'}"
    :disabled="disabled"
    :value="value"
    @input="handleClick"
    :justify="true"></cube-rate>
</template>

<script>
export default {
  name: 'Star',
  props: {
    // 值
    value: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: 'normal' // one of['normal','small','big']
    },
    // 是否可点击
    disabled: Boolean
  },
  methods: {
    handleClick(i) {
      if (this.disabled) return;
      this.$emit('input', i);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .normal {
    width: px2rem(122.5);
    height: px2rem(20);
    justify-content flex-start
  }

  .normal >>> .cube-rate-item {
    width px2rem(20) !important
    margin-right px2rem(4.5)
  }

  .small {
    width: px2rem(89);
    height: px2rem(14);
  }

  .small >>> .cube-rate-item {
    margin-right px2rem(3.5)
  }

  .big {
    width: px2rem(139);
    height: px2rem(22);
  }

  .big >>> .cube-rate-item {
    margin-right px2rem(6.2)
  }

  >>> .cube-rate-item .cube-rate-item-def {
    background-image url("../../assets/images/base/star_normal.png")
  }

  >>> .cube-rate-item_active .cube-rate-item-def {
    background-image url("../../assets/images/base/star_active.png")
  }
</style>
