<template>
  <yi-auto-list :noMoreData="noMoreData"
                :fetch-data="fetchData">
    <ChangeLogCell slot-scope="{item,index}" :item="item" @onItemClick="itemClick"/>
  </yi-auto-list>
</template>

<script>
import ChangeLogCell from '../../../commons/ChangeLogCell';
import {getChangeLogsWithPage} from '../../../api/common';
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'ClueList',
  components: {
    ChangeLogCell
  },
  extends: Page,
  data() {
    return {
      noMoreData: false
    };
  },
  activated() {
    ddApi.setRight();
  },
  methods: {
    async fetchData(pageNum) {
      const data = await getChangeLogsWithPage({id: this.params.id, pageNum});
      this.noMoreData = data.last;
      let list = data.content.map(item => ({
        title: item.operatorName,
        date: item.createTime,
        data: [{title: '变更内容', value: item.description}],
        ...item
      }));
      return list;
    },
    itemClick(item) {
      if (this.params.onSuccess) {
        this.params.onSuccess({type: 'model', data: item});
        this.$router.go(-1);
      } else {
        this.$RouteUtil.commonDetail({id: item.id, module: 'clues', type: 'all'});
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

</style>
