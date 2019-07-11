<template>
  <div class="tab-box">
    <yi-tab-bar :titles="titles" @onTabChange="onTabChange"/>
    <div v-for="(name, index) of tabs" :key="index">
      <component v-show="index === tabIndex" :ref="name" :is="name" :allData="allData"/>
    </div>
  </div>
</template>

<script>
import {Tabs} from 'mand-mobile';
import CommonTab from './components/CommonTab';
import FollowUpTab from './components/FollowUpTab';
import OfferTab from './components/OfferTab';
import ChangeTab from './components/ChangeTab';
import OrderTab from './components/OrderTab';
import OnOrderTab from './components/OnOrderTab';
import FileCaseTab from './components/FileCaseTab';
import EnquiryRecordTab from './components/EnquiryRecordTab';
import QuotedRecordTab from './components/QuotedRecordTab';
import DeliveryCarTab from './components/DeliveryCarTab';

export default {
  name: 'tab-box',
  components: {
    [Tabs.name]: Tabs,
    CommonTab,
    FollowUpTab,
    OfferTab,
    ChangeTab,
    OrderTab,
    OnOrderTab,
    FileCaseTab,
    EnquiryRecordTab,
    QuotedRecordTab,
    DeliveryCarTab
  },
  props: ['tabConfig', 'allData'],
  data() {
    return {
      tabIndex: 0
    };
  },
  computed: {
    tabs() {
      return this.tabConfig.map(item => item.tab);
    },
    titles() {
      return this.tabConfig.map(item => item.title);
    }
  },
  methods: {
    onTabChange(index) {
      // this.$refs.tab.selectTab(index);
      this.tabIndex = index;
    },
    fetchData(tabName) {
      console.log('传递到TabBox', this.$refs, tabName);
      this.$refs[tabName][0] && this.$refs[tabName][0].fetchData && this.$refs[tabName][0].fetchData();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .tab-box {
    border-top px2rem(10) solid #f3f3f3
    display flex
    flex-direction column

    & >>> .md-tab-bar {
      height 0
      overflow hidden
      font-size px2rem(14)
    }
    .ul-over {
      position relative
      width: 100%;
      transition: opacity 0.2s linear;
      margin-top px2rem(20)

      .li-over {
        list-style: none;
        text-align: left;
        margin: 0px 10px;
        margin-right: 4px;
        margin-left px2rem(15)
        padding-left: 10px;
        border-left: 1px dashed #eee;
        font-size: 14px;
        float: left;
        padding-bottom: 10px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          top: 0px;
          left: -4.5px;
          width: 4px;
          height: 4px;
          background-color: white;
          border: 10px solid #dedfdc;
          border-radius: 50%;
        }
        &.active {
          border-left-style: solid;
        }
        &.active:before {
          border-color: #1990ff;
          border-width: 2px;
        }
        .p-words {
          font-size px2rem(14)
          color $deepBlack
          float: left;
          width: 100%;
          line-height px2rem(20)
          position: relative;
          margin-bottom px2rem(10)

          .name {
            color: rgba(0, 0, 0, 0.447058823529412);

            &.name2 {
              font-size px2rem(16)
              color $deepBlack
            }
          }
          .value {
            color: rgba(0, 0, 0, 0.647058823529412);

            &.date {
              float right
              margin-right px2rem(15)
              color $deepGray
            }
          }
        }
      }
    }
  }
</style>
