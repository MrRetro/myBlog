<template>
    <span class="p-color" :class="{'size2':colors2.size === 2}" v-if="colors2 && colors2.color[1]">
      <span class="color" v-if="colors2.size ===1" :style="{background: `-webkit-linear-gradient( top,${colors2.color[0]},${colors2.color[1]})`}" ></span>
      <span class="one" v-if="colors2.size ===2" :style="{backgroundColor: `${colors2.color[0]}`}" ></span>
      <span class="two" v-if="colors2.size ===2" :style="{backgroundColor: `${colors2.color[1]}`}" ></span>}}
    </span>
</template>

<script>
export default {
  name: 'color-box',
  props: {
    colors: {
      type: Object
      // default: ()=>{ return { size: 1, color: ['#cdcdcd', '#000000']}; }
    }
  },
  data() {
    return {
      colors2: this.colors
    };
  },
  watch: {
    colors2(vl) {
      this.$emit('update:colors', vl);
    }
  },
  methods: {
    setColor(obj) {
      this.colors2 = obj;
      console.log(obj, '666');
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
