<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  created () {
    let div = document.querySelector('.spinner')
    div && div.classList.remove('hide')

    // 隐藏加载
    this.$nextTick(() => {
      let fn = setTimeout(() => {
        div && div.classList.add('hide')
        let fn2 = setTimeout(() => {
          div && div.classList.add('isNone')
          clearTimeout(fn2)
        }, 2000)
        clearTimeout(fn)
      }, 0)
    })
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
