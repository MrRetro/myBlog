<template>
  <div class="detail-box">
    <div class="detail-box2" :class="{'bottom-margin':showButton}">
      <p v-show="hintShowText" class="p-warn">{{hintShowText}}</p>
      <cube-scroll>
        <name-box
          v-bind="nameData"
          :module="module"
          @focusClick="$emit('focusClick')"
        />
        <info-box
          :module="module"
          :data="infoData"
          @onMore="onMore"
        />
        <person-box
          :form="personData"
          :edit="personData.edit"
          :module="module"
          :type="type"
          v-if="showPersonBox"
          @onChangeMan="$emit('onChangeMan')"
          @onChangeSaleMan="$emit('onChangeSaleMan')"
          @onAddMan="$emit('onAddMan')"
          @onDelManById="onDelManById"
        />
        <!--<div class="tab-contain" v-if="module === 'order'">-->
        <!--<detail-order-tab-bar @onItemClick="onItemClick"/>-->
        <!--</div>-->
        <next-box v-if="showNextBox" :listRowData="listRowData"/>
        <tab-box
          v-if="module !== ''"
          ref="tabs"
          :tabConfig="tabConfig"
          :allData="allData"
        />
      </cube-scroll>
    </div>

    <btn-box
      v-show="showButton"
      :buttons="showButtons"
    />

    <transition name="fade">
      <div class="tab-pop" v-show="orderTabPopVisible && module === 'order'" @click="orderTabPopVisible = false">
        <div class="pop-content box-shadow">
          <detail-order-tab-bar :is-more="true" @onItemClick="onItemClick"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NameBox from './NameBox/index';
import InfoBox from './InfoBox/index';
import PersonBox from '../../commons/PersonBox/index';
import NextBox from './NextBox/index';
import DetailOrderTabBar from './DetailOrderTabBar';
import TabBox from '../../commons/TabBox/index';
import BtnBox from './BtnBox/index';
import CommonTab from '../../commons/TabBox/components/CommonTab';

export default {
  name: 'Detail',
  components: {
    NameBox,
    InfoBox,
    PersonBox,
    NextBox,
    TabBox,
    BtnBox,
    DetailOrderTabBar,
    CommonTab
  },
  props: {
    allData: Object,
    tabConfig: Array,
    hintShowText: String,
    bottomButtons: {
      type: Array
    },
    listRowData: Array,
    nameData: {
      type: Object,
      default: () => {
        return {
          name: '黄秋葵',
          remark: '黄小姐',
          focus: false
        };
      }
    },
    infoData: Array,
    personData: {
      type: Object,
      default: () => {
        return {
          name: '负责人',
          master: {id: 1, ico: '', name: '李雷'},
          isDel: false,
          edit: true,
          subname: '协同人',
          pater: [
            {id: 2, ico: '', name: '赵磊'},
            {id: 3, ico: '', name: '黄丽丽'}
          ]
        };
      }
    },
    type:{type:String}
  },
  data() {
    return {
      visible: false,
      orderTabPopVisible: false,
      module: this.$route.params.module,
      id: this.$route.params.id
    };
  },
  computed: {
    showButton() {
      return this.showButtons.length !== 0;
    },
    showButtons() {
      // 用户权限列表读取成功过滤掉没有权限的按钮
      if (JSON.stringify(this.$store.state.user.userAuths) === '{}') {
        return this.bottomButtons;
      }
      let filter = (item) => {
        return !(item.auth && !this.$store.state.user.userAuths[item.auth]);
      };
      return this.bottomButtons.filter(filter);
    },
    showNextBox() {
      return this.module !== 'order' && this.module !== 'followUpPlans' && this.module !== 'enquiryPrices' && this.module !== 'quotedPrices';
    },
    showPersonBox() {
      return this.module !== 'enquiryPrices' && this.module !== 'quotedPrices';
    }
  },
  methods: {
    // 更多资料
    onMore() {
      this.$emit('onMore');
    },
    // 跟进跳转
    onFollowClick() {
      this.$emit('onFollowClick');
    },
    // 询价跳转
    onInquiryClick() {
      this.$emit('onInquiryClick');
    },
    onItemClick(item) {
      switch (item.tag) {
        case 'more':
          this.orderTabPopVisible = true;
          break;
        default:
          this.$RouteUtil.orderTabList({id: this.id, item: {...item, type: item.tag}});
          break;
      }
    },
    tabFetchData(tabName) {
      console.log('传递到Detail', tabName);
      this.$refs.tabs.fetchData(tabName);
    },
    onDelManById(id) {
      this.$emit('onDelManById', id);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .detail-box {
    position: absolute
    display flex
    flex 1
    height 100%
    width 100%

    .detail-box2 {
      display flex
      flex 1
      width 100%
      height 100%
      flex-direction column
      overflow-y auto
      overflow-x hidden
    }
    .bottom-margin {
      height calc(100% - 50px)
      padding-bottom 50px
    }
    .p-warn {
      font-size px2rem(14)
      color #348EED
      background-color #F3F9FF
      height px2rem(34)
      line-height px2rem(34)
      text-align center
      width 100%
    }
    .car-model {
      font-size px2rem(18)
      color $deepBlack
      width px2rem(342)
      display flex
      align-items center
      text-align left
      line-height px2rem(25)
      padding px2rem(20) 0
      margin-left px2rem(14)
      border-bottom-style double
      border-bottom-width 1px
      border-bottom-color $lightGray
      medium()
    }
    .tab-contain {
      border-top px2rem(10) solid #f3f3f3
      height px2rem(100)
      display flex
      align-items center
    }
    .tab-pop {
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      background-color $modelBg
      z-index 999
      .pop-content {
        position absolute
        height px2rem(244)
        border-top-right-radius px2rem(10)
        border-top-left-radius px2rem(10)
        display flex
        align-items center
        bottom 0
        background-color white
      }
    }
  }

  .right {
    display flex
    flex-direction column
    align-items center
    margin-left px2rem(10)

    .heart {
      width px2rem(22)
    }
    .focus {
      color $darkBlack
      font-size px2rem(12)
      margin-top px2rem(8)

      &.active {
        color red
      }
    }
  }
</style>
