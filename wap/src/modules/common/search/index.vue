<template>
  <search :moduleName="moduleName" :placeholder="placeholder" @search="search"/>
</template>

<script>
import Search from '../../../views/Search/index';
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'CommonSearch',
  extends: Page,
  components: {
    Search
  },
  data() {
    return {
      moduleName: this.$route.params.module,
      placeholder: this.$route.params.placeholder
    };
  },
  methods: {
    search(text) {
      this.$RouteUtil.commonSearchResult({...this.params, key: text});
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style scoped>

</style>
