/**
 * User: puti.
 * Time: 2018/6/11 下午4:08.
 */


import {CRM_IP, BASE_IP, SYS_IP} from '../config';
import request from '../utils/request';
import user from '../store/modules/user';

const customersField = ['customerNo', 'name', 'followId', 'mobile', 'nickname', 'origin', 'type', 'level', 'responsible',
  'area', 'gender', 'industry', 'createTime', 'address', 'updateTime', 'remark', 'lastFollowUpTime', 'nextFollowUpTime', 'obtainTime', 'hasFollow'];
const agentsField = ['sales','agentNo', 'gender', 'name', 'followId', 'level', 'mobile', 'latitude', 'longitude', 'nickname', 'category',
  'origin', 'type', 'lastFollowUpTime', 'nextFollowUpTime', 'obtainTime', 'followUpStatus', 'lastActiveTime',
  'address', 'industry', 'createTime', 'updateTime', 'responsible', 'areaId', 'remark', 'hasFollow'];
const cluesField = ['clueNo', 'followId', 'name', 'record', 'mobile', 'intentionType', 'gender', 'responsibleId',
  'responsibleName', 'vehicleModelId', 'intentionGrade', 'carName', 'carStructure', 'customerId', 'displacement',
  'fuel', 'shoppingWay', 'speedChangingBox', 'driveMode', 'nationality', 'additionalConfiguration', 'priceRange',
  'carDoorNumber', 'seating', 'appearance', 'interior', 'belongPlaceId', 'type', 'source', 'status', 'getClueTime',
  'failTime', 'lastFollowUpTime', 'nextFollowUpTime', 'createTime', 'estimatedPurchaseTime', 'remark', 'belongStoreId',
  'hasFollowUpRecord', 'hasFollow', 'toStoreClue', 'coupon'];
const selectField = {
  customers: {
    all: customersField,
    follow: customersField,
    sea: customersField
  },
  agents: {
    all: agentsField,
    follow: agentsField,
    sea: agentsField
  },
  clues: {
    all: cluesField,
    follow: cluesField,
    sea: cluesField,
    invalid: cluesField
  },
  followUpRecords: {
    customer: ['way', 'operation', 'record', 'operatorName', 'responsibleName', 'targetName', 'targetNickname', 'targetMobile', 'targetLevel', 'executionTime'],
    clue: ['way', 'operation', 'record', 'operatorName', 'responsibleName', 'targetName', 'model', 'targetMobile', 'targetLevel', 'executionTime'],
    agent: ['gender', 'way', 'operation', 'record', 'operatorName', 'responsibleName', 'targetName', 'targetNickname',
      'targetMobile', 'targetLevel', 'executionTime']
  },
  followUpPlans: {
    customer: ['noNumber', 'targetName', 'isRecord', 'planName', 'responsibleName', 'purpose', 'plannedTime', 'status', 'targetLevel', 'actualTime'],
    clue: ['noNumber', 'targetName', 'isRecord', 'planName', 'responsibleName', 'purpose', 'plannedTime', 'status', 'targetLevel', 'actualTime'],
    agent: ['noNumber', 'targetName', 'isRecord', 'planName', 'responsibleName', 'purpose', 'plannedTime', 'status', 'targetLevel', 'actualTime']
  },
  order: ['status', 'orderNo', 'receiptsNo', 'orderContractStatus', 'carName', 'areaName', 'orderType', 'belongStoreId',
    'name', 'createTime', 'updateTime', 'deliveryTime', 'finishTime', 'responsibleId', 'responsibleName', 'principal']
};
/**
 * 通用列表页面
 * @param pageNum  页数
 * @param type     类型    enum (all, follow, sea, invalid,customer,clue,agent)
 * @param condition 筛选条件
 * @param module  模块    enum (customers, agents, clues, followUpRecords,order)
 * @param orders  排序条件
 * @return {Promise<{content: *[], totalElements: number}>}
 * @param loading 是否显示加载
 */
export const getSearchList = ({pageNum, type = 'all', module = 'customers', condition = {}, orders = [], loading = false}) => {
  let url = null;
  let select = null;
  if (module === 'delivery') module = 'order';
  if (module === 'order' || module === 'enquiryPrices' || module === 'quotedPrices' || module === 'quotedRecords') {
    url = `${CRM_IP}/wap/${module}/page`;
    select = selectField[module];
  } else {
    url = `${CRM_IP}/wap/${module}/${type}`;
    select = selectField[module][type];
  }
  if (module === 'enquiryPrices' || module === 'quotedPrices' || module === 'quotedRecords') {
    select = [];
  }
  // 当选择经纪人的时候 传入当前坐标数据
  if (module === 'agents') {
    const {latitude, longitude} = user.state.location;
    condition.curLongitude = [`${longitude}`];
    condition.curLatitude = [`${latitude}`];
  }
  return request({
    url,
    method: 'POST',
    loading,
    data: {
      select,
      condition,
      pageNum,
      orders,
      pageSize: 10
    }
  });
};


/**
 * 获取附近经纪人
 * @param condition
 * @param orders
 */
export const getNearAgent = ({condition = {}, orders = []}) => {
  let select = selectField.agents.all;
  // 当选择经纪人的时候 传入当前坐标数据
  return request({
    url: `${CRM_IP}/wap/agents/all`,
    method: 'POST',
    data: {
      select,
      condition,
      orders,
      pageNum: 1,
      pageSize: 100
    }
  });
};


/**
 * 跟进记录列表
 * @param pageNum  页数
 * @param type     类型    enum (customer, clue, agent)
 * @param condition 筛选条件
 * @param module  模块
 */
export const getFollowUpRecordsList = ({pageNum, type = 'customer', module = 'followUpRecords', condition = {}, loading = false}) => {
  if (condition.intentionGrade) {
    condition.level = condition.intentionGrade;
    delete condition.intentionGrade;
  }
  return request({
    url: `${CRM_IP}/wap/${module}/${type}/page`,
    method: 'POST',
    loading,
    data: {
      condition,
      pageNum,
      pageSize: 10
    }
  });
};


/**
 * 详情页面
 * @param id     id
 * @param module 模块
 */
export const getDetail = ({module, id}) => {
  if (module === 'delivery') module = 'order';
  if (module === 'enquiryPrices' || module === 'quotedPrices') {
    return request({url: `${CRM_IP}/wap/${module}/${id}/detail`, loading: false});
  }
  if (module === 'followUpPlans') {
    return request({url: `${CRM_IP}/wap/followUpPlans/${id}/get`, loading: false});
  }
  if (module === 'clues') {
    module = 'clueinfo';
  }
  return request({
    url: `${CRM_IP}/wap/${module}/${id}`,
    loading: false
  });
};


/**
 * 负责人转交
 * @param id             用户id
 * @param responsibleId  负责人id
 * @param module         模块
 */
export const responsibleCareOf = ({id, responsibleId, module, tag}) => {
  if (module === 'order') {
    return request({
      url: `${CRM_IP}/wap/order/responsible/${id}`,
      method: 'put',
      data: {
        responsibleId
      }
    });
  }
  if (module === 'clues') {
    return request({
      url: `${CRM_IP}/wap/clue/responsible`,
      method: 'post',
      data: {
        id,
        responsibleId
      }
    });
  }
  if (module === 'agents' && tag === 'sale') {
    return request({
      url: `${CRM_IP}/wap/${module}/${id}/${responsibleId}/assignsales`,
      method: 'put'
    });
  }
  return request({
    url: `${CRM_IP}/wap/${module}/${id}/${responsibleId}/careOf`,
    method: 'put'
  });
};

// 转交销售理由
export const reasonCareOf = ({reason, id, ids, module, tag}) => {
  if (module === 'agents' && tag === 'sale') {
    return request({
      url: `${CRM_IP}/wap/agents/designate/sales`,
      method: 'put',
      data: {
        ids,
        'salesId': id,
        'level': 'S',
        saleAllocationReason: reason
      }
    });
  }
};


/**
 * 添加协同人
 * @param id          客户id
 * @param teamworkIds 协同人列表
 * @param module      模块
 */
export const addTeamworkMan = ({id, teamworkIds, module}) => {
  let url = `${CRM_IP}/wap/${module}/teamworkMan/${id}/add`;
  let body = {
    teamworkIds
  };
  if (module === 'clues') {
    url = `${CRM_IP}/wap/clue/temwork`;
    return request({
      url,
      method: 'post',
      data: {
        isAdd: true,
        id,
        teamworkIds
      }
    });
  }
  return request({
    url,
    method: 'PUT',
    data: body
  });
};

/**
 * 删除协同人
 * @param id             用户id
 * @param responsibleId  负责人id
 * @param module         模块
 */
export const deleteTeamworkMan = ({id, teamworkId, module}) => {
  if (module === 'clues') {
    return request({
      url: `${CRM_IP}/wap/clue/temwork`,
      method: 'post',
      data: {
        isAdd: false,
        id,
        teamworkIds: [teamworkId]
      }
    });
  }
  return request({
    url: `${CRM_IP}/wap/${module}/teamworkMan/${id}/${teamworkId}/delete`,
    method: 'DELETE'
  });
};

/**
 * 捞取人员
 * @param id     id
 * @param module 模块
 */
export const obtainPerson = ({id, module}) => {
  if (module === 'clues') {
    return request({
      url: `${CRM_IP}/wap/gainclues`,
      method: 'put',
      data: {
        clueIds: [id]
      }
    });
  }
  let postfix = '';
  let method = 'put';
  switch (module) {
    case 'agents':
      module = 'agent';
      postfix = 'fishFor';
      break;
    case 'customers':
      method = 'put';
      postfix = 'fishFor';
      break;
    default:
      break;
  }
  return request({
    url: `${CRM_IP}/wap/${module}/${id}/${postfix}`,
    method
  });
};
/**
 * 分配人员
 * @param id     id
 * @param module 模块
 * @param responsibleId 经纪人id
 */
export const allocationPerson = ({id, responsibleId, module}) => {
  if (module === 'clues') {
    return request({
      url: `${CRM_IP}/wap/clues/batch`,
      method: 'post',
      data: {
        clueIds: [id],
        responsibleId
      }
    });
  }
  return request({
    url: `${CRM_IP}/wap/${module}/${id}/${responsibleId}/allocation`,
    method: 'put'
  });
};
/**
 * 添加跟进记录
 * @param nextExecutionTime  下次跟进时间
 * @param way                跟进方式 enum ([0, 1, 2, 3])
 * @param target             客户端，线索端，经纪人端的类别 0:客户端, 1:线索端, 2:经纪人端
 * @param targetId           对象id
 * @param purpose            跟进目的
 * @param record             跟进记录
 * @param planId             跟进计划ID
 * @param location           地理位置
 * @param clueLevel          线索等级【仅线索使用】【Z(0, ''), H(1, '每天进行回访'), A(2, '每三天进行回访'), B(3,'每十五天进行回访'), C(4,'每三十天进行回访')】
 */
export const saveFollowUpRecord = ({nextExecutionTime, way, target, targetId, purpose, record, planId, location, clueLevel}) => {
  return request({
    url: `${CRM_IP}/wap/followUpRecords/save`,
    method: 'post',
    data: {
      nextExecutionTime, way, target, targetId, purpose, record, planId, location, clueLevel
    }
  });
};

/**
 * 更新跟进记录
 * @param nextExecutionTime  下次跟进时间
 * @param way                跟进方式 enum ([0, 1, 2, 3])
 * @param target             客户端，线索端，经纪人端的类别 0:客户端, 1:线索端, 2:经纪人端
 * @param targetId           对象id
 * @param purpose            跟进目的
 * @param record             跟进记录
 * @param planId             跟进计划ID
 * @param location           地理位置
 * @param id                 跟进记录id
 * @param clueLevel          线索等级【仅线索使用】【Z(0, ''), H(1, '每天进行回访'), A(2, '每三天进行回访'), B(3,'每十五天进行回访'), C(4,'每三十天进行回访')】
 */
export const updateFollowUpRecord = ({nextExecutionTime, way, target, targetId, purpose, record, planId, location, id, clueLevel}) => {
  return request({
    url: `${CRM_IP}/wap/followUpRecords/update`,
    method: 'put',
    data: {
      nextExecutionTime, way, target, targetId, purpose, record, planId, location, id, clueLevel
    }
  });
};

/**
 * 获取所要更新记录的信息
 * @param id    id
 */
export const getFollowUpRecord = (id) => {
  return request({
    url: `${CRM_IP}/wap/followUpRecords/${id}/updateMsg/get`,
    method: 'get'
  });
};


/**
 * 获取跟进记录列表
 * @param id    id
 * @param type  类型
 */
export const getFollowUpRecords = ({id, type}) => {
  return request({
    url: `${CRM_IP}/wap/followUpRecords/${id}/${type}/list`,
    method: 'get',
    loading: false
  });
};

/**
 * 获取询价列表
 * @param id    id
 * @param type  类型
 */
export const getEnquiryPrices = ({id, type}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${id}/${type}/list`,
    method: 'get',
    loading: false
  });
};

/**
 * 发起询价
 * @param type   客户端: customer; 线索端: clue
 * @param areaId 区域id
 * @param clueId 线索id
 * @param customerId 客户id
 * @param demand 其他需求
 */
export const saveEnquiryPrices = ({type, areaId, clueId, customerId, demand}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${type}/save`,
    method: 'POST',
    data: {
      areaId, clueId, customerId, demand
    }
  });
};

/**
 * 获取变更记录
 * @param id    id
 */
export const getChangeLogs = (id) => {
  return request({
    url: `${CRM_IP}/wap/changeLog/${id}/list`,
    method: 'get',
    loading: false
  });
};
/**
 * 根据询价单ID(报价单ID)获取报价详情
 * @param id    id
 */
export const getQuotedRecords = (id) => {
  return request({
    url: `${CRM_IP}/wap/quotedRecords/${id}/get/enquiryAndQuotedId`,
    method: 'get',
    loading: false
  });
};
/**
 * 根据报价记录ID获取报价详情
 * @param recordId
 */
export const getRecordDetail = (recordId) => {
  console.log(recordId);
  return request({
    url: 'http://result.eolinker.com/G3NQtK270e5ea1e75a46958f88f0f7089999fd3f0cc61e0?uri=/wap/quotedRecords/{recordId}/get/recordId'
  });
  // return request({
  //   url: `${CRM_IP}/crm/wap/quotedRecords/${recordId}/get/recordId`,
  //   method: 'get',
  //   loading: false
  // });
};
/**
 * 线索客户详情页-报价详情
 * @param id
 */
export const getEnquiryPricesDetail = ({id, module}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${id}/${module}/get`,
    method: 'get',
    loading: false
  });
};


/**
 * 采纳报价
 * @param enquiryId        询价id
 * @param quotedMsgId      报价内容id
 */
export const acceptEnquiryPrice = ({enquiryId, quotedMsgId}) => {
  return request({
    url: `${CRM_IP}/wap/enquiryPrices/${enquiryId}/${quotedMsgId}/accept`,
    method: 'put'
  });
};

/**
 * 获取变更记录分页列表
 * @param id    id
 * @param pageNum  页码
 * @param pageSize 页数量
 */
export const getChangeLogsWithPage = ({id, pageNum, pageSize = 10}) => {
  return request({
    url: `${CRM_IP}/wap/changeLog/${id}/page`,
    method: 'post',
    loading: false,
    data: {
      pageNum,
      pageSize
    }
  });
};


/**
 * 关注
 * @param id    id
 * @param module 模块
 * @param isCancel 是否是取消
 */
export const follow = ({id, module, isCancel}) => {
  let type = '';
  switch (module) {
    case 'clues':
      type = 'clue';
      break;
    default:
      type = module;
      break;
  }
  return request({
    url: `${CRM_IP}/wap/${type}/${id}/follow`,
    method: isCancel ? 'DELETE' : 'POST'
  });
};

/**
 * 获取省市份
 */
export const getProvice = () => {
  return request({
    url: `${BASE_IP}/areas/treeForm`,
    method: 'GET',
    loading: true,
    cacheKey: 'getProvice'
  });
};

/**
 * 获取省市区
 * @param areaId  区域id
 */
export const getAreaById = ({areaId}) => {
  return request({
    url: `${BASE_IP}/areas/${areaId}/areaAreaCodeByCode`,
    method: 'GET',
    loading: false
  });
};

/**
 * 获取所有门店
 */
export const getGroundStore = () => {
  return request({
    url: `${BASE_IP}/groundStore/all`,
    loading: false
  });
};
/**
 * 获取负责服务选项
 */
export const getResponsibleAreaList = () => {
  return request({
    url: `${CRM_IP}/wap/base/getResponsibleAreaList`,
    loading: false
  });
};
/**
 * 获取已开通城市的列表
 */
export const getDredgeCityList = () => {
  return request({
    url: `${CRM_IP}/wap/base/getDredgeCityList`,
    loading: false
  });
};

/**
 * 获取订单ID
 * @param code
 * @param source
 */
export const getOrderNo = ({code, source = 'R'}) => {
  return request({
    url: `${BASE_IP}/num/generateOrder`,
    method: 'POST',
    loading: false,
    data: {
      code,
      source
    }
  });
};

/**
 *  判断订单编号是否唯一
 * @param id
 */
export const isOrderNoUnique = (id) => {
  return request({
    url: `${BASE_IP}/order/isUnique/${id}`,
    method: 'GET'
  });
};

/**
 * 获取七牛云配置
 */
export const getQiNiu = () => {
  return request({
    url: `${CRM_IP}/base/qiNiuAccount`,
    method: 'GET',
    loading: false
  });
};

