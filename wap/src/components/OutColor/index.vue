<template>
  <span class="p-color" v-if="colors && colors.hex">
    <span class="color" :style="{background: `-webkit-linear-gradient( top,${rbgColor},${colors.hex})`}" ></span>
    <!--<span class="one" v-if="colors.colors.length ===2" :style="{backgroundColor: `${colors.colors[0].hex}`}" ></span>-->
    <!--<span class="two" v-if="colors.colors.length ===2" :style="{backgroundColor: `${colors.colors[1].hex}`}" ></span>-->
  </span>
</template>

<script>
import {colorRgb} from '../../utils/commonUtil';

export default {
  name: 'out-color',
  props: {
    colors: {
      type: [Object, Array, String],
      default: ()=>{
        return { 'name': '摩登灰', 'hex': '#404040'};
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
