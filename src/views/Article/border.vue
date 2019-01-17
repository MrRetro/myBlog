<template>
  <div>
    <p></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class Border extends Vue {
  }
</script>
<style>
  div{
    background-color: wheat;
    margin: 10px;
    padding: 30px;
  }
  p {
    margin: 100px;
    box-shadow: 0 0 0 6px rgba(255, 0, 0, 0.2),
    0 0 0 12px rgba(0, 0, 0, 0.2),
    0 0 0 18px rgba(0, 0, 0, 0.2),
    0 0 0 24px rgba(0, 0, 0, 0.2);
    height: 200px;
    margin: 50px auto;
    width: 400px
  }
</style>
