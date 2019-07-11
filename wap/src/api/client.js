/**
 * User: retro.
 * Time: 2018/6/4
 */

import request from '../utils/request';
import {SYS_IP, CRM_IP} from '../config';
import Templates from '../templates';

/**
 * 添加客户信息
 * @param address   客户地址
 * @param areaId    客户地区
 * @param gender    客户性别
 * @param industry  客户行业
 * @param level     客户等级
 * @param mobile    客户手机
 * @param name      客户姓名
 * @param nickname  客户昵称
 * @param origin    客户来源
 * @param remark    客户备注
 * @param type      客户备注
 * @param sub       其他
 * @returns {AxiosPromise}
 */
export const addCustomersInfo = ({address, areaId, gender, industry, level, mobile, name, nickname, origin, remark, type, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/customers`,
    method: 'POST',
    data: {address, area: areaId, gender, industry, level, mobile, name, nickname, origin, remark, type, ...params}
  });
};


/**
 * 获取客户编辑信息
 * @param id    客户id
 */
export const getClientEditInfo = (id) => {
  return request({
    url: `${CRM_IP}/wap/customers/${id}/get`,
    method: 'GET'
  });
};

/**
 * 客户信息 (用于编辑)
 * @param id    客户id
 */
export const editClientInfo = ({id, address, area, gender, industry, level, mobile, name, origin, remark, type, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/customers/${id}`,
    method: 'PUT',
    data: {address, area, gender, industry, level, mobile, name, origin, remark, type, ...params}
  });
};

/**
 * 获取添加客户模版
 * @returns {AxiosPromise}
 */
export const getAddClientModule = ()=>{
  //TODO 修改为本地获取模板
  if (Templates['wap-customer']) {
    return Promise.resolve(Templates['wap-customer']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'GET',
  //   params: {
  //     frontUrl: '/wap/customer'
  //   },
  //   cacheKey: 'getAddClientModule'
  // });
};

/**
 * 获取编辑信息客户模版
 * @returns {AxiosPromise}
 */
export const getAddClientEditInfoModule = ()=>{
  //TODO 修改为本地获取模板
  if (Templates['wap-work-info-edit']) {
    return Promise.resolve(Templates['wap-work-info-edit']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'GET',
  //   params: {
  //     frontUrl: '/wap/work/info/edit'
  //   },
  //   cacheKey: 'getAddClientModule'
  // });
};

/**
 * 获取客户所有银行卡
 * @returns {AxiosPromise}
 */
export const getClientCardsById = ({userId})=>{
  return request({
    url: `${SYS_IP}/wechat/users/${userId}/bankCards`,
    method: 'GET'
  });
};

/**
 * 添加银行卡
 * @returns {AxiosPromise}
 */
export const addClientCard = ({userId, bankOfDeposit, cardNo, cardholder})=>{
  return request({
    url: `${SYS_IP}/wap/userBank/users/${userId}/bankCards`,
    method: 'POST',
    data: {
      bankOfDeposit, cardNo, cardholder
    }
  });
};

/**
 * 修改银行卡
 * @returns {AxiosPromise}
 */
export const editClientCard = ({userId, cardId, bankOfDeposit, cardNo, cardholder})=>{
  return request({
    url: `${SYS_IP}/wap/userBank/users/${userId}/bankCards/${cardId}`,
    method: 'PUT',
    data: {
      bankOfDeposit, cardNo, cardholder
    }
  });
};

/**
 * 获取用户上下级列表
 * @param id
 * @param type
 * @returns {*}
 */
export const getUserList = ({id, type = 'selfAndAllLower'})=>{
  return request({
    url: `${SYS_IP}/wap/users/relation/${id}/${type}`,
    method: 'GET',
    loading: false
  });
};

/**
 * 根据用户的数据等级获取下属数据
 * @param id
 * @returns {*}
 * @param type 数据过滤 sales(限制销售) ground_promotion(限制地推)
 */
export const getUserSubordinates = (id, type)=>{
  if (Array.isArray(type)) {
    let query = type.join('&roleLabels=');
    return request({
      url: `${SYS_IP}/wap/users/${id}/dataLevelUsers/views?roleLabels=${query}`,
      loading: false
    });
  }
  return request({
    url: `${SYS_IP}/wap/users/${id}/dataLevelUsers/views`,
    loading: false,
    params: type ? {roleLabels: type} : null
  });
};

