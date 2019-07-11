<template>
  <yi-container :show-loading="isLoading">
    <yi-tab-bar :titles="titles" @onTabChange="onTabChange"/>
    <tabs class="tab" ref="tab" :titles="titles">
      <CarList type="series" v-for="(item,section) in data" :key="section" :data="item.data" :hasRightIcon="true"
               @itemClick="index => itemClick(section,index)"/>
    </tabs>
  </yi-container>
</template>

<script>
import {Tabs} from 'mand-mobile';
import CarList from '../../../views/CarList';
import {getFirmList, getSeriesList} from '../../../api/carModel';
import {ddApi} from '../../../api/dingding';
import BasePage from '../../../components/Mixins/BasePage';


export default {
  name: 'SeriesChoose',
  extends: BasePage,
  components: {
    Tabs,
    CarList
  },
  computed: {
    titles() {
      return this.data.map(item => item.name);
    }
  },
  data() {
    return {
      data: [],
      isLoading: true
    };
  },
  methods: {
    onTabChange(index) {
      this.$refs.tab.selectTab(index);
    },
    itemClick(section, index) {
      this.$RouteUtil.carModelChoose({...this.data[section].data[index], onSuccess: this.params.onSuccess});
    },
    async fetchData() {
      let brandId = this.params.id;
      const res = await getFirmList(brandId);
      this.isLoading = false;
      const allList = await Promise.all(res.map(item => getSeriesList(item.id)));
      res.forEach((item, index) => item.data = allList[index]);
      setTimeout(() => this.data = res, 200);
    }
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    this.title = this.params.name || this.title;
    ddApi.setTitle({title: this.title});
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .tab >>> .md-tab-bar {
    height 0
    font-size 0
    overflow: hidden
  }

  .tab {
    overflow hidden
    flex: 1
  }
</style>
