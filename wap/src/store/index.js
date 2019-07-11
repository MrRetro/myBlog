/**
 * User: puti.
 * Time: 2018/5/17 下午5:41.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import user from './modules/user';
import nav from './modules/nav';
import menu from './modules/menu';
import order from './modules/order';


Vue.use(Vuex);
const subscribeStore = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    console.log('subscribeStore', mutation, JSON.parse(JSON.stringify(state)));
  });
};
const store = new Vuex.Store({
  plugins: [subscribeStore, createLogger({
    collapsed: true, // 自动展开记录的 mutation false 展开 true 闭合
    // filter(mutation, stateBefore, stateAfter) {
    //   // 若 mutation 需要被记录，就让它返回 true 即可
    //   // 顺便，`mutation` 是个 { type, payload } 对象
    //   return mutation.type !== 'aBlacklistedMutation';
    // },
    // transformer(state) {
    //   // 在开始记录之前转换状态
    //   // 例如，只返回指定的子树
    //   return state.subTree;
    // },
    // mutationTransformer(mutation) {
    //   // mutation 按照 { type, payload } 格式记录
    //   // 我们可以按任意方式格式化
    //   return mutation.type;
    // },
    logger: console // 自定义 console 实现，默认为 `console`
  })],
  modules: {
    user,
    nav,
    menu,
    order
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store;
