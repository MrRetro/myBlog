/**
 * User: retro.
 * Time: 2018/9/19
 */

const order = {
  namespaced: true,
  state: {
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    storeId: null, // 门店
    storeAddress: null, // 网点地址
    orderType: null, // 业务类型
    customerNo: null // 客户id
  },
  mutations: {
    setData1: (state, data) => {
      state.data1 = data;
    },
    setData2: (state, data) => {
      state.data2 = data;
    },
    setData3: (state, data) => {
      state.data3 = data;
    },
    setData4: (state, data) => {
      state.data4 = data;
    },
    setStoreId: (state, data) => {
      state.storeId = data;
    },
    setStoreAddress: (state, data) => {
      state.storeAddress = data;
    },
    setOrderType: (state, data) => {
      state.orderType = data;
    },
    setCustomerNo: (state, data) => {
      state.customerNo = data;
    },
    clearData: (state) => {
      state.data1 = null;
      state.data2 = null;
      state.data3 = null;
      state.data4 = null;
      state.storeId = null;
      state.storeAddress = null;
      state.orderType = null;
      state.customerNo = null;
    }
  },
  actions: {
    getData1: ({commit}, data) => {
      commit('setData1', data);
    },
    getData2: ({commit}, data) => {
      commit('setData2', data);
    },
    getData3: ({commit}, data) => {
      commit('setData3', data);
    },
    getData4: ({commit}, data) => {
      commit('setData4', data);
    },
    getStoreId: ({commit}, data) => {
      commit('setStoreId', data);
    },
    getStoreAddress: ({commit}, data) => {
      commit('setStoreAddress', data);
    },
    getOrderType: ({commit}, data) => {
      commit('setOrderType', data);
    },
    getCustomerNo: ({commit}, data) => {
      commit('setCustomerNo', data);
    },
    clearData: ({commit}) => {
      commit('clearData');
    }
  }
};

export default order;
