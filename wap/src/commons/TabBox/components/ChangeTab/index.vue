<template>
  <common-tab empty-text="暂无变更内容" :bottomParams="bottomParams" :empty-icon="$images.base.img_record" :data="data"/>
</template>

<script>
import CommonTab from '../CommonTab';
import {getChangeLogsWithPage} from '../../../../api/common';

export default {
  components: {
    CommonTab
  },
  name: 'ChangeTab',
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type,
      id: this.$route.params.id,
      data: [],
      bottomParams: {
        show: true,
        length: 20,
        text: '查看更多变更记录',
        click: ()=>this.$RouteUtil.changeList({id: this.id})
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    showMore() {
      return this.data.length >= 20;
    }
  },
  methods: {
    async fetchData() {
      try {
        const res = await getChangeLogsWithPage({id: this.id, pageNum: 1});
        let list = res.content.map(item => ({
          title: item.operatorName,
          date: item.createTime,
          data: [{title: '变更内容', value: item.description}],
          ...item
        }));
        this.data = list;
        this.bottomParams.show = !res.last;
      } catch (e) {
        this.data = [];
      }
    },
    // 查看详情
    onGetDetail() {
      console.log('查看详情');
    }
  }
};
</script>

