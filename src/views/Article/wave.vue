<template>
  <div class="container">
    <span>我是一段带有波浪线的文字</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Wave extends Vue {
  }
</script>
<style lang="less" scoped>
.waveline(@color,@h) {
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: @h;
    background: linear-gradient(135deg, transparent, transparent 45%, @color, transparent 55%, transparent 100%),
    linear-gradient(45deg, transparent, transparent 45%, @color, transparent 55%, transparent 100%);
    background-size: @h * 2 @h * 2;
  }
}
.container {
  margin: 120px;

  span{
    color: #348eed;
    .waveline(red, 5px)
  }
}
</style>
