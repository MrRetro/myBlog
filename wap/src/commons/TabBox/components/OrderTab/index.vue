<template>
  <div class="contain">
    <div v-for="(item,index) in orderInfo" :key="index" v-if="!item.hide">
      <div class="section-title">{{item.title}}</div>
      <div v-if="item.type === 'images'">
        <MoreImages v-for="(t,i) in item.data" :key="i"
                    :all-data="item.data"
                    :title="t.title" :images="t.images"/>
      </div>
      <list-box v-else :form="item.data"/>
    </div>
    <yi-touch class="more-bottom" @click="show = !show">{{text}}
      <yi-image class="arrow-img" :style="{transform:`rotate(${!show ?  180 : 0}deg)`}"
                :src="$images.all.arrows_up"></yi-image>
    </yi-touch>
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
  name: 'OrderTab',
  props: ['allData'],
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      show: false
    };
  },
  computed: {
    text() {
      return this.show ? '收起合同信息' : '展开合同信息';
    },
    orderInfo() {
      const {
        carName, orderCustomerType, appearance, name, mobile, gender, carPrice, deposit, totalAmount,
        amount, interior, insuranceCompany, additionalExpense, purchaseTaxType, licensePlateExpense,
        warrantyPrice, financialServiceFee, freight, otherExpense, additionalProvisions, idNumber, balance, paymentWay,
        shoppingWay, accountTitle, account, openingBank, deliveryPlaceType, deliveryPlace, ambassadorn, orderType,
        orderSource, responsibleName, groundStoreDTO, storeAddress, areaName, insuranceExpensesType
      } = this.allData;
      let list = [{
        title: '客户信息',
        data: [
          {title: '客户类型', value: orderCustomerType && orderCustomerType.name},
          {title: '姓名', value: name},
          {title: '电话', value: mobile},
          {title: '性别', value: gender && gender.name},
          {title: '身份证', value: idNumber}
        ]
      }, {
        title: '购车信息',
        data: [
          {title: '车型信息', value: carName},
          {title: '订购数量', value: amount},
          {title: '外观', value: appearance, type: 'color'},
          {title: '内饰', value: interior, type: 'color'},
          {title: '指导价', value: carPrice, type: 'money'}
        ]
      }];
      if (this.show) {
        list.push(...[{
          title: '业务信息',
          data: [
            {title: '业务类型', value: orderType && orderType.name},
            {title: '订单来源', value: orderSource && orderSource.name},
            {title: '负责人', value: responsibleName},
            {title: '乙方服务网点', value: groundStoreDTO && groundStoreDTO.storeName},
            {title: '网点地址', value: storeAddress},
            {title: '所属区域', value: areaName}
          ]
        }, {
          title: '价款与数量',
          data: [
            {title: '车身售价', value: carPrice, type: 'money'},
            {title: '保险费用', value: insuranceExpensesType && insuranceExpensesType.name},
            {title: '保险公司', value: insuranceCompany},
            {title: '附加费用', value: additionalExpense, type: 'money'},
            {title: '新车购置税', value: purchaseTaxType && purchaseTaxType.name},
            {title: '上牌服务费', value: licensePlateExpense, type: 'money'},
            {title: '质保价格', value: warrantyPrice, type: 'money'},
            {title: '金融服务费', value: financialServiceFee, type: 'money'},
            {title: '运费', value: freight, type: 'money'},
            {title: '其他费用', value: otherExpense, type: 'money'},
            {title: '附加条款', value: additionalProvisions}
          ]
        }, {
          title: '合同信息',
          data: [
            {title: '合同应收款', value: totalAmount, type: 'money'},
            {title: '客户定金收取', value: deposit, type: 'money'},
            {title: '余款', value: balance, type: 'money'},
            {title: '付款方式', value: paymentWay && paymentWay.name},
            {title: '购车方式', value: shoppingWay && shoppingWay.name},
            {title: '账户名称', value: accountTitle},
            {title: '账户', value: account},
            {title: '开户行', value: openingBank}
          ]
        }, {
          title: '附件信息',
          type: 'images',
          hide: this.allData.orderFileCabinetList.filter(item => item.images.length !== 0).length === 0,
          data: this.allData.orderFileCabinetList
        }, {
          title: '交付信息',
          data: [
            {title: '交车地点类型', value: deliveryPlaceType && deliveryPlaceType.name},
            {title: '交车点', value: deliveryPlace},
            {title: '授权代表', value: ambassadorn && ambassadorn.name}
          ]
        }]);
      }
      return list;

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain {
    margin-top px2rem(4)
  }

  .more-bottom {
    color $themeColor
    font-size px2rem(14)
    height px2rem(60)
    line-height px2rem(60)
    text-align center
    display flex
    align-items center
    justify-content center
  }

  .arrow-img {
    width px2rem(10)
    height px2rem(6)
    margin-left px2rem(2)
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
