<template>
  <div class="ants">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class EditDiv extends Vue {
  }
</script>
<style>
  @keyframes ants {
    to { background-position:100% }
  }
  .ants{
    position: relative;
    margin: 100px;
    margin-left: 50%;
    left: -100px;

    width: 200px;
    height:200px;
    padding:1em;
    border: 1px solid transparent;
    background:
      linear-gradient(white,white) padding-box,
      repeating-linear-gradient(-45deg,
      black 0,black 25%,white 0,white 50%
      )0 /.6em .6em;
    animation:ants 8s linear infinite;
  }
</style>
