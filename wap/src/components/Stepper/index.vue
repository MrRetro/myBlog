<template>
  <div class="contain">
    <yi-touch class="left" @click="del" component-name="img" :src="$images.form.ic_del"/>
    <input v-model="txt" class="input"/>
    <yi-touch class="right" @click="add" component-name="img" :src="$images.form.ic_add"/>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: {
    // 值
    value: {
      type: String,
      default: '1'
    },
    // 是否可点击
    disabled: Boolean,
    max: {
      type: Number,
      default: 9999
    },
    min: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      txt: this.value || this.min
    };
  },
  watch: {
    txt() {
      if (!this.txt) this.txt = this.min;
      this.txt = String(this.txt).replace(/[^\d]/g, '');
      let value = parseInt(this.txt);
      if (value > this.max) {
        this.txt = this.max;
      }
      if (value < this.min) {
        this.txt = this.min;
      }
      this.$emit('input', String(this.txt));
    }
  },
  methods: {
    handleClick(i) {
      if (this.disabled) return;
      this.$emit('input', i);
    },
    add() {
      this.txt = parseInt(this.txt) + this.step;
    },
    del() {
      if (parseInt(this.txt) <= this.min) return;
      this.txt = parseInt(this.txt) - this.step;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    display flex
    height px2rem(38)
    align-items center
    border-bottom-style solid
    border-bottom-color #F2F2F2
    border-bottom-width 1px
    img {
      width px2rem(17)
      height px2rem(17)
      padding px2rem(9)
    }
    .left {
      padding-left 0 !important
    }
    .right {
      padding-right 0 !important
    }
    .input {
      background-color transparent
      text-align center
      color $deepBlack
      min-width px2rem(40)
      font-size px2rem(14)
      flex 1
    }
  }
</style>
