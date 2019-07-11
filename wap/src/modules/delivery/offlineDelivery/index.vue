<template>
  <yi-container class="more-box" :show-loading="isLoading">
    <cube-scroll>
      <template v-if="info.type === 'section'">
        <div v-for="(item,index) in info.data" :key="index">
          <p v-show="item.data.length !== 0" class="title">{{item.title}}</p>
          <list-box
            :form="item.data"
          />
        </div>
      </template>
      <list-box
        v-else
        :form="info"
      />
    </cube-scroll>
  </yi-container>
</template>

<script>
import ListBox from '../../../views/ListBox';
import {getInfoValue, delayeringValue} from '../../../utils/paramsUtil';
import Page from '../../../components/Mixins/BasePage';

export default {
  components: {
    ListBox
  },
  extends: Page,
  name: 'offlineDelivery',
  props: ['allData'],
  data() {
    return {
      id: this.$route.params.id,
      isLoading: true,
      data: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.data = await new Promise((resolve) => {
        setTimeout(() => resolve({
          totalIncome: '1211',
          carPriceSpread: '3200',
          carPurchasingPrice: '2018-212-211',
          carPrice: '20000',
          insuranceIncome: '1211',
          financialIncome: '1211',
          financialDetail: '1211',
          freightIncome: '1211',
          licensePlateIncome: '1211',
          boutiqueIncome: '1211',
          otherIncome: '1211',
          images: ['http://img4.imgtn.bdimg.com/it/u=1502109304,835943868&fm=15&gp=0.jpg',
            'http://img4.imgtn.bdimg.com/it/u=1502109304,835943868&fm=15&gp=0.jpg']
        }), 1000);
      });
      this.isLoading = false;
    },
    getValue(key, type = 'price') {
      return getInfoValue({data: this.defaultData, key, type});
    }
  },
  computed: {
    defaultData() {
      // return delayeringValue(this.allData);
      return delayeringValue(this.data);
    },
    info() {
      let list1 = [
        {title: '线下交车时间', key: 'freightIncome'},
        {title: '车牌号', key: 'licensePlateIncome'}];
      let list2 = [
        {title: '交车车辆手续', key: 'images', type: 'images'},
        {title: '交车图片', key: 'images', type: 'images'},
        {title: '客户收款确认书', key: 'images', type: 'images'}];
      return {
        type: 'section',
        data: [{
          title: '车辆详情',
          data: list1.map(t => ({
            ...t,
            value: getInfoValue({...t, data: this.defaultData})
          }))
        }, {
          title: '附件信息',
          data: list2.map(t => ({
            ...t,
            value: getInfoValue({...t, data: this.defaultData})
          }))
        }]
      };

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .more-box {
    display flex
    flex 1
    flex-direction column
    overflow-y auto
    position absolute
    left 0
    top 0
    width 100%
    height 100%
  }

  .title {
    text-align left
    font-size px2rem(16)
    color $deepBlack
    padding-left px2rem(14)
    margin-top px2rem(28)
    line-height px2rem(20)
    semibold()
  }

  .bord {
    display flex
    width 100%
    height px2rem(10)
    background-color #f3f3f3
    margin-top px2rem(24)
    margin-bottom px2rem(20)
  }
</style>
