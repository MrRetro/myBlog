/**
 * User: puti.
 * Time: 2018/5/21 上午11:01.
 */
import axios from 'axios';
import * as LoginService from '../../api/login';
import {getUserList, getUserSubordinates} from '../../api/client';
import {getToken, setToken} from '../../utils/auth';
import {ddApi} from '../../api/dingding';
import {getDredgeCityList, getGroundStore, getProvice, getQiNiu, getResponsibleAreaList} from '../../api/common';
import QiniuUtils from '../../utils/qiniuUtil';


const user = {
  namespaced: true,
  state: {
    config: {
      corpId: ''
    },
    token: getToken(),
    // 用户位置
    location: {
      latitude: 23.676,
      longitude: 119.676
    },
    // 权限管理
    userAuths: {},
    id: '',
    name: '',
    mobile: '',
    email: null,
    avatar: '',
    pinyin: '',
    dingUserId: '',
    isTester: false,
    // 部门
    departments: [],
    // 所在部门人员
    departmentUsers: [],
    // 计划日期
    datelist: [],
    // 主管级及以下列表
    users: [],
    // dcc以及销售列表
    dccAndSalesUsers: [],
    // 省市区列表
    addressList: [],
    // 七牛token及普遍地址
    QINIU_TOKEN: '',
    QINIU_HOST: '',
    storeList: [],
    dredgeCityList: [],
    responsibleAreaList: []
  },
  mutations: {
    setUserToken: (state, token) => {
      state.token = token;
      setToken(token);
      $eventBus.$emit('tokenChange');
    },
    setLocation: (state, location) => {
      state.location = location;
    },
    setStoreList: (state, list) => {
      state.storeList = list;
    },
    setDccAndSalesUsers: (state, list) => {
      state.dccAndSalesUsers = list;
    },
    setUserInfo: (state, info) => {
      state.name = info.name;
      state.id = info.id;
      state.mobile = info.mobile;
      state.avatar = info.avatar;
      state.pinyin = info.pinyin;
      state.dingUserId = info.dingUserId;
      state.departments = info.departments;
      state.isTester = info.isTester;
    },
    changeConfig: (state, config) => {
      state.config = config;
    },
    setUsers: (state, users) => {
      state.users = users;
    },
    setDepartmentUsers: (state, users) => {
      state.departmentUsers = users;
    },
    setDredgeCityList: (state, list) => {
      state.dredgeCityList = list;
    },
    setResponsibleAreaList: (state, list) => {
      state.responsibleAreaList = list;
    },
    setAddressList: (state, list) => {
      state.addressList = list;
    },
    setUserAuths: (state, list) => {
      let auths = {};
      list.forEach(item => auths[item] = true);
      state.userAuths = auths;
    },
    setQiniuInfo: (state, info) => {
      state.QINIU_TOKEN = info.QINIU_TOKEN;
      state.QINIU_HOST = info.QINIU_HOST;
    }
  },
  getters: {
    // 是否是主管
    isLeader: state => {
      return state.departments.filter(item => item.isLeader).length !== 0;
    }
  },
  actions: {
    getDingDingUserInfo: ({dispatch, state}, code) => {
      return new Promise((resolve, reject) => {
        if (code) {
          resolve(dispatch('handleLogin', code));
          return;
        }
        if (!dd.version) {
          reject({code: -1, message: '获取钉钉用户信息失败,请在钉钉环境运行此项目'});
        }
        ddApi.getUserInfo({
          corpId: state.config.corpId,
          onSuccess: (info) => {
            resolve(dispatch('handleLogin', info.emplId));
          },
          onFail: (err) => {
            reject({message: '钉钉获取用户信息失败', error: err});
          }
        });
      });
    },
    /**
     * 调用自身登录获取token
     * @param commit
     * @param code    钉钉的id
     * @returns {Promise<*>}
     * @param dispatch
     */
    handleLogin: async ({commit, dispatch}, code) => {
      try {
        let time = Date.now();
        const result = await LoginService.getUserInfo(code);
        console.log('获取用户信息时间', Date.now() - time);
        commit('setUserInfo', result);
        localStorage.setItem('userInfo', JSON.stringify(result));
        await dispatch('getToken', {mobile: result.mobile, password: result.dingUserId});
        console.log('登录总时间', Date.now() - time);
        return true;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getToken: async ({commit, dispatch}, {mobile, password}) => {
      try {
        const tokenData = await LoginService.getToken(mobile, password);
        commit('setUserToken', tokenData.data.access_token);
        let data = Date.now();
        // dispatch('getAddressList');
        dispatch('menu/syncMenuData', null, {root: true});
        dispatch('getUsers');
        dispatch('getResponsibleAreaList');
        dispatch('getQiniuInfo');
        dispatch('getLocation');
        dispatch('getStoreList');
        await dispatch('getAllAuths');
        console.log('响应时间', Date.now() - data);
        return true;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // // 登出
    // handleLogout({commit}) {
    //   return new Promise((resolve) => {
    //     commit('setUserToken', '');
    //     commit('setUserRoles', []);
    //     removeToken();
    //     resolve();
    //   });
    // },
    // // 前端 登出
    // clearUserToken({commit}) {
    //   return new Promise(resolve => {
    //     commit('setUserToken', '');
    //     removeToken();
    //     localStorage.removeItem('userInfo');
    //     resolve();
    //   });
    // },
    /**
     * 获取当前位置
     * @param commit
     * @returns {Promise<any>}
     */
    getLocation({commit}) {
      return new Promise((resolve) => {
        ddApi.getLocation({
          onSuccess: ({longitude, latitude, accuracy, address, province, city, district, road, errorMessage, errorCode}) => {
            console.log('getLocation', accuracy, address, province, city, district, road, errorMessage, errorCode);
            commit('setLocation', {longitude, latitude});
            resolve();
          }
        });
      });
    },
    async getUsers({commit, state}) {
      const res = await axios.all([getUserSubordinates(state.id), getUserList({
        id: state.id,
        type: 'deptAndChildren'
      })]);
      commit('setUsers', res[0]);
      commit('setDepartmentUsers', res[1]);
    },
    async getDccAndSalesUsers({commit, state}) {
      if (state.dccAndSalesUsers.length !== 0) {
        return state.dccAndSalesUsers;
      }
      try {
        const list = await getUserSubordinates(state.id, ['sales', 'DCC', 'city_manager_and_sales']);
        commit('setDccAndSalesUsers', list);
        return list;
      } catch (e) {
        return [];
      }
    },
    getAddressList({commit}) {
      return getProvice().then((res) => {
        let dataArea = res.map((item) => {
          return {
            text: item.name,
            value: item.code,
            children: item.childrenList && item.childrenList.map((city) => {
              return {
                province: item.name,
                text: city.name,
                value: city.code,
                children: city.childrenList && city.childrenList.map((area) => {
                  return {
                    city: city.name,
                    text: area.name,
                    value: area.code
                  };
                })
              };
            })
          };
        });
        return commit('setAddressList', dataArea);
      });
    },
    getDredgeCityList({commit}) {
      return getDredgeCityList().then(res => {
        commit('setDredgeCityList', res);
      });
    },
    getResponsibleAreaList({commit}) {
      return getResponsibleAreaList().then(res => {
        commit('setResponsibleAreaList', res);
      });
    },
    /**
     * 获取用户权限列表
     * @param commit
     * @param userId
     * @returns {*}
     */
    getAllAuths({commit, state}) {
      return LoginService.getAllAuths(state.id).then(res => {
        return commit('setUserAuths', res);
      });
    },
    getStoreList({commit}) {
      return getGroundStore().then(res => {
        commit('setStoreList', res);
      });
    },
    getQiniuInfo({commit}) {
      getQiNiu()
        .then(res => {
          if (res) {
            let info = {};
            console.log(res);

            let qiniu = {
              Bucket: res.bucket,
              AK: res.accessKey,
              SK: res.secretKey,
              HOST: res.realmName + res.path
            };

            info.QINIU_HOST = res.realmName;
            info.QINIU_TOKEN = QiniuUtils.genUploadToken('erp', qiniu);

            commit('setQiniuInfo', info);
          }
        })
        .catch(err => console.log(err));
    }
  }
};

export default user;
