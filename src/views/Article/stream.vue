<template>
  <div class="container-box">
    <p class="stream">我是一段流光文字！！！！！</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Stream extends Vue {
  }
</script>
<style lang="less">
  .container-box { margin: 60px; background-color: white; }
  @-webkit-keyframes masked-animation {
    0% {
      background-position: 0 0
    }
    to {
      background-position: -100% 0
    }
  }

  p.stream {
    line-height: 100px;
    text-align: center;
    color: hsla(0, 0%, 100%, .65);
    font-weight: 800;
    font-size: 52px;
    background-image: -webkit-linear-gradient(left, #cddc39, #ff9800 25%, #cddc39 50%, #ff9800 75%, #cddc39);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation .5s infinite linear;
  }

  p:hover {
    -webkit-animation: masked-animation .2s infinite linear;
  }
</style>
