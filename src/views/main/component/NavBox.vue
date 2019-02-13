<template>
  <ul class="nav-box">
    <li
      class="li-item"
      :class="{'cur':selectIndex === i}"
      v-for="(item,i) in data"
      :key="i"
      @click="handleSelectNav(i,item.type)"
    >
      {{item.name}}
      <span class="border"></span>
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
        default: () => [
          {name: '✰前端', type: 'front'},
          {name: '✰学习', type: 'study'},
          {name: '✰日志', type: 'logic'},
          {name: '✰娱乐', type: 'play'}
        ]
      }
    }
  })
export default class NavBox extends Vue {
    selectIndex: Number = -1

    // 选中导航菜单项
    handleSelectNav (index:Number, type:String) {
      this.selectIndex = index
      this.$emit('onSelectType', type)
    }
  }
</script>

<style scoped>
.nav-box{
  float: left;
  width: 100%;
  list-style: none;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.nav-box .li-item{
  position: relative;
  float: left;
  width: 25%;
  line-height: 80px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1.5px;
  transition: color .3s linear;
}
.nav-box .li-item .border{
  position: absolute;
  left:100%;
  right:100%;
  bottom: 0px;
  height: 5px;
  background-color: #ECAD9E;
  transition: left .3s linear,right .3s linear;
}
.nav-box .li-item:nth-child(1) .border{
  left: 20%;
}
.nav-box .li-item:last-child .border{
  right: 20%;
}
.nav-box .li-item:hover,
.nav-box .li-item.cur{
  color: #F4606C;
}
.nav-box .li-item:hover .border,
.nav-box .li-item.cur .border{
  left: 20%;
  right: 20%;
}
</style>
