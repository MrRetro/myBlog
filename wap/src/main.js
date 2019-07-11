// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
  Validator,
  Scroll,
  Popup,
  Rate,
  // Style,
  // Button,
  Loading,
  // Tip,
  // Toolbar,
  // Checkbox,
  CheckboxGroup,
  // Radio,
  // Input,
  // Textarea,
  // Select,
  Switch,
  Upload,
  // Form,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  // CascadePicker,
  // TimePicker,
  // SegmentPicker,
  // Dialog,
  // ActionSheet,
  // Drawer,
  // Slide,
  IndexList
  // Swipe
} from 'cube-ui';
// import VeeValidate, {Validator} from 'vee-validate';
// import zh_CN from 'vee-validate/dist/locale/zh_CN';
// import VueI18n from 'vue-i18n';

import './config';
import './components';
import App from './App';
import router from './router';
import './styles/reset.css';
import './styles/border.css';
import './styles/theme.styl';
// 动态的改变font-size的值
import './styles/hotcss';
import store from './store/index';
import {RouteUtil} from './utils/routeUtil';
import './utils/TimeUtil';
import {BackHandler} from './utils/handleBack';
import GlobalPlugin from './utils/globalUtil';
import {ddApi, setVuex} from './api/dingding';
import {setMenuVuex} from "./store/modules/menu";

// 滴滴全局组件

Vue.use(Scroll);
Vue.use(Popup);
Vue.use(Rate);
// Vue.use(Style);
// Vue.use(Button);
Vue.use(Loading);
// Vue.use(Tip);
// Vue.use(Toolbar);
// Vue.use(Checkbox);
Vue.use(CheckboxGroup);
// Vue.use(Radio);
// Vue.use(Input);
// Vue.use(Textarea);
// Vue.use(Select);
Vue.use(Switch);
Vue.use(Validator);
Vue.use(Upload);
// Vue.use(Form);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(CascadePicker);
Vue.use(DatePicker);
// Vue.use(TimePicker);
// Vue.use(SegmentPicker);
// Vue.use(Dialog);
// Vue.use(ActionSheet);
// Vue.use(Drawer);
// Vue.use(Slide);
Vue.use(IndexList);
// Vue.use(Swipe);

// 初始化路由
RouteUtil.init(router);
BackHandler.init(router);
// TODO 为设置钉钉用
setVuex(store);
// TODO 为大枚举订单用
setMenuVuex(store);
// Vue.use(VueI18n);
Vue.use(GlobalPlugin);
// Vue.use(Navigation, {router});
// const i18n = new VueI18n({
//   locale: 'zh_CN'
// });

Validator.addRule('odd', (val, config) => !config || Number(val) % 2 === 1);
Validator.addMessage('odd', '请输入一个奇数.');
Validator.addRule('empty', value => value && value.trim() !== '');
Validator.addMessage('empty', '不能输入纯空格');
Validator.addRule('mobile', value => /^1\d{10}$/.test(value));
Validator.addMessage('mobile', '手机号码格式不正确');
Validator.addRule('money', value => /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value));
Validator.addMessage('money', '请输入正确金额(保留2位小数)');

Validator.addRule('amount', value => /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value));
Validator.addMessage('amount', '金额格式不正确');
Validator.addRule('phone', value => /^1\d{10}$/.test(value));
Validator.addMessage('phone', '手机号码格式不正确');
Validator.addRule('email', value => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value));
Validator.addMessage('email', '邮箱格式不正确');
Validator.addRule('account', value => /^[A-Za-z0-9]+$/.test(value));
Validator.addMessage('account', '输入格式不正确');
Validator.addRule('number', value => /^[0-9]+$/.test(value));
Validator.addMessage('number', '请输入纯数字');
// Validator.addRule('identity', value => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value));
Validator.addRule('identity', value => value && value.trim() !== '');
Validator.addMessage('identity', '请输入身份证号');
Validator.addRule('carNumber', value =>
// eslint-disable-next-line max-len
  /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(value));
Validator.addMessage('carNumber', '请输入正确的车牌号');

window.px2rem = (px) => {
  return px * 320 / 375 / 20;
};

window.px2realPx = (px) => {
  return window.REAL_FONT_SIZE * px * 320 / 375 / 20;
};

Vue.config.productionTip = false;
// Vue.use(Cube);

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    ddApi.setTitle({title: to.meta.title});
  }
  // console.log('beforeEach', to);
  if (to.matched.length === 0) {
    next({name: 'error', params: {message: '页面不存在', hideBtn: true}});
  }
  next();
});

// router.afterEach((to, from) => {
//
// });
// 自定义事件总线;
global.$eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});

