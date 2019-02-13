<template>
  <ul class="ul-txts">
    <li
      v-for="(item,i) in data"
      :key="i"
      class="li-item"
    >
      <p class="p-title"><a @click="onDetail(type,item.id)">{{item.name}}</a></p>
      <p class="p-info">{{item.time}} by {{item.author}} 阅读 {{item.times}} 次</p>
      <p class="p-abstract">{{item.subName}}</p>
      <p class="p-abstract"><a :href="`/list/${type}/${item.id}`"></a></p>
      <p class="p-desc"><a :href="`/list/${type}/${item.id}`">阅读全文…☇</a></p>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
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
  onDetail (type: String, id: String) {
    this.$emit('onDetail', type, id)
  }
}
</script>
<style lang="less" scoped>
  .ul-txts{
    float: left;
    width: 100%;
    list-style: none;
    text-align: left;
    margin-top: 20px;
    animation: action .5s;
  }
  @keyframes action
  {
    from {opacity: 0; transform: translateX(10px)}
    to {opacity: 1; transform: translateX(0px)}
  }
  .ul-txts .li-item{float: left; width: 100%; margin: 20px 0px 30px 0px;}
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
