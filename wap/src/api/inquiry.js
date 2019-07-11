/**
 * User: retro.
 * Time: 2018/8/2
 */


import {SYS_IP, CRM_IP} from '../config';
import request from '../utils/request';
import Templates from '../templates';

/**
 * 添加询价信息
 * @param clueId                关联线索
 * @param customerType          客户类型
 * @param areaId                上牌地址
 * @param estimateObtainTime    预计提车时间
 * @param billingDemand         开票价要求
 * @param billingTime           开票时间要求
 * @param demand                其他需求
 * @param params
 */
export const addInquiryInfo = ({clueId, customerType, areaId, estimateObtainTime, billingDemand, billingTime, demand, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/save`,
    method: 'POST',
    data: {clueId, customerType, areaId, estimateObtainTime, billingDemand, billingTime, demand, ...params},
    loading: true
  });
};

/**
 * 编辑询价信息
 * @param id                    询价id
 * @param clueId                关联线索
 * @param customerType          客户类型
 * @param areaId                上牌地址
 * @param estimateObtainTime    预计提车时间
 * @param billingDemand         开票价要求
 * @param billingTime           开票时间要求
 * @param demand                其他需求
 * @param params
 */
export const editInquiryInfo = ({id, clueId, customerType, areaId, estimateObtainTime, billingDemand, billingTime, demand, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${id}/edit`,
    method: 'PUT',
    data: {clueId, customerType, areaId, estimateObtainTime, billingDemand, billingTime, demand, ...params}
  });
};

/**
 * 获取编辑询价信息
 * @param id    订单id
 * @param type  操作类型 0:添加操作,1:修改操作
 */
export const getEditInquiryInfo = (id) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${id}/updateMsg/get`,
    // url: 'http://result.eolinker.com/G3NQtK270e5ea1e75a46958f88f0f7089999fd3f0cc61e0?uri=/wap/enquiryPrices/{id}/updateMsg/get',
    method: 'GET'
  });
};

/**
 * 获取添加询价模版
 * @returns {AxiosPromise}
 */
export const getAddInquiryModule = () => {
  //TODO 修改为本地获取模板
  if (Templates['wap-inquiry-all']) {
    return Promise.resolve(Templates['wap-inquiry-all']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'get',
  //   params: {
  //     frontUrl: '/wap/inquiry/all'
  //   },
  //   cacheKey: 'getAddOrderModule'
  // });
};

/**
 * 添加报价信息
 * @param obj      添加字段集
 * resourceLocation,
   quotedPrice,
   trafficPrice,
   procedureTracks,
   deliveryTime,
   productionTime,
   insuranceType,
   invoicePrice,
   invoiceType,
   resourceAreaCode
 */
export const addQuotedInfo = ({id, obj = []}) => {
  return request({
    url: `${CRM_IP}/wap/quotedRecords/${id}/save`,
    method: 'POST',
    data: obj
  });
};

/**
 * 获取添加报价模版
 * @returns {AxiosPromise}
 */
export const getAddQuetedModule = () => {
  //TODO 修改为本地获取模板
  if (Templates['wap-crm-quoted-add']) {
    return Promise.resolve(Templates['wap-crm-quoted-add']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'get',
  //   params: {
  //     frontUrl: '/wap/crm/quoted/add'
  //   },
  //   cacheKey: 'getAddOrderModule'
  // });
};

/**
 * 取消询价
 * @param id
 * @param cancelReason  取消理由
 */
export const cancelEnquiryPrice = ({id, cancelReason}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${id}/cancel`,
    method: 'put',
    data: {cancelReason}
  });
};

/**
 * 报价记录详情
 * @param id
 */
export const getQuotedRecordsDetail = (id) => {
  return request({
    url: `${CRM_IP}/wap/quotedRecords/${id}/get/recordId`
  });
};
