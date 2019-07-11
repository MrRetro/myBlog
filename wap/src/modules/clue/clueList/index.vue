<template>
  <yi-auto-list ref="list" :fetch-data="fetchData" :enabled-pull-up="false">
    <ClueCell slot-scope="{item,index}" :item="item" @onItemClick="itemClick"/>
  </yi-auto-list>
</template>

<script>
import ClueCell from '../../../commons/ClueCell';
import {getListClue} from '../../../api/clue';
import BasePage from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';
import {RouteUtil} from '../../../utils/routeUtil';

export default {
  name: 'ClueList',
  extends: BasePage,
  components: {
    ClueCell
  },
  methods: {
    fetchData() {
      return getListClue({...this.params});
    },
    itemClick(item) {
      if (this.params.onSuccess) {
        this.params.onSuccess(item);
        this.$router.go(-1);
      } else {
        this.$RouteUtil.commonDetail({id: item.id, module: 'clues', type: 'all'});
      }
    }
  },
  activated() {
    let rightParams = {};
    if (this.params.module !== 'agents') {
      rightParams = {
        text: '新建',
        onSuccess: () => {
          RouteUtil.clueAdd({
            customerId: this.params.id,
            type: 'add',
            onSuccess: () => {
              this.$refs.list.onPullingDown();
            }
          });
        }
      };
    }
    ddApi.setRight(rightParams);
  }
};
</script>
