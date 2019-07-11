<template>
  <yi-auto-list :fetch-data="fetchData">
    <CarModelCell slot-scope="{item,index}" :item="item" @click="itemClick(item)"/>
  </yi-auto-list>
</template>

<script>
import {ddApi} from '../../../api/dingding';
import {getSearchList} from '../../../api/carModel';
import CarModelCell from '../../../commons/CarModelCell';
import BasePage from '../../../components/Mixins/BasePage';

export default {
  name: 'CarSearchList',
  extends: BasePage,
  components: {
    CarModelCell
  },
  methods: {
    async fetchData(page) {
      const data = await getSearchList(page, this.params.text);
      return data.content;
    },
    itemClick(item) {
      this.params.onSuccess && this.params.onSuccess({type: 'model', data: item});
      this.$router.go(-3);
    }
  },
  activated() {
    let title = this.params.text;
    ddApi.setTitle({title});
    ddApi.setRight();
  }
};
</script>

<style scoped>

</style>
