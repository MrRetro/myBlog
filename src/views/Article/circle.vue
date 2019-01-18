<template>
  <div class="circle">
    <p class="word"><span></span></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Circle extends Vue {
  }
</script>
<style scoped>
  .circle{
    padding: 200px;
  }
  .circle .word{
    margin: auto;
    width: 300px;
    height: 300px;
    overflow: hidden;
  }
  .circle .word span{
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 250px dotted red;
  }
</style>
