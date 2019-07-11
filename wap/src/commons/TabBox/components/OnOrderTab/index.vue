<template>
  <common-tab :data="data">
    <div slot="item" slot-scope="{item,index}">
      <div class="contain" :class="{'deactive-color':item.deactive}">
        <div v-if="item.data.sure" >【{{item.data.status}}】</div>
        <div>{{item.data.title}}：</div>
        <div>{{item.data.value}}</div>
      </div>
    </div>
  </common-tab>
</template>

<script>
import CommonTab from '../CommonTab';

export default {
  components: {
    CommonTab
  },
  name: 'OnOrderTab',
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      data: [
        {
          date: '2018-5-20  14:30',
          data: {
            status: '确认入库',
            sure: true,
            title: '仓库',
            value: '厦门嘉兴车行'
          }
        },
        {
          date: '2018-5-20  14:30',
          deactive: true,
          data: {
            status: '确认到店',
            sure: true,
            title: '到达城市',
            value: '厦门'
          }
        },
        {
          date: '2018-5-20  14:30',
          deactive: true,
          data: {
            status: '确认到店',
            sure: false,
            title: '到达城市',
            value: '泉州'
          }
        },
        {
          date: '2018-5-20  14:30',
          deactive: true,
          data: {
            status: '物流提车',
            sure: true,
            title: '到达城市',
            value: '福州'
          }
        }
      ]
    };
  },
  methods: {
    // 查看详情
    onGetDetail() {
      console.log('查看详情');
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain{
    display flex
    font-size px2rem(14)
    color $deepBlack
    medium()
  }

  .deactive-color{
    color $darkBlack !important
  }
</style>
