<template>
  <div class="container">
    <div class="radio-beauty-container">
      <label>
        <span class="radio-name">前端工程师</span>
        <input type="checkbox" name="radioName" id="radioName1" hidden/>
        <label for="radioName1" class="radio-beauty"></label>
      </label>
      <label>
        <span class="radio-name">后端工程师</span>
        <input type="checkbox" name="radioName" id="radioName2" hidden/>
        <label for="radioName2" class="radio-beauty"></label>
      </label>
      <label>
        <span class="radio-name">全栈工程师</span>
        <input type="checkbox" name="radioName" id="radioName3" hidden/>
        <label for="radioName3" class="radio-beauty"></label>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
  })
export default class CheckBox extends Vue {
  }
</script>
<style lang="less" scoped>

  .container { margin: 120px; background-color: white; }
  @bgc: green;
  .common {
    padding: 2px;
    background-color: @bgc;
    background-clip: content-box;
  }
  .radio-beauty-container {
    font-size: 0px;
  }
  .radio-name {
    vertical-align: middle;
    font-size: 16px;
  }
  .radio-beauty {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid @bgc;
    vertical-align: middle;
    margin: 0 15px 0 4px;
    &:hover {
      box-shadow: 0 0 7px @bgc;
      &:extend(.common);
    }
  }
  input[type="checkbox"]:checked+.radio-beauty {
    &:extend(.common);
  }
</style>
