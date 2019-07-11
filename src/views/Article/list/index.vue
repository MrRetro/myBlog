<template>
  <ul class="ul-txts" id="list">
    <li
      v-for="(item,i) in newData"
      :key="i"
      class="li-item"
    >
      <div class="item-left">
      <p class="p-title"><a @click="onDetail(type,item.id)">{{item.name}}</a></p>
      <p class="p-info">{{item.time}} by {{item.author}} 阅读 {{item.times}} 次</p>
      <p class="p-abstract">{{item.subName}}</p>
      <p class="p-abstract"><a  @click="onDetail(type,item.id)"></a></p>
      <p class="p-desc"><a @click="onDetail(type,item.id)">阅读全文…☇</a></p>
      </div>
      <p class="item-right" v-show="isShowBtn">
        <el-button type="primary" @click="aGo(item.id)">编辑</el-button>
        <el-button type="primary" plain @click="aGo()">新建</el-button>
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import Component from 'vue-class-component'
import { Loading } from 'element-ui'
import * as ArticleServer from '../../../api/article'
@Component({
  props: {
    type: { type: String, default: 'front' },
    data: {
      type: Array,
      default: () => [
        {
          id: 10001,
          name: '两个变量的值如何快速交换~假设要交换的值都为数字',
          time: '2018-02-26 10:38',
          author: 'retro',
          times: 55,
          subName: '在js中我们经常要互相交换两个变量的值，有多种方法可以实现。'
        }
      ]
    }
  }
})
export default class List extends Vue {
  // 是否可编辑
  isShowBtn: Boolean = false
  newData: Object = []
  async created () {
    try {
      this.isShowBtn = this.$route.params.user === 'user'
      let data = await ArticleServer.getArticle()
      data = data.map(item => {
        return {
          id: item.ArticleID,
          name: item.ArticleName,
          time: moment(item.AddDate).format('YYYY-MM-DD HH:mm:ss'),
          author: 'retro',
          times: item.ViewCount,
          subName: item.ArticleDesc
        }
      })
      console.log('列表数据==>', data)
      this.newData = data
    } catch (e) {
      console.log('获取列表数据失败==>', e)
    }
  }
  async onDetail (type: String, id: String) {
    await ArticleServer.editArticleUp({ArticleID: id})
    this.$emit('onDetail', type, id)
  }
  aGo (id:string) {
    if (id) {
      // this.$router.push({name: 'LogFormById', params: {id}})
      window.location.href = `/log/form/${id}`
    } else {
      // this.$router.push({name: 'LogForm'})
      window.location.href = `/log/form`
    }
  }
  async setList (typeID:String) {
    let div:any = document.getElementById('list')
    let loadingInstance = Loading.service({
      target: div,
      fullscreen: true
    })
    console.log('typeID==>', typeID)
    let data = await ArticleServer.getArticle({typeID})
    data = data.map(item => {
      return {
        id: item.ArticleID,
        name: item.ArticleName,
        time: moment(item.AddDate).format('YYYY-MM-DD HH:mm:ss'),
        author: 'retro',
        times: item.ViewCount,
        subName: item.ArticleDesc
      }
    })
    if (data && data.length > 1) {
      data.sort((a, b) => b.id - a.id)
    }
    console.log('列表数据==>', data)
    this.newData = data
    this.$nextTick(() => {
      loadingInstance.close()
    })
  }
}
</script>
<style lang="less" scoped>
  .ul-txts{
    float: left;
    width: 100%;
    list-style: none;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 60px;
    animation: action .5s;
  }
  @keyframes action
  {
    from {opacity: 0; transform: translateX(10px)}
    to {opacity: 1; transform: translateX(0px)}
  }
  .ul-txts .li-item{display: flex;flex-direction: row; margin: 8px 0px 10px;}
  .ul-txts .li-item .item-left{display: flex;flex: 1;flex-direction: column;}
  .ul-txts .li-item .item-right{display: flex;flex-direction: row;margin: 40px 0px;}
  .ul-txts .li-item.active{background-color: #f7f7f8; padding: 20px; width: 1126px;}
  .ul-txts .li-item .p-title > a{font-size: 24px; color: #34538b;text-decoration: none;}
  .ul-txts .li-item .p-title > a:hover{color: #527ED1;cursor: pointer;}
  .ul-txts .li-item .p-info{font-size: 12px; color: #707070; margin: 8px 0px 014px 0px;}
  .ul-txts .li-item .p-abstract{font-size: 16px; color: #3b3b3b; line-height: 28px;}
  .ul-txts .li-item .p-desc{margin: 8px 0px;}
  .ul-txts .li-item .p-desc > a{font-size: 16px; color: #28457b;text-decoration: none;}
  .ul-txts .li-item .p-desc > a:hover{border-bottom: 1px solid #28457b;}
  .ul-txts .li-item .p-label{font-size: 14px; color: #777777; line-height: 24px;}
  .ul-txts .li-item .p-label > a{color: #28457b;text-decoration: none;}
  .ul-txts .li-item .p-label > a:hover{border-bottom: 1px solid #28457b;}

</style>
