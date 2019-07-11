<template>
  <div class="tb-box" v-if="form.body">
    <div v-if="form.title" class="title">{{ form.title }}</div>
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in form.head" :key="index">
            <span>{{ item.name }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <yi-touch component-name="tr" type="highLight" v-for="(item1, index) in form.body" :key="'i'+index" @click="onSelectById(item1.id)">
          <td v-for="(item2, index) in item1.tr" :key="'ii'+index">
            {{ item2.value }}
          </td>
        </yi-touch>
      </tbody>
    </table>
  </div>
  <div v-else class="tb-none">
    <img :src="$images.base.img_plan" alt="">
    <p class="word">本日暂无跟进计划</p>
  </div>
</template>

<script>
export default {
  name: 'data-table',
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    // 根据id回调
    onSelectById(id) {
      this.$emit('onSelectById', id);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.tb-box{
  display flex
  flex-direction column
  flex 1
  padding px2rem(20) px2rem(15)

  .title{
    display flex
    flex-direction row
    justify-content flex-start
    font-size px2rem(14)
    color $deepBlack
    font-weight bold
    margin-bottom px2rem(12)
    position relative
    padding-left px2rem(6)

    &:before{
      content ''
      position absolute
      left 0
      top 0
      width px2rem(2)
      height 100%
      background-color #348EED
    }
  }
  table{
    width 100%
  }
  th{
    height px2rem(40)
    line-height px2rem(40)
    font-size px2rem(14)
    text-align center
    color #727272
    background-color #F3F9FF
    border 1px solid #f2f2f2
  }
  td{
    height px2rem(40)
    line-height px2rem(40)
    font-size px2rem(14)
    text-align center
    color #31363B
    border 1px solid #f2f2f2
  }
}
  .tb-none{
    display flex
    flex-direction column
    flex 1
    justify-content center
    align-items center
    padding px2rem(80) px2rem(0)

    img{
      width px2rem(78)
    }
    .word{
      font-size px2rem(12)
      color $deepGray
      margin-top px2rem(10)
    }
  }
</style>
