<template>
  <search-list
    ref="list"
    :filterArray="filterArray"
    :fetch-data="fetchData"
    :totalText="totalText"
    :searchText="searchText"
    @searchClick="searchClick"
    @onItemClick="onItemClick"
  />
</template>

<script>
import SearchList from '../../../views/SearchList/index';
import {ddApi} from '../../../api/dingding';
import {getCorrectParams} from './config';
import Page from '../../../components/Mixins/BasePage';

export default {
  name: 'CommonSearchList',
  extends: Page,
  components: {
    SearchList
  },
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      condition: this.$route.params.condition,
      searchText: '',
      totalText: ''
    };
  },
  methods: {
    refreshData() {
      this.$refs.list.refreshData();
    },
    fetchData(params) {
      const {type, module} = this.params;
      params.condition = {...this.condition, ...params.condition};
      return getCorrectParams(this.module, this.type, 'fetchData')({...params, type, module});
    },
    onItemClick(item, ins) {
      const {type, module, choose, onSuccess, needBack} = this.params;
      // 如果是选择模式，返回
      if (choose) {
        onSuccess && onSuccess(item);

        if (needBack) {
          this.$router.go(-1);
        }
        return;
      }
      let itemClick = getCorrectParams(this.module, this.type, 'onItemClick');
      itemClick({id: item.id, module, type, item, instance: this, cell: ins});
    },
    searchClick() {
      this.$RouteUtil.commonSearch({...this.params, placeholder: this.searchText});
    }
  },
  computed: {
    // 筛选配置
    filterArray() {
      return getCorrectParams(this.module, this.type, 'filterArray');
    }
  },
  mounted() {
    this.searchText = getCorrectParams(this.module, this.type, 'searchText');
    this.totalText = getCorrectParams(this.module, this.type, 'totalText');
  },
  activated() {
    if (this.params.choose) {
      ddApi.setTitle({title: getCorrectParams(this.module, this.type, 'chooseTitle')});
    } else {
      ddApi.setTitle({title: getCorrectParams(this.module, this.type, 'title')});
    }
    ddApi.setRight(getCorrectParams(this.module, this.type, 'rightTitleParams')(this));
  }
};
</script>
