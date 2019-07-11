<template>
  <search-list
    :filterArray="filterArray"
    :fetch-data="fetchData"
    :totalText="totalText"
    :hideSearchBar="true"
    @onItemClick="onItemClick"
  />
</template>

<script>
import SearchList from '../../../views/SearchList/index';
import {ddApi} from '../../../api/dingding';
import {getCorrectParams} from './config';
import Page from '../../../components/Mixins/BasePage';

export default {
  name: 'CommonSearchResult',
  components: {
    SearchList
  },
  extends: Page,
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      condition: this.$route.params.condition,
      key: this.$route.params.key,
      totalText: ''
    };
  },
  methods: {
    fetchData(params) {
      const {type, module, key} = this.params;
      params.condition = {...params.condition, ...this.condition};
      params.condition.key = [key];
      return getCorrectParams(this.module, this.type, 'fetchData')({...params, type, module});
    },
    onItemClick(item) {
      const {type, module, choose, onSuccess, needBack} = this.params;
      // 如果是选择模式，返回
      if (choose) {
        onSuccess && onSuccess(item);
        if (needBack) {
          this.$router.go(-3);
        }
        return;
      }
      let itemClick = getCorrectParams(this.module, this.type, 'onItemClick');
      itemClick({id: item.id, module, type, item, instance: this});
    }
  },
  computed: {
    filterArray() {
      return getCorrectParams(this.module, this.type, 'filterArray');
    }
  },
  mounted() {
    this.totalText = getCorrectParams(this.module, this.type, 'totalText');
  },
  activated() {
    // ddApi.setTitle({title: getCorrectParams(this.module, this.type, 'title')});
    ddApi.setTitle({title: `搜索：${this.key}`});
    ddApi.setRight();
  }
};
</script>
