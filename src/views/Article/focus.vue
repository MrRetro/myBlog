<template>
  <div class="container">
    <input type="text" autofocus>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Focus extends Vue {
  }
</script>
<style lang="less" scoped>
.container {
  margin: 120px;
  input{
    padding: 10px;
    caret-color: #47cf73;
  }
}
</style>
