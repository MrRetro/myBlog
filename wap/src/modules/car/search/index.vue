<template>
  <search moduleName="car" placeholder="搜索车型关键字" @search="search"/>
</template>

<script>
import Search from '../../../views/Search';
import BasePage from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'CarSearch',
  extends: BasePage,
  components: {
    Search
  },
  methods: {
    search(text) {
      this.$RouteUtil.carModelSearchList({text, onSuccess: this.params.onSuccess});
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style scoped>

</style>
