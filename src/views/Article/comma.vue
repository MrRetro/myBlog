<template>
  <div class="container">
    <ul class="nav">
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
      <li>e</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Comma extends Vue {
  }
</script>
<style lang="less" scoped>
.container {
  margin: 120px;

  li {
    list-style: none;
    margin-bottom: 10px;
    display: inline-block;
    color: #348eed;
  }

  ul > li:not(:last-child)::after {
    content: ",";
  }
}
</style>
