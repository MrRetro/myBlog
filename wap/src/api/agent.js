import request from '../utils/request';
import {CRM_IP, SYS_IP} from '../config';
import Templates from '../templates';


/**
 * 注册经纪人
 * @param area      经纪人所在地理位置的区域名
 * @param city      经纪人所在地理位置的城市名
 * @param latitude  经纪人所在地理位置(纬度)
 * @param longitude 经纪人所在地理位置(经度)
 * @param mobile    经纪人电话
 * @param origin    经纪人来源 enum[0:二维码注册, 1:主动注册, 2:协助注册, 3:主管分配, 4:遗失认领, 5:责任转交, 6:自由注册]
 * @param password  经纪人密码 字母数字
 * @param province  经纪人所在地理位置的省份名
 */
export const registerAgent = ({area, city, latitude, longitude, mobile, origin, password, province}) => {
  return request({
    url: `${CRM_IP}/wap/agents/register`,
    method: 'post',
    data: {area, city, latitude, longitude, mobile, origin, password, province}
  });
};


/**
 * 修改经纪人
 * @param id           经纪人id
 * @param address      经纪人地址
 * @param areaId       经纪人地区
 * @param gender       经纪人性别 enum[1,2]
 * @param industry     经纪人行业
 * @param label        经纪人
 * @param level        经纪人等级
 * @param mobile       经纪人电话
 * @param name         经纪人名称
 * @param nickname     经纪人昵称
 * @param remark       经纪人备注
 * @param params       其他参数
 */
export const changeAgent = ({id, address, area, gender, industry, label, level, mobile, name, nickname, remark, responsible, type, ...params}) => {
  return request({
    url: `${CRM_IP}/wap/agents/${id}`,
    method: 'PUT',
    data: {address, area, gender, industry, label, level, mobile, name, nickname, remark, responsible, type, ...params}
  });
};

/**
 * 获取编辑经纪人信息
 * @param id    经纪人id
 */
export const getEditAgentInfo = (id) => {
  return request({
    url: `${CRM_IP}/wap/agents/${id}/get`,
    method: 'GET'
  });
};

/**
 * 放弃经纪人
 * @param id
 * @param reason
 */
export const giveUpAgent = ({id, reason}) => {
  return request({
    url: `${CRM_IP}/wap/agents/${id}/abandon`,
    method: 'put',
    data: {description: reason}
  });
};

/**
 * 获取添加经纪人模版
 * @returns {AxiosPromise}
 */
export const getAddAgentModule = ()=>{
  //TODO 修改为本地获取模板
  if (Templates['wap-agent']) {
    return Promise.resolve(Templates['wap-agent']);
  }
  // return request({
  //   url: `${SYS_IP}/permissions/templateFields`,
  //   method: 'GET',
  //   params: {
  //     frontUrl: '/wap/agent'
  //   },
  //   cacheKey: 'getAddAgentModule'
  // });
};
/**
 * 指定经纪人区域(DCC)
 * @returns {*}
 * @param id     经济人id
 * @param code   区域code
 */
export const putAppointArea = ({id, code})=>{
  return request({
    url: `${CRM_IP}/wap/agents/${id}/${code}/appointArea`,
    method: 'put'
  });
};
