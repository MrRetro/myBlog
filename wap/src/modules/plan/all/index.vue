<template>
  <div class="statistcs-box app-init">
    <cube-scroll>
      <yi-calendar
        ref="calendar"
        :special="planDate"
        @onSelDate="onSelDate"
        @onMonth="onMonth"
      />
      <p class="space-line"></p>
      <yi-table
        :form="tableData"
        @onSelectById="onSelectById"
      />
    </cube-scroll>
  </div>
</template>

<script>
import {ddApi} from '../../../api/dingding';
import {getFollowDateList, getFollowUpListByDay, getFollowUpDayByMonth} from '../../../api/followUpPlan';
import {getDateFormat} from '../../../utils/TimeUtil';
import Page from '../../../components/Mixins/BasePage';

export default {
  name: 'CommonPlanAll',
  extends: Page,
  created() {
    this.$nextTick(() => {
      let date = new Date();
      this.onSelDate(getDateFormat(date.getFullYear(), date.getMonth() + 1, date.getDate()));
      // 页面初始化
      // TODO 获取跟进计划后台待完善
      getFollowDateList({test: 'test', type: this.params.type})
        .then(res => {
          console.log(res);
          if (res.planForMonthList) {
            this.planDate = res.planForMonthList.filter(item => item.count > 0).map(item => item.date.replace(/-/g, '/'));

            console.log(res, '---->');
            this.tableData.body = res.planCollectList.map(item=>(
              {id: item.userId, tr: [{value: item.userName}, {value: item.planTotalCount}, {value: item.planFinishedCount}, {value: item.performRatio}]})
            );
            console.log(this.tableData, '<---->');
            // 设置计划日期列表 设置vuex
            // this.$store.dispatch('user/getPlanDateList', this.planDate);
          }
        })
        .catch(err => console.log(err, '=>err'));
    });
  },
  activated() {
    // let img = require('../../../assets/images/all/ico_today.png');
    let items = [{
      id: '1',
      text: '今天',
      url: 'http://images.itsmycar.cn/button_today.png'
    }];
    if (
      this.params.type === 'clue' && this.$store.state.user.userAuths['wap-crm-clue-plan-auth'] ||
      this.params.type === 'agent' && this.$store.state.user.userAuths['wap-agents-add-auth']
    ) {
      items.push({
        id: '2',
        text: '新建'
      });
    }
    // 设置菜单
    ddApi.setMenu({
      items,
      onSuccess: (data) => {
        console.log(data);
        if (data.id === '1') {
          this.selToDay();
        } else if (data.id === '2') {
          this.$RouteUtil.commonPlanAdd({type: this.type, module: this.module, BACK_ACTION: {path: this.ROUTE_PATH}});
        }
      }
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      module: this.$route.params.module,
      selDate: '',
      planDate: [], // 计划日期列表
      tableData: {
        title: '下属员工跟进计划',
        head: [{name: '姓名'}, {name: '计划数量'}, {name: '完成数量'}, {name: '完成比例'}],
        body: []
      }
    };
  },
  methods: {
    // 选中日期
    onSelDate(vl) {
      console.log(`当前选中日期：${vl}`);
      this.selDate = vl;
      let arr = vl.split('/');

      let type = this.params.type;
      let year = arr[0];
      let month = arr[1];
      let day = arr[2];
      let pageNum = 1;

      console.log(type);
      console.log(year);
      console.log(month);
      console.log(day);
      console.log(pageNum);

      // todo
      getFollowUpListByDay({
        type: this.params.type,
        year,
        month,
        day,
        pageNum
      }).then(res => {
        console.log(res, '-------1');

        this.planDate = res.planForMonthList.filter(item => item.count > 0).map(item => item.date.replace(/-/g, '/'));

        let data = res.planCollectList;
        let list = [];
        if (data) {
          data.map(item => {
            list.push({
              id: item.userId,
              tr: [{value: item.userName},
                {value: item.planTotalCount},
                {value: item.planFinishedCount},
                {value: item.performRatio}]
            });
            return false;
          });
        }
        if (list.length > 0) {
          this.tableData.body = list;
        } else {
          this.tableData.body = null;
        }
        console.log(this.tableData);
      })
        .catch(err => console.log(err, '-------2'));
    },
    // 选中当天
    selToDay() {
      this.$refs.calendar.handleSelToday();
    },
    // 切换月份
    onMonth(month) {
      console.log(month, '123');

      // 更改月份有计划的标示
      getFollowUpDayByMonth({month, type: this.params.type})
        .then(res=> {
          console.log(res, '666');
          this.planDate = res.filter(item => item.count > 0).map(item => item.date.replace(/-/g, '/'));
        }
        )
        .catch(err=>console.log(err));

    },
    // 根据选中员工id进行页面跳转
    onSelectById(id) {
      let date = this.selDate;
      this.$RouteUtil.commonPlanList({type: this.type, module: this.module, id, date});
    }
  }
};
</script>


<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .statistcs-box {
    display flex
    flex-direction column
    flex 1
    width 100%
    height 100%

    .space-line {
      width 100%
      height px2rem(10)
      background-color #f3f3f3
    }
  }
</style>
