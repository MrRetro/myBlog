<template>
  <div>
    <common-tab empty-text="暂无跟进记录" :empty-icon="$images.base.img_record" :data="listData"/>
    <yi-touch v-if="showLink" class="more-bottom" @click="handleLinkClick">查看历史记录 ></yi-touch>
  </div>
</template>

<script>
import CommonTab from '../CommonTab';
import {getFollowUpRecords} from '../../../../api/common';

export default {
  components: {
    CommonTab
  },
  props: ['allData'],
  name: 'FollowUpTab',
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      id: this.$route.params.id,
      data: []
    };
  },
  computed: {
    listData() {
      return this.module !== 'followUpPlans' ? this.data : this.allData.planRecords.map(item => {
        let data = [{title: '跟进方式', value: item.way && item.way.name}, {title: '跟进记录', value: item.record}];
        return {
          title: item.createdBy,
          date: item.executionTime,
          data,
          ...item
        };
      });
    },
    showLink() {
      return this.module === 'followUpPlans';
    }
  },
  mounted() {
    if (this.module !== 'followUpPlans') {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      switch (this.module) {
        case 'customers':
          this.module = 'customer';
          break;
        case 'clues':
          this.module = 'clue';
          break;
        case 'agents':
          this.module = 'agent';
          break;
        default:
          break;
      }
      try {
        const res = await getFollowUpRecords({id: this.id, type: this.module});
        this.data = res.map(item => {
          let data = [{title: '跟进方式', value: item.way && item.way.name}, {title: '跟进记录', value: item.record}];
          if (item.nextPurpose && item.nextExecutionTime) {
            data.push({title: '下次跟进时间', value: item.nextExecutionTime.split(' ')[0]});
            data.push({title: '下次跟进目的', value: item.nextPurpose});
          }
          return {
            title: item.operatorName,
            date: item.executionTime,
            data,
            ...item
          };
        });
      } catch (e) {
        this.data = [];
      }
    },
    handleLinkClick() {
      this.$RouteUtil.commonDetail({id: this.allData.targetId, module: `${this.type}s`});
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .more-bottom {
    color $themeColor
    font-size px2rem(14)
    height px2rem(50)
    line-height px2rem(50)
    text-align center
  }
</style>
