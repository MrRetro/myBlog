<template>
  <div>
    <div id="div" class="style" contenteditable="true" :style="`${data}`" @input="handleChange">
      {{data}}
    </div>
    <span class="word">编辑红色文字试试！！！</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class EditDiv extends Vue {
    data: String = 'color:red;'

    get getStyle () {
      return this.data
    }
    handleChange () {
      let div = document.getElementById('div')
      if (div) {
        div.style.cssText = div.innerHTML
      }
    }
  }
</script>
<style>
  #div{
    line-height: 300px;
  }
  .word{
    font-size: 16px;
    color: #b0b0b0;
  }
</style>
