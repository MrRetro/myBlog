<template>
  <div>
    <common-tab empty-text="暂无报价记录" :empty-icon="$images.base.img_record" :data="listData">
      <div slot="item" slot-scope="{item,index}">
        <div class="cell-title">{{ item.carName }}</div>
        <div class="cell-contain">
          <template v-if="item.data.length !== 0">
            <yi-touch
              :disabled="!edit" v-for="(t,i) in item.data" :key="i"
              @click="handleContentClick(index,i)"
              class="record-contain"
            >
              <div class="title">报价内容-{{i+1}}
                <div v-if="showAccept(item.quotedPriceMsgList[i].status)" class="tag">已采纳</div>
                <yi-image class="img-check"  v-else-if="edit"
                          :src="isSelected(index,i) ?  $images.base.ic_check_selected:$images.base.ic_check_normal"/>
              </div>
              <list-box :hide-margin-left="true" :form="t" more-text="报价详情" :more-index="4"
                        :show-more="true"></list-box>
            </yi-touch>
          </template>
          <div v-else class="record-contain">
            <div class="record-top">
              <div class="small-circle"></div>
              <div class="name text">暂无报价</div>
            </div>
          </div>
        </div>
      </div>
    </common-tab>
    <div v-if="isEditEnabled" style="display: flex;width: 100%;">
      <yi-btn-box v-if="showCancelButton" class="btn cancel" name="取消报价"
                  @onBtnClick="handleCancelClick"/>
      <yi-btn-box v-if="showOfferButton" :disabled="btnDisabled" :class="{btn:true,'btn-disabled':btnDisabled}"
                  name="采纳报价"
                  @onBtnClick="handleOfferClick"/>
    </div>
  </div>
</template>

<script>
import CommonTab from '../CommonTab';
import ListBox from '../../../../views/ListBox/index';
import {acceptEnquiryPrice, getQuotedRecords} from '../../../../api/common';

export default {
  components: {
    CommonTab,
    ListBox
  },
  name: 'QuotedRecordTab',
  props: {
    allData: [Object, Array],
    onSuccess: Function,
    type: {
      type: String,
      default: 'tab'
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      module: this.$route.params.module,
      data: [],
      edit: false,
      selectedContent: [-1, -1]
    };
  },
  mounted() {
    if (this.type === 'tab') {
      this.fetchData();
    }
  },
  computed: {
    showCancelButton() {
      return this.listData.length !== 0 && this.edit;
    },
    showOfferButton() {
      let number = 0;
      this.listData.forEach(item=> number += item.data.length);
      return number > 0;
    },
    btnDisabled() {
      return this.edit && this.selectedContent[0] === -1;
    },
    isEditEnabled() {
      return this.listData.findIndex(item=>item.status.code === 1) === -1 && this.module !== 'quotedPrices' && this.module !== 'quotedRecords';
    },
    listData() {
      let data = [];
      if (this.type === 'tab') {
        data = this.data;
      } else {
        data = this.allData;
      }
      return data.map(item => ({
        title: `报价人：${item.createByName}`,
        date: item.createTime,
        data: item.quotedPriceMsgList.map(t => {
          const {
            resourceLocation, insuranceType, capitalCost, deliveryTime, invoiceType, procedureTracks, productionTime,
            quotedPrice, invoicePrice, resourceArea, remarks, trafficPrice, carSourceType
          } = t;
          return [
            {title: '车源所在地', value: resourceLocation && resourceLocation.name},
            {title: '车辆报价', value: quotedPrice, type: 'money'},
            {title: '物流成本', value: trafficPrice, type: 'money'},
            {title: '资金成本', value: capitalCost, type: 'money'},
            {title: '手续时间', value: `${procedureTracks}个工作日`},
            {title: '开票金额', value: invoicePrice, type: 'money'},
            {title: '车源位置', value: resourceArea},
            {title: '车源类型', value: carSourceType && carSourceType.name},
            {title: '生产日期', value: productionTime},
            {title: '提车时间', value: deliveryTime ? `${deliveryTime}天` : ''},
            {title: '保险要求', value: insuranceType && insuranceType.name},
            {title: '发票类型', value: invoiceType && invoiceType.name},
            {title: '其他备注', value: remarks}
          ];
        }),
        ...item
      }));
    }
  },
  methods: {
    async fetchData() {
      try {
        this.data = await getQuotedRecords(this.id);
      } catch (e) {
        this.data = [];
      }
    },
    async handleOfferClick() {
      if (!this.edit) {
        this.edit = true;
      } else {
        await acceptEnquiryPrice({
          enquiryId: this.id,
          quotedMsgId: this.listData[this.selectedContent[0]].quotedPriceMsgList[this.selectedContent[1]].id
        });
        this.fetchData();
        this.allData.fetchData && this.allData.fetchData();
        this.onSuccess && this.onSuccess();
      }
    },
    handleCancelClick() {
      this.edit = false;
    },
    // 查看详情
    onGetDetail(item) {
      this.$RouteUtil.offerDetail(item);
    },
    showAccept(status) {
      return status.code === 1;
    },
    handleContentClick(section, index) {
      if (this.isSelected(section, index)) {
        this.selectedContent = [-1, -1];
      } else {
        this.selectedContent = [section, index];
      }
    },
    isSelected(section, index) {
      return JSON.stringify(this.selectedContent) === JSON.stringify([section, index]);
    }
  }
};


</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .cell-title {
    font-size px2rem(14)
    color $darkBlack
  }
  .tag {
    height px2rem(20)
    background-color $orange
    padding 0 px2rem(4)
    font-size px2rem(12)
    line-height px2rem(20)
    color white
    border-radius px2rem(4)
    margin-right px2rem(14)
    regular()
  }

  .cell-contain {

    .record-contain {
      .record-top {
        display flex
        align-items center
        color $deepBlack
        line-height px2rem(20)
        font-size px2rem(14)
        regular()
        .name {
          margin-left px2rem(8)
          flex 1
        }
        .money {
          color $orange
        }
      }
      .title {
        color $deepBlack
        font-size px2rem(14)
        display flex
        align-items center
        justify-content space-between
        line-height px2rem(20)
        medium()
      }
      .img-check {
        width px2rem(18)
        height px2rem(18)
        margin-right px2rem(15)
      }
    }
    .btn-selected{
      background-color #eee
    }
  }

  .btn {
    flex 1
    &.cancel {
      background-color #f4faff !important
    }
  }

  .cancel >>> .p-name {
    color $themeColor !important
  }

  .btn-disabled {
    background-color #CBCBCB !important
  }

  .record-bottom {
    display flex
    regular()
    line-height px2rem(20)
    color $darkBlack
    font-size pxx2rem(14)
    justify-content space-between
    margin-top px2rem(10)
    margin-bottom px2rem(10)
    padding-right px2rem(12)

    .detail {
      color $themeColor
    }
    .btn-right {
      width px2rem(10)
    }
  }

  .small-circle {
    width px2rem(6)
    height px2rem(6)
    border-radius px2rem(3)
    background-color $orange
  }
</style>
