<template>
  <yi-container>
    <yi-search-bar text="搜索地址" @click="handleSearchClick"/>
    <FilterView
      id="float"
      :data="allFilterData"
      :selected-index="selectedIndex"
      :hasLine="false"
      @barItemClick="barItemClick"
      :hideMenu="hideMenu"/>
    <el-amap vid="amap" :zoom="zoom" :plugin="plugin" :center="center" class="amap">
      <el-amap-marker
        :clickable="true"
        :topWhenClick="true"
        v-for="(item,index) in markers" :key="index"
        :position="item.position"
        :events="item.events"
        :vid='index'>
        <HeaderMarker
          @click="scrollToIndex(index)"
          :is-selected="listSelectedIndex === index"
          :name="item.name"/>
      </el-amap-marker>
      <el-amap-marker
        v-if="userLocation"
        :position="userLocation.position">
        <img class="user-location" :src="$images.base.ic_my_location"/>
      </el-amap-marker>
    </el-amap>

    <cube-scroll
      class="tab-scroll"
      id="horizontal-scroll"
      ref="scroll"
      :options="options"
      @scroll-end="scrollEnd"
      :scroll-events="['scroll-end']"
      direction="horizontal">
      <ul class="list-wrapper">
        <li v-for="(item,index) in listData" :key="index" class="list-item">
          <agent-cell
            @onItemClick="onItemClick(item)"
            :has-shadow="false"
            :item="item"
            style="margin: 0 0.17rem;"
            class="near-cell"/>
        </li>
      </ul>
    </cube-scroll>

    <img class="location-img" @click="location" :src="$images.base.ic_location"/>

    <Float
      ref="float"
      v-if="show"
      :top="getTop()"
      :show="show"
      :data="allFilterData"
      :selected-index="selectedIndex"
      @menuClick="handleMenuClick"
      @hideMenu="hideMenu"
    />
  </yi-container>
</template>

<script>
import VueAMap from 'vue-amap';
import Vue from 'vue';
import {mapState} from 'vuex';
import FilterField from '../../components/Mixins/FilterField';
import HeaderMarker from '../../commons/HeaderMarker';
import FilterView from '../../commons/FilterView';
import AgentCell from '../../commons/AgentCell';
import Float from '../../commons/FilterView/Float';
import {ddApi} from '../../api/dingding';
import {AlertUtil} from '../../utils/AlertUtil';

Vue.use(VueAMap);


VueAMap.initAMapApiLoader({
  // 高德的key
  key: '8f7a18ab7cf34a51713aaf136aff30eb',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});


export default {
  name: 'Near',
  mixins: [FilterField],
  props: {
    filterArray: {
      type: Array,
      default: () => ['agentLevel', ['agentOrigin', 'agentType', 'lastFollowUpTime',
        'nextFollowUpTime', 'agentFastScreening', 'agentObtainTime', 'agentCreateTime']]
    },
    fetchData: Function
  },
  components: {
    HeaderMarker,
    FilterView,
    Float,
    AgentCell
  },
  data() {
    return {
      selectedIndex: -1,
      show: false,
      zoom: 13,
      center: [119.076, 23.454],
      plugin: [{
        pName: 'ToolBar',
        position: 'RT',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }],
      canScroll: true,
      options: {
        momentum: false
      },
      listSelectedIndex: 0,
      listData: []
    };
  },
  computed: {
    ...mapState({
      userLocation: state => ({position: [state.user.location.longitude, state.user.location.latitude]})
    }),
    markers() {
      return this.listData.map((item, index) => ({
        position: [item.longitude, item.latitude],
        name: item.name,
        events: {
          click: () => {
            this.scrollToIndex(index);
          }
        }
      }));
    }
  },
  methods: {
    getTop() {
      let v = document.getElementById('float');
      const pos = v.getBoundingClientRect();
      return pos.top + pos.height;
    },
    barItemClick(index) {
      if (this.selectedIndex === index) {
        this.show && this.$refs.float.mHideMenu(false);
      } else {
        this.selectedIndex = index;
        this.top = this.getTop();
        this.show = true;
      }
    },
    async mFetchData() {
      try {
        this.resetQueryParams();
        this.condition.longitude = [(this.center[0] - 0.02).toFixed(3), (this.center[0] + 0.02).toFixed(3)];
        this.condition.latitude = [(this.center[1] - 0.02).toFixed(3), (this.center[1] + 0.02).toFixed(3)];
        const res = await this.fetchData({condition: this.condition, orders: this.orders});
        this.listData = res.content;
        if (this.listData.length === 0) {
          AlertUtil.showToast({txt: '附近暂无经纪人'});
        }
      } catch (e) {
        this.listData = [];
      }
    },
    onItemClick(item) {
      this.$RouteUtil.commonDetail({id: item.id, module: 'agents', type: 'all'});
    },
    handleMenuClick(index, i) {
      this.allFilterData[index].selectedIndex = i;
    },
    hideMenu(isChange) {
      this.show = false;
      this.selectedIndex = -1;
      if (isChange) {
        this.mFetchData();
      }
    },
    changeCenter(index) {
      this.scrollToIndex(index);
    },
    async location() {
      await this.$store.dispatch('user/getLocation');
      this.center = this.userLocation.position;
      this.mFetchData();
    },
    scrollEnd(event) {
      if (!this.cellWidth) {
        this.cellWidth = window.px2realPx(347 + 8);
      }
      const scrollX = Math.abs(event.x);
      let index = Math.round(scrollX / this.cellWidth);
      this.scrollToIndex(index);
    },
    scrollToIndex(index) {
      if (!this.cellWidth) {
        this.cellWidth = window.px2realPx(347 + 8);
      }
      this.listSelectedIndex = index;
      this.center = [this.listData[index].longitude, this.listData[index].latitude];

      let selectorAll = document.querySelectorAll('.near-cell');
      let ofElement = selectorAll[index];
      this.$refs.scroll.scrollTo(-ofElement.offsetLeft + selectorAll[0].offsetLeft, 0, 300);
      this.canScroll = false;
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.canScroll = true, 300);
    },
    handleSearchClick() {
      ddApi.search({
        longitude: this.center[0],
        latitude: this.center[1],
        onSuccess: ({longitude, latitude}) => {
          this.center = [longitude, latitude];
          this.mFetchData();
        }
      });
    }
  },
  mounted() {
    this.location();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .amap {
    height calc(100% - 4.39rem);
    position relative;
  }

  >>> .cube-scroll-content {
    overflow hidden
    transform: rotate(0deg)
    display: inline-block
  }

  .tab-scroll {
    position absolute
    left 0;
    right 0;
    height auto;
    bottom px2rem(18);
  }

  .list-wrapper {
    display: inline-block
    white-space: nowrap
    padding 0 px2rem(10)
  }

  .list-item {
    display: inline-block
  }

  .sele-marker-bg {
    width: px2rem(46);
    height: px2rem(52);
  }

  >>> .cell-contain {
    width px2rem(347)
  }

  .location-img {
    width px2rem(36)
    height px2rem(36)
    position absolute
    bottom px2rem(183)
    left px2rem(14)
  }

  .user-location {
    width px2rem(18)
    height px2rem(18)
  }

  .sele-marker-header {
    width: px2rem(38);
    height: px2rem(38);
    position absolute;
    top: px2rem(4);
    left: px2rem(4)
  }
</style>
