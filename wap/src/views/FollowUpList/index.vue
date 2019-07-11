<template>
    <FilterList
      ref="list"
      :filterArray="filterArray"
      :fetch-data="mFetchData"
    >
      <div slot="header">
        <yi-calendar
          ref="calendar"
          :special="planDate"
          :defaultDate ='params.date'
          @onSelDate="onSelDate"
          @onMonth="onMonth"
        />
        <p class="space-line"></p>
      </div>
      <FollowUpPlanCell
        slot-scope="{item,index}"
        @onItemClick="t=>$emit('onItemClick',t)"
        :item="item"
      />
    </FilterList>
</template>

<script>
import FollowUpPlanCell from '../../commons/FollowUpPlanCell';
import FilterList from '../../commons/FilterList';
import {getFollowDateListById, getFollowUpDayByMonth} from '../../api/followUpPlan';


export default {
  name: 'CalendarList',
  components: {
    FilterList,
    FollowUpPlanCell
  },
  created() {
    this.$nextTick(() => {
      let date = this.params.date.split('/');
      let year = date[0] || '2018';
      let month = date[1] || '7';
      let day = date[2] || '10';

      // let date = new Date();
      // this.onSelDate(getDateFormat(date.getFullYear(), date.getMonth() + 1, date.getDate()));
      // 页面初始化
      // TODO 获取跟进计划后台待完善
      getFollowDateListById({id: this.params.id, type: this.params.type, year, month, day})
        .then(res => {
          if (res.planForMonthList) {
            this.planDate = res.planForMonthList.filter(item => item.count > 0).map(item => item.date.replace(/-/g, '/'));
          }
        })
        .catch(err => console.log(err, '=>err'));
    });
  },
  props: ['fetchData', 'filterArray'],
  data() {
    return {
      params: this.$route.params,
      type: this.$route.params.type,
      planDate: [] // 计划日期列表
    };
  },
  methods: {
    // 选中日期
    onSelDate(vl) {
      console.log(`当前选中日期：${vl}`);
      this.params.date = vl;
      this.$refs.list.refreshData();
    },
    async mFetchData(params) {
      try {
        const date = this.params.date.split('/');
        params.condition = {year: [date[0]], month: [date[1]], day: [date[2]], ...params.condition};
        const res = await this.fetchData(params);
        return res;
      } catch (e) {
        return [];
      }
    },
    onMonth(month) {
      console.log(month, '123');

      // 更改月份有计划的标示
      getFollowUpDayByMonth({month, userId: this.params.id, type: this.params.type})
        .then(res=> {
          console.log(res, '666');
          this.planDate = res.filter(item => item.count > 0).map(item => item.date.replace(/-/g, '/'));
        }
        )
        .catch(err=>console.log(err));
    },
    refreshData() {
      this.$refs.list.refreshData();
    },
    selToDay() {
      this.$refs.calendar.handleSelToday();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";

  .space-line {
    width 100%
    height px2rem(10)
    background-color #f3f3f3
  }
</style>
