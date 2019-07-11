/**
 * User: puti.
 * Time: 2018/5/29 上午10:47.
 */
import request from '../utils/request';
import {CRM_IP, SYS_IP} from '../config';
import Templates from "../templates";


/**
 * 获取跟进目的
 * @param module
 */
export const getFollowUpPurpose = (module) => {
  return request({
    url: `${SYS_IP}/dict/${module}/child/followUpPurpose/options`,
    method: 'get',
    loading: false
  });
};

/**
 * 创建 跟进计划
 * @param plannedTime    计划时间 Example : "2018-05-18 00:00:00"
 * @param purpose        跟进目的(仅【客户端】拥有此项选项) Example : 0
 * @param remark         备注
 * @param responsibleId  负责人id
 * @param target         客户端，线索端，经纪人端的类别 0:客户端, 1:线索端, 2:经纪人端
 * @param targetIds      公共id集合(包括：客户端，线索端，经纪人端)
 * @param teamworkIds    协同人
 */
export const addFollowUpPlan = ({plannedTime, purpose, remark, responsibleId, target, targetIds, teamworkIds, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/save`,
    method: 'POST',
    data: {plannedTime, purpose, remark, responsibleId, target, targetIds, teamworkIds, ...params}
  });
};

/**
 * 获取跟进计划时间列表
 * @param test
 */
export const getFollowDateList = ({test = 'test', type = 'clue'})=>{
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/get/followUpPlans`,
    method: 'POST',
    data: {test},
    loading: false
  });
};

/**
 * 获取跟进计划时间列表通过 员工id
 * @param id
 * @param type
 * @returns {*}
 */
export const getFollowDateListById = ({id, type = 'clue', year = '2018', month = '7', day = '10'})=>{
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${id}/followUpPlanOutline/page`,
    method: 'POST',
    data: {
      'condition': {
        'year': [year],
        'month': [month],
        'day': [day]
      },
      'orders': [{
        'name': 'name'
      },
      {
        'name': 'mobile',
        'order': 'desc'
      }
      ],
      'pageNum': 1,
      'pageSize': 10

    },
    loading: false
  });
};


/**
 * 取消跟进计划
 * @param id       计划id
 * @param reason   取消原因
 */
export const cancelFollowUpPlan = ({id, reason}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${id}/cancel`,
    method: 'put',
    data: {
      reason
    }
  });
};

/**
 * 跟新跟进计划
 * @param id             计划id
 * @param plannedTime    计划时间 Example : "2018-05-18 00:00:00"
 * @param purpose        跟进目的(仅【客户端】拥有此项选项) Example : 0
 * @param remark         备注
 * @param responsibleId  负责人id
 * @param target         客户端，线索端，经纪人端的类别 0:客户端, 1:线索端, 2:经纪人端
 * @param targetIds      公共id集合(包括：客户端，线索端，经纪人端)
 * @param teamworkIds    协同人
 */
export const editFollowUpPlan = ({id, plannedTime, purpose, remark, responsibleId, target, targetId, teamworkIds}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${id}/edit`,
    method: 'put',
    data: {plannedTime, purpose, remark, responsibleId, target, targetId, teamworkIds}
  });
};

/**
 * 获取跟进计划编辑信息
 * @param id
 */
export const getFollowUpInfo = (id) =>{
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${id}/updateMsg/get`,
    method: 'GET'
  });
};


/**
 * 延期跟进计划
 * @param id             计划id
 * @param postponeTime   延期时间
 */
export const delayFollowUpPlan = ({id, postponeTime}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${id}/postpone/${postponeTime}`,
    method: 'put'
  });
};

/**
 * 跟进计划列表
 * @param type       计划对象类型['customer','clue','agent']
 * @param pageNum    页数
 * @param userId     用户id
 * @param condition  条件
 * @param orders     排序条件
 */
export const getFollowUpPlanList = ({type = 'customer', userId = '', pageNum, orders = [], condition = {}}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${userId}/followUpPlanOutline/page`,
    method: 'POST',
    data: {
      condition,
      orders,
      pageNum,
      pageSize: 10
    }
  });
};

/**
 * 获取计划概要
 * @param type              计划对象类型['customer','clue','agent']
 * @param userId            用户id
 * @param pageNum
 * @returns {AxiosPromise}
 */
export const getPlanOutline = ({type = 'customer', userId, pageNum}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${userId}/followUpPlanOutline/page`,
    method: 'POST',
    data: {
      select: ['id', 'customerNo', 'name', 'mobile', 'nickname', 'origin', 'type', 'address', 'gender', 'industry', 'remark',
        'createTime', 'updateTime', 'responsible', 'level', 'areaId', 'operation', 'followId'],
      condition: {},
      criterion: {},
      orders: [],
      pageNum,
      pageSize: 10
    }
  });
};

/**
 * 获取跟进计划列表通过日期
 * @param day               日期
 * @param month             月份
 * @param type              计划对象类型['customer','clue','agent']
 * @param year              年份
 * @returns {AxiosPromise}
 */
export const getFollowUpListByDay = ({type = 'customer', year, month, day}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${year}/${month}/${day}/followUpPlans`,
    method: 'POST'
  });
};

/**
 * 根据月份获取当月有计划当日期 --【用户id】
 * @param month
 * @param userId
 * @returns {*}
 * @param type  类型
 */
export const getFollowUpDayByMonth = ({month, userId, type}) => {
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${month}/followUpPlans`,
    method: 'POST',
    data: {
      'condition': userId ? {userId: [userId]} : {}
    }
  });
};

/**
 * 获取添加跟进计划模版
 * @returns {AxiosPromise}
 */
export const getAddFollowUpModule = ()=>{
  //TODO 修改为本地获取模板
  if (Templates['wap-followUpPlans-save']) {
    return Promise.resolve(Templates['wap-followUpPlans-save']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'GET',
  //   params: {
  //     frontUrl: '/wap/followUpPlans/save'
  //   },
  //   cacheKey: 'getAddFollowUpModule'
  // });
};

/**
 * 通过对象id获取该对象的负责人和协同人列表
 * @param id
 * @param type
 */
export const getExecutorList = ({id, type = 'customer'}) =>{
  return request({
    url: `${CRM_IP}/wap/followUpPlans/${type}/${id}/executor/list`,
    method: 'GET'
  });
};

