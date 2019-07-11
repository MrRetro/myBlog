<script>
import {mapState} from 'vuex';
import {RouteUtil} from '../../utils/routeUtil';
import {BackHandler} from '../../utils/handleBack';


export default {
  name: 'BasePage',
  computed: {
    ...mapState({
      userAuths: state => state.user.userAuths,
      userId: state => state.user.id,
      location: state => state.user.location,
      departmentUsers: state => state.user.departmentUsers,
      users: state => state.user.users
    })
  },
  data() {
    return {
      CREATE_TIME: this.$route.params.CREATE_TIME,
      ROUTE_NAME: this.$route.name,
      ROUTE_PATH: this.$route.path,
      ROUTE_FULL_PATH: this.$route.fullPath,
      params: this.$route.params
    };
  },
  methods: {
    canGoBack() {
      return true;
    }
  },
  activated() {
    console.log('activated', this.ROUTE_NAME, this.CREATE_TIME);
    // 每个页面获取焦点的时候拿到栈的列表筛选出创建时间大于自己的执行销毁操作
    RouteUtil.stack.filter(item => item.CREATE_TIME > this.CREATE_TIME).forEach(item => item.$destroy());
    // 重新赋值栈
    RouteUtil.stack = RouteUtil.stack.filter(item => item.CREATE_TIME <= this.CREATE_TIME);
    // 每个基础页面都拦截返回键
    BackHandler.addBackListener((route) => {
      // 根据每个页面的canGoBack方法判断是否执行返回操作
      if (this.canGoBack(route)) {
        route.go(-1);
      }
    });
  },
  deactivated() {
    console.log('deactivated', this.ROUTE_NAME, this.CREATE_TIME);
    BackHandler.remove();
  },
  destroyed() {
    BackHandler.remove();
  },
  mounted() {
    // 每个页面创建时都保存到自己栈中
    RouteUtil.stack.push(this);
  }
};
</script>
