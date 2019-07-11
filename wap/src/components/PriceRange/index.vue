<template>
  <div class="price-box">
    <div class="sel-bar" :style="`width: ${width}%; left: ${left}%`"></div>
    <div id="left" class="button-box" :style="`left: ${left}%`">
      <div tabindex="0" class="button">
        <p class="info">{{left}}万</p>
      </div>
    </div>
    <div id="right" class="button-box" :style="`left: ${right}%`">
      <div tabindex="0" class="button">
        <p class="info">{{right}}万</p>
      </div>
    </div>
    <div
      class="mark"
      :class="{'start':index ===0, 'end': index ===range.length-1, 'hide':sel[index]}"
      :key="index"
      :style="`left: ${item}%`"
      v-for="(item,index) in range"
      @click.stop.prevent="selItem(item)"
    >
      <span class="sp-mark"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'price-range',
  mounted() {
    this.$nextTick(()=>{
      let a = this.value;
      this.$emit('input', [10, 90, 100]); // 处理引用类型值不变原因
      setTimeout(()=>{
        this.$emit('input', a);
      }, 500);
      let left = document.getElementById('left');
      left.addEventListener('touchstart', () => {
        left.classList.add('hover');
        left.addEventListener('touchmove', (evt)=>{
          const touch = evt.touches[0]; // 获取第一个触点
          const demoX = Number(touch.pageX); // 页面触点X坐标

          console.log(demoX);
        });
      });
      left.addEventListener('touchend', () => {
        left.classList.remove('hover');
      });
      let right = document.getElementById('right');
      right.addEventListener('touchstart', () => {
        right.classList.add('hover');
        right.addEventListener('touchmove', (evt)=>{
          const touch = evt.touches[0]; // 获取第一个触点
          const demoX = Number(touch.pageX); // 页面触点X坐标

          console.log(demoX);
        });
      });
      right.addEventListener('touchend', () => {
        right.classList.remove('hover');
      });
    });
  },
  props: {
    value: {
      type: [Array, String],
      default: ()=>[10, 20]
    }
  },
  computed: {
    width() {
      return Math.max(this.value[0], this.value[1]) - Math.min(this.value[0], this.value[1]);
    },
    left() {
      return Math.min(this.value[0], this.value[1]);
    },
    right() {
      return Math.max(this.value[0], this.value[1]);
    }
  },
  data() {
    return {
      newValue: this.value,
      range: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      sel: [false, false, false, false, false, false, false, false, false, false, false]
    };
  },
  watch: {
    value(vl) {
      this.newValue = vl;
      this.range.forEach((item, index)=>{
        if (item >= vl[0] && item <= vl[1]) {
          this.sel[index] = true;
        } else {
          this.sel[index] = false;
        }
      });
    },
    newValue(vl) {
      this.$emit('input', vl);
    },
    left() {
      const div = document.getElementById('left');
      div.classList.add('hover');
      setTimeout(()=>{
        div.classList.remove('hover');
      }, 500);
    },
    right() {
      const div = document.getElementById('right');
      div.classList.add('hover');
      setTimeout(()=>{
        div.classList.remove('hover');
      }, 500);
    }
  },
  methods: {
    selItem(value) {
      let vl = this.newValue;
      this.newValue = [];
      if (value < this.left) {
        this.newValue[0] = value;
        this.newValue[1] = vl[1];
      } else if (value > this.right) {
        this.newValue[0] = vl[0];
        this.newValue[1] = value;
      } else {
        let range = this.right - this.left;
        if (value - this.left < range / 2) {
          this.newValue[0] = value;
          this.newValue[1] = vl[1];
        } else {
          this.newValue[0] = vl[0];
          this.newValue[1] = value;
        }
      }
    },
    leftShow() {
      let left = document.getElementById('left');
      left.classList.remove('hover');
    }
  }
};
</script>


<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .price-box{
    width 90%
    left 5%
    height px2rem(6)
    border-radius px2rem(3)
    background-color #e4e7ed
    cursor pointer
    margin px2rem(16) 0
    position relative

    .sel-bar{
      position absolute
      width 100%
      height px2rem(6)
      left 0%
      border-radius px2rem(3)
      background-color #409EFF
      z-index 8
    }
    .button-box{
      position absolute
      top 0
      width px2rem(36)
      height px2rem(36)
      top px2rem(-15)
      text-align center
      transform translateX(-50%)
      display flex
      justify-content center
      align-items center
      user-select none
      z-index 15

      .button{
        width px2rem(16)
        height px2rem(16)
        background-color white
        border-radius 50%
        border px2rem(2) solid #409EFF
        transition .2s
        transform-origin center center
        user-select none
        cursor grab
        text-align center
        position relative

        .info{
          display none
          position absolute
          background-color #303133
          color white
          font-size 12px
          top px2rem(-26)
          width px2rem(40)
          left px2rem(-12)
          height px2rem(20)
          line-height px2rem(20)
          border-radius px2rem(3)

          &:after{
            position absolute
            content ''
            width: 0px;
            height: 0px;
            border: 1px solid red;
            border-color: #303133 transparent transparent transparent;
            border-width: px2rem(3);
            left 50%
            bottom px2rem(-6)
            transform translateX(-50%)
          }
        }

        &:hover{
          transform scale(1.2)
        }
      }

      &.hover .button{
        transform scale(1.2)

        .info{
          display inline-block
        }
      }
    }
    .mark{
      position absolute
      width 10%
      height px2rem(36)
      top px2rem(-15)
      transform translateX(-50%)
      border-radius 50%
      z-index 11
      display flex
      justify-content center
      align-items center

      .sp-mark{
        width px2rem(6)
        height px2rem(6)
        background-color white
        border-radius 50%
      }

      &.start{
        .sp-mark {
          background-color initial
        }
      }
      &.end{
        .sp-mark {
          background-color initial
        }
      }
      &.hide{
        .sp-mark {
          background-color initial
        }
      }
    }
  }
</style>
