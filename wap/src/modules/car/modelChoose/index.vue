<template>
  <yi-container :show-loading="isLoading">
    <yi-tab-bar :titles="titles" @onTabChange="onTabChange"/>
    <tabs class="tab" ref="tab" :titles="titles">
      <CarList type="model" v-for="(item,section) in data" :key="section" :data="item.items"
               @itemClick="index => itemClick(section,index)"/>
    </tabs>
  </yi-container>
</template>

<script>
import {Tabs} from 'mand-mobile';
import CarList from '../../../views/CarList';
import {getModelList} from '../../../api/carModel';
import {ddApi} from '../../../api/dingding';
import BasePage from '../../../components/Mixins/BasePage';

export default {
  name: 'ModelChoose',
  extends: BasePage,
  components: {
    Tabs,
    CarList
  },
  computed: {
    titles() {
      return this.data.map(item => `${item.name}年`);
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
      let datum = this.data[section].items[index];
      console.log(section, index, this.data);
      this.params.onSuccess && this.params.onSuccess({type: 'model', data: datum});
      this.$router.go(-3);
    },
    async fetchData() {
      const id = this.params.id;
      const res = await getModelList(id);
      this.isLoading = false;
      let data = [];
      res.forEach(item => {
        let index = data.findIndex(t => t.name === item.productiveYear);
        if (index !== -1) {
          data[index].items.push(item);
        } else {
          data.push({items: [item], name: item.productiveYear});
        }
      });
      data.sort((a, b) => b.name - a.name);
      setTimeout(() => this.data = data, 200);
    }
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    ddApi.setTitle({title: this.params.name});
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
