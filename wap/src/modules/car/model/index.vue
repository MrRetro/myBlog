<template>
  <yi-container>
    <yi-tab-bar v-if="!singleChoose" :titles="titles" @onTabChange="onTabChange"/>
    <tabs class="tab" ref="tab" :titles="titles">
      <ModelList/>
      <ObscureTab v-if="!singleChoose" ref="obscureTab" @onSelectedValueSuccess="onDimChooseSuccess"/>
    </tabs>
  </yi-container>
</template>

<script>
import {Tabs} from 'mand-mobile';
import {ddApi} from '../../../api/dingding';
import ModelList from './components/ModelList';
import ObscureTab from './components/ObscureTab';
import {RouteUtil} from '../../../utils/routeUtil';
import BasePage from '../../../components/Mixins/BasePage';

export default {
  name: 'Model',
  extends: BasePage,
  components: {
    Tabs,
    ModelList,
    ObscureTab
  },
  data() {
    return {
      titles: ['明确意向', '模糊意向']
    };
  },
  computed: {
    singleChoose() {
      return this.params.singleChoose;
    }
  },
  methods: {
    onTabChange(index) {
      this.$refs.tab.selectTab(index);
      this.setRight(index);
    },
    onDimChooseSuccess(item) {
      // 模糊意向选择成功
      this.params.onSuccess && this.params.onSuccess({type: 'dim', data: item});
      this.$router.back();
    },
    setRight(index) {
      if (index === 0) {
        ddApi.setRight({text: '搜索',
          onSuccess: ()=>{
            RouteUtil.carModelSearch({onSuccess: this.params.onSuccess});
          }});
      } else {
        ddApi.setRight({text: '清空',
          onSuccess: ()=>{
            this.$refs.obscureTab.clear();
          }});
      }
    }
  },
  activated() {
    this.setRight(0);
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  >>> .md-tab-bar {
    height 0
    font-size 0
    overflow: hidden
  }

  .tab {
    overflow hidden
    position relative
    top:0;
    bottom :0;
    left:0;
    right 0;
  }
</style>
