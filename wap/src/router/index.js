import Vue from 'vue';
import Router from 'vue-router';
import Main from '../modules/main';
import {clientRoute} from './client';
import {clueRoute} from './clue';
import {carRoute} from './car';
import {planRoute} from './plan';
import {agentRoute} from './agent';
import {orderRoute} from './order';
import {inquiryRoute} from './inquiry';
import {deliveryRoute} from './delivery';
import {RouteUtil} from '../utils/routeUtil';
// import SearchList from '../modules/common/searchList';


Vue.use(Router);

// 更改路由的push方法,添加isPush参数来判断是否是前进操作
const defaultPush = Router.prototype.push;
Router.prototype.push = function push(location, onComplete, onAbort) {
  this.anim = true;
  this.isPush = true;
  defaultPush.call(this, location, onComplete, onAbort);
};
const defaultReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, onComplete, onAbort) {
  this.isPush = true;
  RouteUtil.stack.pop();
  defaultReplace.call(this, location, onComplete, onAbort);
};

// 重写Router go方法，第二个参数决定是否有返回动画
const defaultGo = Router.prototype.go;
Router.prototype.go = function go(number, anim = true) {
  // if (RouteUtil.stack.length <= 1) {
  //   RouteUtil.replace({path: '/'});
  // }
  this.anim = anim;
  defaultGo.call(this, number);
  // console.log('defaultGo', number);
  // RouteUtil.number = -number;
  // for (let i = 0; i < -number; i++) {
  //   let pop = RouteUtil.stack.pop();
  //   pop.$destroy();
  // }
  // AlertUtil.show('route', RouteUtil.stack);
};

export default new Router({
  routes: [
    {
      path: '/form',
      name: 'horm',
      component: () => import('../modules/home/form')
    },
    {
      path: '/dd',
      name: 'DingDing',
      component: () => import('../modules/home/DingDing')
    }, {
      path: '/',
      name: 'main',
      component: Main
    }, {
      path: '/error/:CREATE_TIME',
      name: 'error',
      meta: {title: '发生错误'},
      component: () => import('../modules/error/index.vue')
    },
    {
      path: '/:module/list/:type/:CREATE_TIME',
      name: 'searchList',
      component: () => import('../modules/common/searchList')
    },
    {
      path: '/:module/list/:type/search/:CREATE_TIME',
      name: 'commonSearch',
      meta: {title: '搜索'},
      component: () => import('../modules/common/search')
    },
    {
      path: '/:module/list/:type/search/:key/result/:CREATE_TIME',
      name: 'commonSearchResult',
      meta: {title: '搜索'},
      component: () => import('../modules/common/searchList/Result')
    },
    {
      path: '/:module/:type/detail/:id/:CREATE_TIME',
      name: 'commonDetail',
      component: () => import('../modules/common/detail')
    },
    {
      path: '/:module/:type/detail/more/:id/:CREATE_TIME',
      name: 'commonDetailMore',
      meta: {title: '更多资料'},
      component: () => import('../modules/common/more')
    },
    {
      path: '/:module/followUp/:type/:CREATE_TIME',
      name: 'commonFollowUp',
      component: () => import('../modules/common/followUp')
    },
    {
      path: '/:module/inquiry/:id/:CREATE_TIME',
      name: 'commonInquiry',
      meta: {title: '提交询价'},
      component: () => import('../modules/inquiry/add')
    },
    {
      path: '/offerDetail/:id/:CREATE_TIME',
      name: 'offerDetail',
      meta: {title: '报价详情'},
      component: () => import('../modules/common/offerDetail')
    },
    {
      path: '/changeList/:id/:CREATE_TIME',
      name: 'changeList',
      meta: {title: '变更记录'},
      component: () => import('../modules/common/changeList')
    },
    ...clientRoute,
    ...carRoute,
    ...clueRoute,
    ...planRoute,
    ...agentRoute,
    ...orderRoute,
    ...inquiryRoute,
    ...deliveryRoute
  ]
});
