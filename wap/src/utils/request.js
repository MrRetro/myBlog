import axios from 'axios';
import {getToken} from './auth';
import {AlertUtil} from './AlertUtil';


const TokenName = 'access_token';

// 创建axios实例
const service = axios.create({
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      const url = config.url;
      let newurl = '';
      if (url.indexOf('?') !== -1) {
        newurl = `${url}&${TokenName}=${getToken()}`;
      } else {
        newurl = `${url}?${TokenName}=${getToken()}`;
      }
      config.url = newurl;
    }
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.data = config.data || {};// 解决axios POST请求没有带参数时Content-Type不会设置上的bug
    if (config.loading !== false) {
      AlertUtil.showLoading();
    }
    return config;
  }, error => {
    console.log('Request拦截器Error ==>', error.code);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    AlertUtil.hideLoading();
    if (
      response.status === 200 &&
      response.data.code === 200 ||
      response.data.code === 10101001 ||
      response.data.code === 1005010017 ||
      response.data.code === 1005010018 ||
      response.data.code === 1005010019
    ) {
      if (
        response.data.code === 10101001 ||
        response.data.code === 1005010017 ||
        response.data.code === 1005010018 ||
        response.data.code === 1005010019

      ) {
        return response.data;
      }
      return response.data.data;
    }
    if (response.data.details) {
      AlertUtil.showToast({txt: Object.values(response.data.details)[0], type: 'error'});
    } else {
      AlertUtil.showToast({txt: response.data.message, type: 'error'});
    }
    return Promise.reject(response.data);
  },
  error => {
    setInterval(()=>{
      AlertUtil.hideLoading();
    }, 200);
    if (error.code && error.code === 'ECONNABORTED') {
      AlertUtil.showToast({txt: '接口请求超时', type: 'error'});
      return Promise.reject({code: 408, message: '接口请求超时'});
    }
    if (error.response) {
      AlertUtil.showToast({txt: '接口请求失败', type: 'error'});
      switch (error.response.status) {
        case 401:
          // RouteUtil.error({message: '无效的token'});
          return Promise.reject({code: 401, message: 'token失效'});
        case 404:
          return Promise.reject({code: 404, message: '服务器资源请求失败'});
        default:
          return Promise.reject({code: error.response.status, message: '接口请求失败'});
      }
    }
    AlertUtil.showToast({txt: '发生未知错误', type: 'error'});
    return Promise.reject({code: -1, message: '发生未知错误'});
  }
);

export default function (params) {
  // 根据缓存
  // if (params.cacheKey && PROD) {
  //   // if (params.cacheKey) {
  //   let localStr = localStorage.getItem(params.cacheKey);
  //   if (localStr) {
  //     let value = JSON.parse(localStr);
  //     // 一天内免更新
  //     if (Date.now() - value.updateTime < 1000 * 60 * 60 * 24) {
  //       return Promise.resolve(value.value);
  //     }
  //   }
  //   return service(params).then(res => {
  //     try {
  //       localStorage.setItem(params.cacheKey, JSON.stringify({updateTime: Date.now(), value: res}));
  //     } catch (e) {
  //       console.log('超出大小限制');
  //     }
  //     return res;
  //   });
  // }
  let time = Date.now();
  console.log(`HTTP:${params.url}开始请求`, time);
  return service(params).then(res=>{
    console.log(`HTTP:${params.url}请求结束`, Date.now() - time);
    return res;
  });
}
