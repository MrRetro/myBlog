<template>
  <div :class="{'tail':isTail,'top':isTop}" class="page-explain" v-html="data" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: {
    data: {
      type: String
    },
    isTail: {
      type: Boolean,
      default: false
    },
    isTop: {
      type: Boolean,
      default: false
    }
  }
})
export default class PageExplain extends Vue {

}
</script>

<style scoped>
.page-explain{
  font-size: 14px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: black;
  text-align: center;
  color: white;
}
.top{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}
.tail{
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 10;
}
</style>
