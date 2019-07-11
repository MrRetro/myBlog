/**
 * User: retro.
 * Time: 2018/6/4
 */

import request from '../utils/request';
import {SYS_IP, CRM_IP, BASE_IP, ERP_IP} from '../config';
import Templates from '../templates';

/**
 * 根据id获取合同订单列表
 * @param pageNum  页数
 * @param type     类型    enum (customers,agents)
 */
export const getOrderList = ({id, type}) => {
  let condition = {
    isPage: [false]
  };
  if (type === 'agents') {
    condition.brokerId = [id];
  } else if (type === 'clues') {
    condition.clueId = [id];
  } else {
    condition.customerId = [id];
  }
  condition.fastScreening = [-1];

  return request({
    url: `${CRM_IP}/wap/order/page`,
    method: 'POST',
    data: {
      select: ['status', 'orderNo', 'receiptsNo', 'orderContractStatus', 'carName', 'areaName', 'orderType', 'belongStoreId',
        'name', 'createTime', 'updateTime', 'deliveryTime', 'finishTime', 'principal'],
      condition
    }
  });
};


/**
 * 添加订单步骤一
 * @param name      姓名
 * @param mobile    手机
 * @param gender    性别
 * @param params    其他
 */
export const addOrderOne = ({name, mobile, gender, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/customerfororder`,
    method: 'POST',
    data: {name, mobile, gender, ...params}
  });
};

/**
 * 覆盖订单用户
 * @param name
 * @param mobile
 * @param gender
 * @param params
 */
export const coverOrderUser = ({name, mobile, gender, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/customerfororder`,
    method: 'PUT',
    data: {name, mobile, gender, ...params}
  });
};

/**
 * 添加订单信息
 * @param address     订单地址
 * @param areaId      订单地区
 * @param gender      订单性别
 * @param industry    订单行业
 * @param level       订单等级
 * @param mobile      订单手机
 * @param name        订单姓名
 * @param nickname    订单昵称
 * @param origin      订单来源
 * @param remark      订单备注
 * @param type        订单类型
 * @param params      其他
 */
export const addOrderInfo = ({address, areaId, gender, industry, level, mobile, name, nickname, origin, remark, type, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/order`,
    // url: 'http://result.eolinker.com/G3NQtK270e5ea1e75a46958f88f0f7089999fd3f0cc61e0?uri=/order/add',
    method: 'POST',
    data: {address, areaId, gender, industry, level, mobile, name, nickname, origin, remark, type, ...params},
    loading: true
  });
};


/**
 * 获取编辑合同信息
 * @param id    订单id
 * @param type  操作类型 0:添加操作,1:修改操作
 */
export const getEditOrderInfo = (id, type = 1) => {
  return request({
    url: `${CRM_IP}/wap/order/operation`,
    method: 'POST',
    data: {id, type}
  });
};


/**
 * 编辑订单信息
 * @param orderId     订单id
 * @param address     订单地址
 * @param areaId      订单地区
 * @param gender      订单性别
 * @param industry    订单行业
 * @param level       订单等级
 * @param mobile      订单手机
 * @param name        订单姓名
 * @param nickname    订单昵称
 * @param origin      订单来源
 * @param remark      订单备注
 * @param type        订单类型
 * @param params      其他
 */
export const editOrderInfo = ({orderId, address, areaId, gender, industry, level, mobile, name, customerId, origin, remark, type, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/order/${orderId}`,
    method: 'PUT',
    data: {address, areaId, gender, industry, level, mobile, name, customerId, origin, remark, type, ...params},
    loading: true
  });
};


/**
 * 转交订单
 * @param id                订单ID
 * @param responsibleId     负责人ID
 * @returns {AxiosPromise}
 */
export const transferOrder = ({id, responsibleId}) => {
  return request({
    url: `${CRM_IP}/wap/order/${id}/allocation`,
    method: 'PUT',
    data: {
      responsibleId
    }
  });
};


/**
 * 获取添加订单模版
 * @returns {AxiosPromise}
 */
export const getAddOrderModule = () => {
  //TODO 修改为本地获取模板
  if (Templates['crm-wap-order-create']) {
    return Promise.resolve(Templates['crm-wap-order-create']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'get',
  //   params: {
  //     frontUrl: '/crm/wap/order/create'
  //   },
  //   cacheKey: 'getAddOrderModule'
  // });
};


/**
 * 确认合同
 * @param orderId
 */
export const affirmOrder = (orderId) => {
  return request({
    url: `${CRM_IP}/wap/order/validateContract/${orderId}`,
    method: 'put'
  });
};


/**
 * 获取门店信息通过负责人Id
 * @param userId
 */
export const getStoresByUserId = (userId) => {
  return request({
    url: `${CRM_IP}/wap/order/${userId}/stores`,
    method: 'get',
    loading: false
  });
};

/**
 * 获取合同编号
 */
export const getOrderNo = ()=>{
  return request({
    url: `${BASE_IP}/num/generateAgreement`,
    method: 'POST'
  });
};

/**
 * 获取授权代表
 */
export const getWarrant = ({storeId, orderType, userId, ...params})=>{
  return request({
    url: `${BASE_IP}/groundStore/cityManager`,
    method: 'POST',
    data: {storeId, orderType, userId, ...params}
  });
};

/**
 * 获取上级主管
 */
export const getUsers = ({id, type = 'selfAndAllUpper', ...params})=>{
  return request({
    url: `${SYS_IP}/wap/users/relation/${id}/${type}`,
    method: 'GET',
    data: {id, type, ...params}
  });
};
/**
 * 判断是否走电子合同
 * */
export const getIsExecute = (orderType)=>{
  return request({
    // url: `http://devzuul.erp.itsmycar.cn/v1-2-6/crm/contract/isExecute/${orderType}`,
    url: `${CRM_IP}/contract/isExecute/${orderType}`,
    method: 'GET',
    loading: false
  });
};
/**
 * 完成签约
 * @param contractId   合同id
 * @return {*}
 */
export const completeSigning = (contractId)=>{
  return request({
    url: `${CRM_IP}/contract/completeSigning/${contractId}`,
    method: 'POST',
    data: {}
  });
};
/**
 * 发送给客户签合约短信
 * @param orderContractId   合同id
 * @return {*}
 */
export const sendMsg = (orderContractId)=>{
  return request({
    url: `${CRM_IP}/contract/sendMsg`,
    method: 'POST',
    data: {orderContractId}
  });
};
// 获取业务类型
export function getOrderType({id}) {
  return request({
    url: `${CRM_IP}/wap/order/enum/orderType/${id}`,
    loading: false
  });
}

// 获取订单来源枚举
export function getOrderSourse({clueId, orderType}) {
  return request({
    url: `${CRM_IP}/wap/order/enum/orderSource`,
    method: 'POST',
    loading: false,
    data: {clueId, orderType}
  });
}
// 获取客户签名
export function getSignature(contractId) {
  return request({
    url: `${CRM_IP}/contract/signature/${contractId}`,
    loading: false
  });
}

// 通过客户id获取是否存在线索
export const getClueByCustomerId = ({id}) => {
  return request({
    url: `${CRM_IP}/wap/contract/clue/${id}`,
    method: 'GET'
  });
};


/**
 * 获取添加订单模版
 * @returns {AxiosPromise}
 */
export const getAddOrderFinishModule = () => {
  //TODO 修改为本地获取模板
  if (Templates['crm-order-finish-car']) {
    return Promise.resolve(Templates['crm-order-finish-car']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'get',
  //   params: {
  //     frontUrl: '/crm/order/finish/car'
  //   }
  // });
};

// 获取发车地址、到达地址-完成提成
export const getFinishAddress = ({orderId}) => {
  return request({
    url: `${ERP_IP}/orderCar/demand/${orderId}/orderCar/demand/efficient`,
    method: 'GET'
  });
};

// 完成提成
export const createFinishCar = ({orderId, vin, carInspectionPhoto}) => {
  return request({
    url: `${CRM_IP}/wap/order/deliveryCar/${orderId}`,
    method: 'POST',
    data: {vin, carInspectionPhoto}
  });
};
