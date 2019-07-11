/**
 * User: retro.
 * Time: 2018/5/18
 */
import * as axios from 'axios';
import request from '../utils/request';
import {SYS_IP, CONFIG_URL, AUTH_IP} from '../config';

// 获取钉钉授权
export const getSignatures = () => {
  return request({
    url: `${SYS_IP}/signatures/dingTalk`,
    method: 'get',
    loading: false,
    params: {
      url: `${CONFIG_URL}?dd_nav_bgcolor=FF348EED`
    }
  });
};

/**
 * 根据钉钉uid获取后台用户信息
 */
export function getUserInfo(userId) {
  return request({
    url: `${SYS_IP}/wap/users/dingTalk/${userId}`,
    loading: false
  });
}

/**
 * 获取token
 */
export function getToken(username, password) {
  let url = `${AUTH_IP}token?grant_type=password&username=${username}&password=${password}&scope=trust&type=0`;
  return axios({
    url,
    method: 'post',
    loading: false,
    auth: {
      username: 'crm-client',
      password: '$2a$10$hv1ZNontrZr8ptqVP6LhPekcIatksaeBZd3iRl1PM'
    }
  });
}


/**
 * 获取用户权限
 * @param userID   用户id
 */
export function getAllAuths(userID = '40288a4863874e3501638c2b4d6a0059') {
  return request({
    url: `${SYS_IP}/wap/users/${userID}/permissionCodes`,
    loading: false,
    method: 'get'
  });
}
