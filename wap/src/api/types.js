/**
 * User: retro.
 * Time: 2018/6/7
 */

import request from '../utils/request';
import {CRM_IP} from '../config';

/**
 * 获取全部枚举类型
 */
export const getAllMenu = () => {
  return request({
    url: `${CRM_IP}/wap/enums/all`,
    loading: false,
    cacheKey: 'getAllMenu'
  });
};

/**
 * 来源
 * @returns {*}
 */
export const getOrigin = () => {
  return request({
    url: `${CRM_IP}/enums/agentOriginCreation`,
    loading: false
  });
};
