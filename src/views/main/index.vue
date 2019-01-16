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
        <bookcase @event-change="onChangeArticle" />
      </div>
    </container>
    <page-explain
      :data="pageTail"
      :isTail="true"
    />
    <modal :isShow="isModal" @event-change="onChangeModal">
      <!--<iframe src="http://www.2tro.com/art.aspx"-->
              <!--frameborder="0"-->
              <!--style="position: absolute;left: 0px;width: 100%;height: 1000px;overflow-y: auto;">-->

      <!--</iframe>-->
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
import Axios from 'axios'
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
  data: Object = []

  // 弹框显示
  isModal:Boolean = false

  // 页尾
  date:Date = new Date();
  pageTail: String = `Retro Mr.${this.date.getFullYear()} 厦门程序猿 - New Piece  版权所有 闽ICP 18019448`

  onChangeArticle (id: String, name:String) {
    this.isModal = true
    console.log('文章id==>', id, name)
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
    Axios.get('http://localhost:3003/')
      .then(res => {
        console.log(res)
        this.data = res
      })
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
