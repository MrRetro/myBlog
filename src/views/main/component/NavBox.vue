<template>
  <ul class="nav-box">
    <li class="li-item" v-for="(item,i) in data" :key="i">
      {{item.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  @Component({
    props: {
      data: {
        type: Array,
        default: [
          {name: '✰前端', type: 'front'},
          {name: '✰学习', type: 'study'},
          {name: '✰日志', type: 'logic'},
          {name: '✰娱乐', type: 'play'}
        ]
      }
    }
  })
export default class NavBox extends Vue {

  }
</script>

<style scoped>
.nav-box{
  float: left;
  width: 100%;
  list-style: none;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
}
.nav-box .li-item{
  float: left;
  width: 25%;
  line-height: 80px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1.5px;
}
</style>
