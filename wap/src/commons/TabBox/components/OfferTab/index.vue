<template>
  <common-tab empty-text="暂无报价记录" :empty-icon="$images.base.img_record" :data="data">
    <div slot="item" slot-scope="{item,index}">
      <div class="cell-title">{{ item.carName }}</div>
      <div class="cell-contain">
        <template v-if="item.data.length !== 0">
          <div v-for="(t,index) in item.data" :key="index" class="record-contain">
            <div class="record-top">
              <div class="small-circle"></div>
              <div class="name text">报价人：{{t.createByName}}</div>
            </div>
            <div v-for="(t1,ind) in t.quotedMsgSimpleList" :key="ind" class="record-middle">
              <div class="name text">车源位置：{{t1.resourceLocation.name}}</div>
              <div class="text">报价结果：<span class="money">￥{{changePrice(t1.quotedPrice)}}</span></div>
            </div>
            <div class="time">报价时间：{{t.createTime}}</div>
          </div>
        </template>
        <div v-else class="record-contain">
          <div class="record-top">
            <div class="small-circle"></div>
            <div class="name text">暂无报价</div>
          </div>
        </div>
      </div>
      <div class="record-bottom">
        <yi-touch class="detail touch-opacity" @click="onGetDetail(item)">查看详情
          <!--<img class="btn-right" :src="$images.base.ic_next_blue"/>-->
        </yi-touch>
        <span v-if="item.status.code === 4" class="tag">已采纳</span>
        <yi-touch v-else-if="enabled && item.status.code === 1" @click="onGetDetail(item)" class="btn">开始采纳</yi-touch>
      </div>
    </div>
  </common-tab>
</template>

<script>
import Numeral from 'numeral';
import CommonTab from '../CommonTab';
import {getEnquiryPrices} from '../../../../api/common';

export default {
  components: {
    CommonTab
  },
  props: ['allData'],
  name: 'OfferTab',
  data() {
    return {
      module: this.$route.params.module,
      id: this.$route.params.id,
      type: this.$route.params.type,
      data: []
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    enabled() {
      return this.data.findIndex(item=>item.status.code === 4) === -1;
    }
  },
  methods: {
    async fetchData() {
      switch (this.module) {
        case 'customers':
          this.module = 'customer';
          break;
        case 'clues':
          this.module = 'clue';
          break;
        case 'agents':
          this.module = 'agent';
          break;
        default:
          break;
      }
      try {
        const res = await getEnquiryPrices({id: this.id, type: this.module});
        this.data = res.map(item => ({
          title: `询价人：${item.createByName}`,
          date: item.createTime,
          data: item.quotedRecordSimpleList,
          ...item
        }));
      } catch (e) {
        this.data = [];
      }
    },
    // 查看详情
    onGetDetail(item) {
      this.$RouteUtil.offerDetail({
        ...item,
        module: this.module,
        onSuccess: () => {
          this.fetchData();
          this.allData.fetchData();
        }
      });
    },
    changePrice(price) {
      return Numeral(price).format('0,0.00');
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
    regular()
  }

  .cell-contain {
    margin-top px2rem(12)
    border-top-color $lightGray
    border-top-width 1px
    border-top-style double
    border-bottom-color $lightGray
    border-bottom-style double
    border-bottom-width 1px
    padding-top px2rem(2)
    padding-bottom px2rem(2)

    .record-contain {
      padding-top px2rem(8)
      padding-right px2rem(12)
      padding-bottom px2rem(8)
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
      }
      .record-middle {
        display flex
        align-items center
        color $deepBlack
        line-height px2rem(20)
        font-size px2rem(14)
        margin-top px2rem(8)
        regular()
        .name {
          margin-left px2rem(14)
          flex 1
        }
        .money {
          color $orange
        }
      }
      .time {
        margin-left px2rem(14)
        color $darkBlack
        font-size px2rem(12)
        line-height px2rem(17)
        margin-top px2rem(4)
      }
    }
  }

  .record-bottom {
    display flex
    regular()
    line-height px2rem(20)
    color $darkBlack
    font-size pxx2rem(14)
    justify-content space-between
    align-items center
    margin-top px2rem(10)
    margin-bottom px2rem(10)
    padding-right px2rem(12)

    .detail {
      color $themeColor
    }
    .btn-right {
      width px2rem(10)
    }
    .btn {
      width px2rem(96)
      height px2rem(30)
      border-radius px2rem(4)
      background-color $themeColor
      color white
      font-size px2rem(14)
      text-align center
      line-height px2rem(30)
    }
  }

  .small-circle {
    width px2rem(6)
    height px2rem(6)
    border-radius px2rem(3)
    background-color $orange
  }
</style>
