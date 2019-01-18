<template>
  <div class="page-box">
    <!--{{data}}-->
    <page-explain :isTop="true"/>
    <logo-row />
    <container>
      <div class="left-box" slot="left">
        <calendar />
      </div>
      <div class="right-box" slot="right">
        <nav-box />
        <bookcase :data="bookData" @event-change="onChangeArticle" />
      </div>
    </container>
    <page-explain
      :data="pageTail"
      :isTail="true"
    />
    <modal :isShow="isModal" @event-change="onChangeModal">
      <iframe id="content" :src="src"
              frameborder="0"
              style="position: absolute;left: 0px;width: 100%;height: 1000px;overflow-y: auto;">

      </iframe>
    </modal>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue from 'vue'
import Component from 'vue-class-component'
import PageExplain from './component/PageExplain.vue'
import LogoRow from './component/LogoRow.vue'
import Container from './component/Container.vue'
import Calendar from './component/Calendar.vue'
import NavBox from './component/NavBox.vue'
import Bookcase from './component/Bookcase.vue'
import Modal from './component/Modal.vue'
// import Axios from 'axios'
// @Component 修饰符注明了此类为一个 Vue 组件

@Component({
  components: {
    PageExplain,
    LogoRow,
    Container,
    Calendar,
    NavBox,
    Bookcase,
    Modal
  }
})
export default class main extends Vue {
  bookData: Object = {
    row1column1: [
      {id: '10001', name: '可编辑', href: 'edit'},
      {id: '10002', name: '重叠框', href: 'border'},
      {id: '10003', name: '蚂蚁线', href: 'ant'},
      {id: '10004', name: '画个圆', href: 'circle'},
      {id: '10005', name: '验证表', href: 'validate'},
      {id: '10006', name: '空链接', href: 'link'},
      {id: '10007', name: '加逗号', href: 'comma'},
      {id: '10008', name: '焦点色', href: 'focus'},
      {id: '10009', name: '波浪线', href: 'wave'},
      {id: '10010', name: '大白', href: 'white'},
      {id: '10011', name: '模糊字', href: 'vague'},
      {id: '10012', name: '单选框', href: 'radio'},
      {id: '10013', name: '复选框', href: 'check'},
      {id: '10014', name: '流光字', href: 'stream'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row1column2: [
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row2column1: [
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row2column2: [
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row3column1: [
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row3column2: [
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'},
      {id: '10000', name: '大世界'}
    ],
    row4column1: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ],
    row4column2: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ],
    row5column1: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ],
    row5column2: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ],
    row6column1: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ],
    row6column2: [
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'},
      {id: '10000', name: '世界'}
    ]
  }
  src: String='http://www.2tro.com/art.aspx'

  // 弹框显示
  isModal:Boolean = false

  // 页尾
  date:Date = new Date();
  pageTail: String = `Retro Mr.${this.date.getFullYear()} 厦门程序猿 - New Piece  版权所有 闽ICP 18019448`

  get getWindowHeight () {
    return window.outerHeight
  }

  onChangeArticle (id: String, name:String, href:String) {
    this.isModal = true
    console.log('文章id==>', id, name, href)
    if (href) {
      this.src = href
    }
  }
  onChangeModal (status:Boolean) {
    this.isModal = status
  }
  beforeCreate () {
    console.log('beforeCreate')
  }
  created () {
    console.log('created')
  }
  beforeMount () {
    console.log('beforeMount')
  }

  mounted () {
    try {
      let div = document.getElementById('content')
      if (div)div.style.height = window.outerHeight + 'px'
    } catch (e) {
      console.log(e)
    }
    // Axios.get('http://localhost:3003/')
    //   .then(res => {
    //     console.log(res)
    //     this.data = res
    //   })
  }
}
</script>

<style scoped>
  .page-box{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .left-box{
    float: left;
    width: 268px;
    height: 820px;
    /*background-color: wheat;*/
  }
  .right-box{
    float: right;
    width: 866px;
    margin-left: 28px;
  }
</style>
