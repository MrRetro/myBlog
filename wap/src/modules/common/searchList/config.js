/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../utils/routeUtil';
import {getSearchList} from '../../../api/common';
import agents from './module/agents';
import clues from './module/clues';
import customers from './module/customers';
import enquiryPrices from './module/enquiryPrices';
import followUpRecords from './module/followUpRecords';
import order from './module/order';
import quotedPrices from './module/quotedPrices';
import quotedRecords from './module/quotedRecords';
import delivery from './module/delivery';

/**
 * 获取正确的配置项
 * @param module  一级条件
 * @param type    二级条件
 * @param tag     需要获取的字段
 * @returns {*}
 */
export const getCorrectParams = (module, type, tag) => {
  return (config[module][type] && config[module][type][tag]) || (config[module][tag] || config[tag]);
};

export const config = {
  fetchData: getSearchList,
  onItemClick: ({id, module, type, instance}) => RouteUtil.commonDetail({
    id,
    module,
    type,
    onSuccess: () => instance.refreshData()
  }),
  customers,
  agents,
  clues,
  followUpRecords,
  order,
  enquiryPrices,
  quotedPrices,
  quotedRecords,
  delivery
};
