/**
 * User: retro.
 * Time: 2018/9/6
 */

import request from '../utils/request';
import {CRM_IP, BASE_IP} from '../config';

// let CRM_IP = 'http://192.168.10.200:8111'; // 本地地址
// let BASE_IP = 'http://192.168.10.200:8113'; // 本地地址
// let SYS_IP = 'http://192.168.10.200:8112'; // 本地地址

/**
 * 获取待办事项
 * @param id
 * @return {*}
 */
export const getWorkbench = ({id}) => {
  return request({
    url: `${CRM_IP}/wap/workbench/todo`,
    method: 'GET',
    data: {id}
  });
};

/**
 * 获取走势图
 * @param type          类型[新建线索:newClue,新建客户:newCustomer,签约订单:signOrder,新建经纪人:newAgent]
 * @param year          年份
 * @param month         月份
 * @param departmentId  部门
 * @return {*}
 */
export const getWorkTrend = ({type, year, month, departmentId}) => {
  return request({
    url: `${BASE_IP}/wap/workbench/${type}/${year}/${month}/trend`,
    method: 'GET',
    data: {departmentId}
  });
};

/**
 * 获取数据看板
 * @param year          年份
 * @param month         月份
 * @param departmentId  部门
 * @return {*}
 */
export const getWorkDataBoard = ({year, month}) => {
  return request({
    url: `${CRM_IP}/wap/workbench/${year}/${month}/dataBoard`,
    method: 'GET'
  });
};
// 获取数据看板 -选择员工
export const getWorkDataBoardByUser = ({year, month, id}) => {
  return request({
    url: `${CRM_IP}/wap/workbench/${year}/${month}/dataBoard?employeeId=${id}`,
    method: 'GET'
  });
};
// 获取数据看板 -选择部门
export const getWorkDataBoardByDep = ({year, month, id}) => {
  return request({
    url: `${CRM_IP}/wap/workbench/${year}/${month}/dataBoard?departmentId=${id}`,
    method: 'GET'
  });
};

/**
 * 获取数据年份
 * */
export const getYears = () => {
  return request({
    url: `${CRM_IP}/wap/workbench/year`,
    method: 'GET'
  });
};

/**
 * 获取店铺列表
 * */
export const getStores = () => {
  return request({
    url: `${BASE_IP}/wap/groundStore/latestStore`,
    method: 'GET'
  });
};

/**
 * 获取新增自营店信息
 * */
export const getNewInfo = () => {
  return request({
    url: `${BASE_IP}/wap/groundStore/newInfo`,
    method: 'GET'
  });
};

/**
 * 获取最新的更新事项
 * */
export const getUpdateMatter = () => {
  return request({
    url: `${BASE_IP}/updateMatter/latestUpdateMatter`,
    method: 'GET'
  });
};

/**
 * 我已知晓
 * */
export const getKnown = () => {
  return request({
    url: `${BASE_IP}/updateMatter/known`,
    method: 'GET'
  });
};

/**
 * 获取首页通知
 * */
export const getNotification = () => {
  return request({
    url: `${BASE_IP}/homeNotification/latestNotification`,
    method: 'GET'
  });
};
