/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */

import {ddApi} from '../../../api/dingding';
import {SHARE_URL, ENV} from '../../../config/index';
import {getDistance} from '../../../utils/commonUtil';
/**
 * 获取转化后的距离
 * @param location
 * @param data
 * @returns {string}
 */
export const getDistanceStr = (location, data) => {
  if (!data.latitude) return '无';
  const l = getDistance(location.latitude, location.longitude, data.latitude, data.longitude);
  if (l / 1000 > 1) {
    return `${(l / 1000).toFixed(2)}km`;
  }
  return `${l}m`;
};
/**
 * 获取头部显示的状态字符串
 * @param time
 * @param responsible
 * @returns {*}
 */
export const getStatusTime = (time, responsible) => {
  if (!responsible) return null;
  if (!time) return '暂无跟进计划';
  if (time.split(' ')[0] === new Date().format('yyyy-MM-dd')) return '今日需跟进';
  if (new Date(time.replace(/-/g, '/')).getTime() <= new Date().getTime()) return `已逾期!原定跟进时间:${time.split(' ')[0]}`;
  return `下次跟进时间 ：${time.split(' ')[0]}`;
};

export const share = ({title = '宜买车ERP', content = '分享了一个链接', module, type, id} = {}) => {
  ddApi.share({
    title,
    content,
    url: `${SHARE_URL}?module=${module}&type=${type}&id=${id}&env=${ENV.toLocaleLowerCase()}`,
    onSuccess: () => {

    }
  });
};

/**
 * 获取线索是否可编辑
 * @param code
 * @returns {boolean}
 */
export const getClueEditAble = (code) => {
  // 线索不为已战败,已签约，已失效
  return code !== 6 && code !== 4 && code !== 5;
};

