<template>
  <yi-container :show-loading="isLoading" :show-error="isError" :error-btn-params="errorBtnParams"
                :error-message="errorMessage">
    <Detail
      ref="detail"
      v-bind="allData"
      :allData="allData"
      :module="module"
      :type="type"
      @onMore="onMore"
      @focusClick="handleFocusClick"
      @onChangeMan="onChangeMan"
      @onChangeSaleMan="onChangeSaleMan"
      @onAddMan="onAddMan"
      @onDelManById="onDelManById"
    />
  </yi-container>
</template>

<script>
import Detail from '../../../views/Detail';
import {ddApi} from '../../../api/dingding';
import {
  getDetail,
  obtainPerson,
  allocationPerson,
  follow,
  addTeamworkMan,
  deleteTeamworkMan,
  responsibleCareOf,
  reasonCareOf
} from '../../../api/common';
import {getCorrectParams, transformData} from './config';
import {AlertUtil} from '../../../utils/AlertUtil';
import Page from '../../../components/Mixins/BasePage';
import {getUserSubordinates} from '../../../api/client';
// import {getUserSubordinates} from '../../../api/client';

export default {
  name: 'CommonDetail',
  extends: Page,
  components: {
    Detail
  },
  data() {
    return {
      data: {
        nameData: {},
        updateTime: '',
        nextData: {},
        bottomButtons: [],
        infoData: [],
        personData: {},
        tabConfig: [],
        rightParams: {}
      },
      module: this.$route.params.module,
      type: this.$route.params.type,
      id: this.$route.params.id,
      isLoading: true,
      isError: false,
      errorMessage: '发生错误了',
      errorBtnParams: {
        title: '重试',
        click: () => this.fetchData()
      }
    };
  },
  computed: {
    // 是否是领导
    isLeader() {
      return this.$store.getters['user/isLeader'];
    },
    // 是否是负责人 || 经纪人-关联地推&&关联销售
    isResponsible() {
      return (this.allData.personData.master && this.allData.personData.master.id === this.userId)||
        (this.allData.personData.saleMaster && this.allData.personData.saleMaster.id === this.userId);
    },
    // 是否是协同人/负责人
    isParticipant() {
      return this.isResponsible ||
          this.allData.personData.pater.findIndex(item => item.id === this.userId) !== -1;
    },
    // 是否是领导、协同人、负责人
    hasAuth() {
      return this.isLeader || this.isParticipant;
    },
    // 经过转化后的所有数据
    allData() {
      if (this.isLoading || this.isError) {
        return this.data;
      }
      return {
        ...transformData({module: this.module, type: this.type, data: this.data, instance: this}),
        fetchData: () => this.fetchData()
      };
    }
  },
  methods: {
    canGoBack() {
      // 如果有传返回的控制参数,则拦截返回键
      if (this.params.BACK_ACTION) {
        this.$RouteUtil.back(this.params.BACK_ACTION);
        return false;
      }
      if (this.$RouteUtil.stack.length <= 1) {
        this.$RouteUtil.main();
        return false;
      }
      return true;
    },
    async fetchData() {
      try {
        if (this.isError) {
          this.isLoading = true;
        }
        const res = await getDetail({id: this.id, module: this.module});
        this.isLoading = false;
        this.isError = false;
        this.data = res;
        ddApi.setMenu({
          items: [{id: '1', text: '更多', url: 'http://images.itsmycar.cn/more.png'}],
          onSuccess: this.allData.rightParams.onSuccess
        });
      } catch (e) {
        console.log(e);
        this.isError = true;
        this.isLoading = false;
        this.errorMessage = e.message;
      }
    },
    onMore() {
      this.$RouteUtil.commonDetailMore({
        id: this.id,
        module: this.module,
        params: this.allData,
        onSuccess: () => {
          this.fetchData();
          this.params.onSuccess && this.params.onSuccess();
        }
      });
    },
    // 捞取
    async obtainPerson() {
      await obtainPerson({id: this.id, module: this.module});
      this.fetchData();
      this.tabFetchData('ChangeTab');
      AlertUtil.showToast({txt: '捞取成功', type: 'correct'});
    },
    // 分配
    async allocationPerson() {
      let users = this.users;
      if (this.module === 'agents') {
        users = await getUserSubordinates(this.userId, ['DCC', 'ground_promotion']);
      } else if (this.module === 'clues') {
        users = await getUserSubordinates(this.userId, ['sales', 'DCC', 'city_manager_and_sales']);
      }
      ddApi.customContact.choose({
        startWithDepartmentId: 0,
        isNeedSearch: true,
        multiple: false,
        users,
        disabledUsers: [],
        title: this.module === 'agents'?'地推人员选择':'负责人选择',
        onSuccess: async (result) => {
          await allocationPerson({id: this.id, module: this.module, responsibleId: result[0].emplId});
          AlertUtil.showToast({txt: '分配成功', type: 'correct'});
          this.fetchData();
          this.tabFetchData('ChangeTab');
        }
      });
    },
    // 经纪人公海-分配销售人员
    async allSalePerson() {
      let users = this.users;
      if (this.module === 'agents') {
        users = await getUserSubordinates(this.userId, ['sales']);
      }
      ddApi.customContact.choose({
        startWithDepartmentId: 0,
        isNeedSearch: true,
        multiple: false,
        users,
        disabledUsers: [],
        title: '销售人员选择',
        onSuccess: async (result) => {
          // await responsibleCareOf({id: this.params.id, module: this.module, responsibleId: result[0].emplId,tag:'sale'});
          // AlertUtil.showToast({txt: '分配成功', type: 'correct'});
          // this.fetchData();
          // this.tabFetchData('ChangeTab');

          // 如果是转交销售，请输入转交理由
          this.reasonTranfer({id:result[0].emplId});

        }
      });
    },
    async handleFocusClick() {
      if (!this.fastClick) {
        this.fastClick = true;
        try {
          await follow({id: this.id, module: this.module, isCancel: this.allData.nameData.follow});
        } catch (e) {
          this.fastClick = false;
        }
        await this.fetchData();
        this.fastClick = false;
      }
    },
    async onChangeMan() {
      let users = this.users;
      if (this.module === 'agents') {
        users = await getUserSubordinates(this.userId, ['DCC', 'ground_promotion']);
      } else if (this.module === 'clues') {
        users = await getUserSubordinates(this.userId, ['sales', 'DCC', 'city_manager_and_sales']);
      }
      let disabledUsers = [];
      if (this.allData.personData.master.dingUserId) {
        disabledUsers.push(this.allData.personData.master.dingUserId);
      }
      ddApi.customContact.choose({
        disabledUsers,
        title: this.module === 'agents'?'选择关联地推':'选择负责人',
        users,
        limitTips: '',
        pickTips: '',
        onSuccess: async (result) => {
          await responsibleCareOf({id: this.params.id, module: this.module, responsibleId: result[0].emplId});
          this.fetchData();
          this.tabFetchData('ChangeTab');
        }
      });
    },
    // todo 转交关联销售
    async onChangeSaleMan() {
      let users = this.users;
      if (this.module === 'agents') {
        users = await getUserSubordinates(this.userId, ['sales']);
      } else if (this.module === 'clues') {
        users = await getUserSubordinates(this.userId, ['sales', 'DCC', 'city_manager_and_sales']);
      }
      let disabledUsers = [];
      if (this.allData.personData.master.dingUserId) {
        disabledUsers.push(this.allData.personData.master.dingUserId);
      }
      ddApi.customContact.choose({
        disabledUsers,
        title: '选择关联销售',
        users,
        limitTips: '',
        pickTips: '',
        onSuccess: async (result) => {

          // 如果是转交销售，请输入转交理由
          this.reasonTranfer({id: result[0].emplId});
        }
      });
    },
    // 转交销售理由
    reasonTranfer({ id }) {
      ddApi.prompt({
        title: '转交理由',
        buttonLabels: ['确认'],
        onSuccess: async (data)=>{
          console.log('转交销售及理由：', data);
          let content = data.value;
          // debugger;

          // 转交销售
          // await responsibleCareOf({id: this.params.id, module: this.module, responsibleId: id,tag:'sale'});

          // 转交销售&&理由
          await reasonCareOf({
            reason: content,
            id,
            ids: [this.params.id],
            module: this.module,
            tag: 'sale'
          })

          this.fetchData();
          this.tabFetchData('ChangeTab');
          AlertUtil.showToast({txt: '分配成功', type: 'correct'});
        }
      })
    },
    // 添加协同人
    async onAddMan() {
      let disabledUsers = [];
      if (this.allData.personData.master.dingUserId) {
        disabledUsers.push(this.allData.personData.master.dingUserId);
      }
      this.allData.personData.pater.filter(item => item.dingUserId).forEach(item => disabledUsers.push(item.dingUserId));

      // 处理经纪人添加协同人列表 - DCC+地推
      let users = null;
      let arr = await getUserSubordinates(this.userId,['DCC','ground_promotion'])
      if(this.module === 'agents' && arr && arr.length>0){
        users = arr;
      }

      ddApi.customContact.multipleChoose({
        max: 5, // 限制选取5人
        disabledUsers,
        users: users || this.departmentUsers,
        title: '添加协同人',
        onSuccess: async (result) => {
          let teamworkIds = result.map(item => item.emplId);
          console.log('teamworkIds', teamworkIds);
          await addTeamworkMan({id: this.params.id, module: this.module, teamworkIds});
          this.fetchData();
          this.tabFetchData('ChangeTab');
        }
      });
    },
    // 根据id删除协同人
    async onDelManById(id) {
      await deleteTeamworkMan({id: this.id, teamworkId: id, module: this.module});
      this.fetchData();
    },
    tabFetchData(tabName) {
      this.$refs.detail.tabFetchData(tabName);
    }
  },
  mounted() {
    this.fetchData();
    $eventBus.$on('tokenChange', () => this.fetchData());
  },
  destroyed() {
    $eventBus.$off('tokenChange');
  },
  activated() {
    ddApi.setTitle({title: getCorrectParams(this.module, this.type, 'title')});
    ddApi.setMenu({
      items: [{id: '1', text: '更多', url: 'http://images.itsmycar.cn/more.png'}],
      onSuccess: this.allData.rightParams.onSuccess
    });
  }
};
</script>
