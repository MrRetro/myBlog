<template>
  <p v-if="colors && colors.colors && colors.colors.length">
    <span
      class="p-color"
      :class="{
      'size2':colors.colors.length === 2,
      'hide':colors.colors && !colors.colors[0].hex}"
    >
      <span class="color"
            v-if="colors.colors.length ===1 && colors.colors.hex"
            :style="{background: `-webkit-linear-gradient( top,${rbgColor},${colors.colors[0].hex})`}"
      >
      </span>
      <span class="one" v-if="colors.colors.length ===2 && colors.colors[0].hex" :style="{backgroundColor: `${colors.colors[0].hex}`}" ></span>
      <span class="two" v-if="colors.colors.length ===2 && colors.colors[0].hex" :style="{backgroundColor: `${colors.colors[1].hex}`}" ></span>
    </span>
  </p>
</template>

<script>
import {colorRgb} from '../../utils/commonUtil';

export default {
  name: 'inner-color',
  props: {
    colors: {
      type: [Object, Array, String],
      default: ()=>{
        return { 'colors': [
          {'name': '黑色', 'hex': '#000000'},
          {'name': '蓝色', 'hex': '#0000ff'}
        ]};
      }
    }
  },
  computed: {
    rbgColor() {
      return colorRgb(this.colors.hex) || '#fff';
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.p-color{
  width px2rem(24)
  height px2rem(24)
  display inline-block
  border-radius 50%
  overflow hidden
  position relative

  &.hide{
    display none
  }
  .color{
    left 0
    top 0
    position absolute
    width 100%
    height 100%
  }

  &.size2{
    transform rotate(50deg)

    .one{
      position absolute
      left 0
      top 0
      width 50%
      height 100%
    }
    .two{
      position absolute
      right 0
      top 0
      width 50%
      height 100%
    }
  }
}
</style>
