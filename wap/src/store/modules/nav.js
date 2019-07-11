/**
 * User: puti.
 * Time: 2018/5/21 上午11:01.
 */

const nav = {
  namespaced: true,
  state: {
    title: '',
    right: {},
    menus: {}
  },
  mutations: {
    setTitle(state, {title}) {
      state.title = title;
    },
    setRight: (state, right) => {
      state.right = right;
      state.menus = {};
    },
    setMenus: (state, menus) => {
      state.menus = menus;
      state.right = {};
    }
  }
};

export default nav;
