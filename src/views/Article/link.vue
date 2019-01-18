<template>
  <div class="container">
    <a href="http://www.o-wu.com"></a><br />
    <a class="link" href="http://www.o-wu.com">css禁用a标签链接 {pointer-events: none;}</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Link extends Vue {
  }
</script>
<style lang="less" scoped>
.container {
  margin: 120px;
  a {
    color: orange;
  }
  .link{
    color: red;
    pointer-events: none;
  }
}
a[href^="http"]:empty::before {
  content: attr(href);
}
</style>
