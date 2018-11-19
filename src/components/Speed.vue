<template>
  <div class="hello">
    测试js速度
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// @Component 修饰符注明了此类为一个 Vue 组件

@Component({})
export default class Spped extends Vue {
  // initial data
  msg: String = '123'

  // use prop values for initial data
  helloMsg = 'Hello, ' + 'ddd'

  // lifecycle hook
  mounted () {
    this.arrySpeed1()
    this.arrySpeed2()
    this.arrySpeed3()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  // arry执行速度
  arrySpeed1 () {
    console.time('array1')
    let arr = [1, 2, 3, 4, 5]
    let count = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      count += arr[i]
    }
    console.log(count)
    console.timeEnd('array1')
  }
  arrySpeed2 () {
    console.time('array2')
    let arr = [8, 2, 3, 4, 5]
    let count = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      count += arr[i]
    }
    console.log(count)
    console.timeEnd('array2')
  }
  arrySpeed3 () {
    console.time('array3')
    let arr = [8, 2, 3, 4, 5]
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      count += arr[i]
    }
    console.log(count)
    console.timeEnd('array3')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
