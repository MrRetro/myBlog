<template>
  <div>
    {{data}}
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue from 'vue'
import Component from 'vue-class-component'
import Axios from 'axios'
// @Component 修饰符注明了此类为一个 Vue 组件

@Component({})
export default class main extends Vue {
  data: Object = []

  mounted () {
    Axios.get('http://localhost:3003/')
      .then(res => {
        console.log(res)
        this.data = res
      })
  }
}
</script>
