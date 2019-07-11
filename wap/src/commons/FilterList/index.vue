<template>
  <yi-container :show-loading="showLoading"
                :show-error="showError"
                :errorMessage="errorMessage">
    <yi-auto-list ref="list" @scroll="scroll"
                  :scrollEvents="['scroll']"
                  :disabledScroll="show"
                  :noMoreData="noMoreData"
                  :fetch-data="mFetchData">
      <div slot="header">
        <slot name="header"/>
        <FilterView
          id="filterFloat"
          :data="allFilterData"
          :selected-index="selectedIndex"
          @barItemClick="barItemClick"
          :hideMenu="hideMenu"/>
        <slot name="header-bottom"><p class="margin-top"></p></slot>
      </div>
      <template slot-scope="props">
        <slot :item="props.item" :index="props.index"/>
      </template>
    </yi-auto-list>

    <FilterView
      style="position: absolute;width:100%;z-index: 100;top:0;left:0;right:0"
      v-if="floatFilterShow"
      :data="allFilterData"
      :selected-index="selectedIndex"
      @barItemClick="barItemClick"
      :hideMenu="hideMenu"/>
    <Float
      ref="float"
      v-if="show"
      :top="top"
      :show="show"
      :data="allFilterData"
      :selected-index="selectedIndex"
      @menuClick="handleMenuClick"
      @hideMenu="hideMenu"
    />
    <div :style="{height:`${top-50}px`}" v-if="show && !floatFilterShow" @click="$refs.float.mHideMenu()"
         class="model"></div>
    <yi-touch v-show="showTop" component-name="img" @click="topClick" class="top" :src="$images.base.ic_top"/>
  </yi-container>
</template>

<script>
import FilterView from '../FilterView/index';
import Float from '../FilterView/Float';
import FilterField from '../../components/Mixins/FilterField';

export default {
  name: 'FilterList',
  mixins: [FilterField],
  components: {
    FilterView,
    Float
  },
  props: {
    fetchData: Function,
    // 通过筛选条件的字段
    filterArray: {
      type: Array,
      default: () => {
        return ['sort', 'customerLevel',
          ['customerOrigin', 'customerType', 'customerFastScreening', 'customerCreateTime', 'customerUpdateTime']];
      }
    }
  },
  data() {
    return {
      show: false,
      selectedIndex: -1,
      // top: 0,
      floatFilterShow: false,
      floatHeight: 0,
      showLoading: true,
      showError: true,
      errorMessage: '',
      noMoreData: false,
      showTop: false
    };
  },
  computed: {
    top() {
      let v = document.getElementById('filterFloat');
      const pos = v.getBoundingClientRect();
      if (this.show) {
        return !this.floatFilterShow ? (pos.top + pos.height) : pos.height;
      }
      return 0;
    }
  },
  watch: {
    show(value) {
      if (!value) {
        this.$refs.list.enable();
      } else {
        this.$refs.list.disable();
      }
    }
  },
  methods: {
    async mFetchData(page) {
      try {
        this.resetQueryParams();
        const res = await this.fetchData({pageNum: page, condition: this.condition, orders: this.orders});
        if (this.showError) this.showError = false;
        this.showLoading = false;
        this.noMoreData = res.last;
        return res.content;
      } catch (e) {
        this.showLoading = false;
        this.showError = true;
        this.errorMessage = e.message;
        return [];
      }
    },
    refreshData() {
      this.$refs.list.onPullingDown();
    },
    // 获取筛选bar的底部位置
    getTop() {
      let v = document.getElementById('filterFloat');
      const pos = v.getBoundingClientRect();
      return !this.floatFilterShow ? (pos.top + pos.height) : pos.height;
    },
    barItemClick(index) {
      if (this.selectedIndex === index) {
        this.show && this.$refs.float.mHideMenu();
      } else {
        this.selectedIndex = index;
        // this.top = this.getTop();
        this.show = true;
      }
    },
    handleMenuClick(index, i) {
      this.allFilterData[index].selectedIndex = i;
    },
    hideMenu(isChange) {
      this.show = false;
      this.selectedIndex = -1;
      if (isChange) {
        this.refreshData();
      }
    },
    scroll(event) {
      if (!this.floatHeight) {
        let v = document.getElementById('filterFloat');
        this.floatHeight = v.offsetTop;
      }
      this.showTop = -event.y > window.screen.availHeight;
      this.floatFilterShow = -(event.y) > this.floatHeight;
    },
    topClick() {
      this.$refs.list.scrollTo(0, 0, 300);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";

  .margin-top {
    height px2rem(16)
  }

  .model {
    position absolute
    top: 0
    left 0
    right 0
    bottom 0
    background-color transparent
    z-index 2
  }

  .top {
    position absolute
    bottom px2rem(20)
    right px2rem(20)
    width px2rem(65)
    height px2rem(65)
    z-index 1
  }
</style>
