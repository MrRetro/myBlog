<template>
  <yi-container :show-loading="showLoading" :hide-btn="true" :show-error="showError" :error-message="errorMessage">
    <cube-scroll>
      <div v-if="data" class="header-contain">
        <yi-image v-if="data.createByAvatar" class="icon" :src="data.createByAvatar"/>
        <span v-else class="img-name">{{ data.createByName }}</span>
        <div class="header-name">询价人：{{data.createByName}}</div>
        <div>{{data.createTime.split(' ')[0]}}</div>
      </div>
      <div class="section-text">询价信息</div>
      <ListBox :form="infoValue"/>
      <div class="section-text">报价信息</div>
      <QuotedRecordTab v-if="data" :onSuccess="onSuccess" type="detail" :all-data="data.quotedRecordDetailsList"/>
    </cube-scroll>
  </yi-container>
</template>

<script>

import QuotedRecordTab from '../../../commons/TabBox/components/QuotedRecordTab';
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';
import ListBox from '../../../views/ListBox';
import {getEnquiryPricesDetail} from '../../../api/common';
import {RouteUtil} from '../../../utils/routeUtil';

export default {
  name: 'OfferDetail',
  extends: Page,
  components: {QuotedRecordTab, ListBox},
  data() {
    const {params} = this.$route;
    return {
      data: null,
      showError: false,
      showLoading: true,
      errorMessage: '',
      params
    };
  },
  computed: {
    infoValue() {
      if (this.showLoading) return [];
      const {
        clueNo, enquiryNo, id, vehicleModel, clueId, appearance, interior,
        clueLevel, guidingPrice, customerType, otherDemand, number, billingTime, estimateObtainTime, billingDemand, shoppingWay, area
      } = this.data;
      return [
        {title: '询价单号', value: enquiryNo, click: () => RouteUtil.commonDetail({id, module: 'enquiryPrices'})},
        {title: '线索编号', value: clueNo, click: () => RouteUtil.commonDetail({id: clueId, module: 'clues'})},
        // {title: '线索编号', value: clueNo},
        {title: '车型信息', value: vehicleModel},
        {title: '外观', value: appearance, type: 'color'},
        {title: '内饰', value: interior, type: 'color'},
        {title: '等级', value: clueLevel && clueLevel.name},
        {title: '指导价', value: guidingPrice * 10000, type: 'money'},
        {title: '购车方式', value: shoppingWay && shoppingWay.name},
        {title: '客户类型', value: customerType && customerType.name},
        {title: '上牌地区', value: area},
        {title: '预计提车时间', value: estimateObtainTime},
        {title: '台数', value: number},
        // {title: '资金成本', value: capitalCost, type: 'money'},
        {title: '开票价要求', value: billingDemand},
        {title: '开票时间要求', value: billingTime},
        {title: '其他需求', value: otherDemand, type: 'html'}
      ];
    }
  },
  methods: {
    fetchData() {
      getEnquiryPricesDetail({
        id: this.params.module === 'quotedRecords' ? this.params.enquiryAndQuotedId : this.params.id,
        module: this.params.module === 'quotedRecords' ? 'clue' : this.params.module
      }).then(res => {
        this.showLoading = false;
        if (this.params.module === 'quotedRecords') {
          res.quotedRecordDetailsList = res.quotedRecordDetailsList.filter(item => item.id === this.params.id);
        }
        this.data = res;
      }).catch(e => {
        this.showLoading = false;
        this.showError = true;
        this.errorMessage = e.message;
      });
    },
    onSuccess() {
      this.params.onSuccess && this.params.onSuccess();
      this.fetchData();
    }
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .header-contain {
    height px2rem(84)
    display flex
    align-items center
    padding 0 px2rem(14)
    text-align left
    color $deepBlack
    font-size px2rem(14)
    regular()
    .icon {
      width px2rem(44)
      height px2rem(44)
      margin-right px2rem(10)
      border-radius 50%
    }
    .header-name {
      flex: 1
      margin-left px2rem(10)
    }
  }

  .section-text {
    height px2rem(30)
    background-color #f3f3f3
    line-height px2rem(30)
    color $deepBlack
    font-size px2rem(13)
    padding-left px2rem(14)
    text-align left
  }

  .info-contain {
    margin px2rem(12) px2rem(14)
    display flex
    .item {
      color $darkBlack
      font-size px2rem(14)
      line-height px2rem(20)
      text-align left
      padding px2rem(8) 0
    }

    .value {
      color $deepBlack
    }
  }

  .img-name {
    text-align center
    width px2rem(44)
    height px2rem(44)
    overflow hidden
    line-height px2rem(44)
    border-radius 50%
    background-color #348EED
    color white
    font-size px2rem(14)
    font-weight bold
    display inline-block
    margin-left 0px !important
  }

  .offer-header {
    margin-top px2rem(20)
    font-size px2rem(16)
    color $deepBlack
    medium()
    text-align left
    margin-left px2rem(14)
    padding-bottom px2rem(6)
    .active {
      color $themeColor
      font-weight bold
    }
  }
</style>
