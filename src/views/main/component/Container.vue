<template>
  <div class="container">
    <div class="container-boder">
      <slot name="left" />
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({})
export default class container extends Vue {

}
</script>

<style scoped>
  .container{
    display: flex;
    position: relative;
    margin-left: 50%;
    left: -600px;
    width: 1200px;
    background-color: white;
  }
  .container-boder{
    margin-left: 30px;
  }
</style>
