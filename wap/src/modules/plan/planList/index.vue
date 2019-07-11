<template>
  <FollowUpList
    ref="list"
    :fetchData="fetchData"
    :filterArray="filterArray"
    @onItemClick="onItemClick"
  />
</template>

<script>
import FollowUpList from '../../../views/FollowUpList/index';
import {getFollowUpPlanList} from '../../../api/followUpPlan';
import {ddApi} from '../../../api/dingding';
import {getCorrectParams} from './config';
import Page from '../../../components/Mixins/BasePage';

export default {
  name: 'CommonPlanList',
  extends: Page,
  components: {
    FollowUpList
  },
  data() {
    return {
      type: this.$route.params.type,
      module: this.$route.params.module,
      id: this.$route.params.id
    };
  },
  computed: {
    // 筛选配置
    filterArray() {
      return getCorrectParams(this.type, 'filterArray');
    }
  },
  methods: {
    onItemClick(item) {
      this.$RouteUtil.commonDetail({type: this.type, module: this.module, id: item.id});
    },
    fetchData(params) {
      return getFollowUpPlanList({
        userId: this.id,
        type: this.type,
        ...params
      }).then(res=>res.page);
    },
    selToDay() {
      this.$refs.list.selToDay();
    }
  },
  activated() {
    ddApi.setMenu(getCorrectParams(this.type, 'rightTitleParams')(this));
  },
  refreshData() {
    this.$refs.list.refreshData();
  }
};
</script>

<style scoped>

</style>
