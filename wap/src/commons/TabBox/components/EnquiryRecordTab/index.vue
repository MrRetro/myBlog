<template>
  <div class="contain">
    <!--<div class="info-contain">-->
    <list-box :show-more="true" :more-index="moreIndex" more-text="询价信息" :form="orderInfo"/>
    <!--<div>-->
    <!--<div v-for="(item,index) in orderInfo" :key="index" class="item">{{item.title}}：</div>-->
    <!--</div>-->
    <!--<div>-->
    <!--<div v-for="(item,index) in orderInfo" :key="index" class="item value">{{item.value || '无'}}</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import CommonTab from '../CommonTab';
import MoreImages from '../../../MoreImages';
import ListBox from '../../../../views/ListBox';


export default {
  components: {
    CommonTab,
    MoreImages,
    ListBox
  },
  name: 'EnquiryRecordTab',
  props: ['allData'],
  computed: {
    orderInfo() {
      const {
        clueNo, vehicleModel, area, shoppingWay, customerType, createByName, appearance, interior, clueId, storeName, clueLevel,
        clueStatus, estimateObtainTime, billingDemand, billingTime, otherDemand, guidingPrice, number
      } = this.allData;
      return [
        {
          title: '线索编号',
          value: clueNo,
          click: () => {
            this.$RouteUtil.commonDetail({id: clueId, module: 'clues', type: 'all'});
          }
        },
        // {
        //   title: '线索编号',
        //   value: clueNo
        // },
        {title: '线索状态', value: clueStatus && clueStatus.name},
        {title: '线索等级', value: clueLevel && clueLevel.name},
        {title: '询价人', value: createByName},
        {title: '负责门店', value: storeName},
        {title: '车型', value: vehicleModel},
        {title: '外观', value: appearance, type: 'color'},
        {title: '内饰', value: interior, type: 'color'},
        {title: '指导价', value: guidingPrice ? parseFloat(guidingPrice) * 10000 : '', type: 'money'},
        {title: '购车方式', value: shoppingWay && shoppingWay.name},
        {title: '客户类型', value: customerType && customerType.name},
        {title: '上牌地', value: area},
        {title: '预计提车时间', value: estimateObtainTime},
        {title: '台数', value: number},
        // {title: '资金成本', value: capitalCost, type: 'money'},
        {title: '开票价要求', value: billingDemand},
        {title: '开票时间要求', value: billingTime},
        {title: '其他需求', value: otherDemand, type: 'html'}
      ];
    },
    moreIndex() {
      return this.orderInfo.findIndex(item => item.title === '预计提车时间');
    }
  },
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type
    };
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain {
    margin-top px2rem(4)
  }

  .section-title {
    medium()
    margin-left px2rem(14)
    color $deepBlack
    font-size px2rem(16)
    padding-top px2rem(16)
    margin-bottom px2rem(6)
    line-height px2rem(22)
    text-align left
  }

  .accessory {
    margin-bottom px2rem(16)
  }

  .info-contain {
    margin 0 px2rem(14)
    display flex
    .item {
      color $darkBlack
      font-size px2rem(14)
      line-height px2rem(20)
      text-align left
      margin px2rem(8) 0
    }

    .value {
      color $deepBlack
    }
  }

</style>
