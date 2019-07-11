/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../utils/routeUtil';
import {images} from '../../../assets';
import {getStatusTime} from './commonFunc';
import agents from './module/agents';
import clues from './module/clues';
import customers from './module/customers';
import enquiryPrices from './module/enquiryPrices';
import followUpPlans from './module/followUpPlans';
import order from './module/order';
import quotedPrices from './module/quotedPrices';
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

/**
 * 转化detail数据的方法
 * @param module   模块
 * @param type     类型
 * @param instance vue实例
 * @param data     网络获取数据的
 * @returns {{nameData: *, updateTime: *, nextData: *, bottomButtons: *, infoData: *, personData: *, tabConfig: *, rightParams: *}}
 */
export const transformData = ({module, type, instance, data}) => {
  return {
    ...data,
    nameData: getCorrectParams(module, type, 'getNameData')({data}),
    hintShowText: getCorrectParams(module, type, 'getHintShowText')({data}),
    listRowData: getCorrectParams(module, type, 'getListRowData')({data, instance}),
    bottomButtons: getCorrectParams(module, type, 'getBottomButtons')({instance, data}),
    infoData: getCorrectParams(module, type, 'getInfoData')({data, instance}),
    personData: getCorrectParams(module, type, 'getPersonData')({data}),
    tabConfig: getCorrectParams(module, type, 'getTabConfig')({instance, data}),
    rightParams: getCorrectParams(module, type, 'getRightParams')({instance, data}),
    ...getCorrectParams(module, type, 'getOtherParams')({data})
  };
};


export const config = {
  getTabConfig: () => [{title: '跟进记录', tab: 'FollowUpTab'},
    {title: '报价记录', tab: 'OfferTab'},
    {title: '变更记录', tab: 'ChangeTab'}],
  getOtherParams: () => ({}),
  getBottomButtons: ({instance}) => [{
    title: '跟进',
    icon: images.base.ic_followup,
    click: () => RouteUtil.commonFollowUp({
      id: instance.id,
      module: instance.module,
      targetId: instance.id,
      targetName: instance.nameData.name,
      onSuccess: () => {
        instance.tabFetchData('FollowUpTab');
        instance.fetchData();
      }
    })
  }, {
    title: '询价',
    icon: images.all.ico_money,
    click: () => RouteUtil.commonInquiry({
      id: instance.id,
      module: instance.module,
      params: instance.allData,
      type: 'add',
      onSuccess: () => {
        instance.tabFetchData('OfferTab');
      }
    })
  }],
  getNameData: ({data}) => ({
    name: data.name,
    remark: data.nickname,
    follow: data.hasFollow,
    showFollow: !!data.responsible
  }),
  getListRowData: ({data, instance}) => ([{
    title: '购车线索',
    click: () => RouteUtil.clueList({module: instance.module, id: instance.id, isAll: true}),
    count: data.clueCount,
    icon: images.all.ico_line
  }, {
    title: '合同订单',
    click: () => RouteUtil.orderList({module: instance.module, id: instance.id}),
    count: data.orderCount,
    icon: images.all.ico_order
  }]),
  getHintShowText: ({data}) => getStatusTime(data.nextFollowUpTime, data.responsible),
  getPersonData: ({data}) => ({
    name: '负责人',
    edit: true,
    subname: '协同人',
    master: {...data.responsible, ico: data.responsible && data.responsible.avatar},
    pater: data.teamwork ? data.teamwork.map(item => ({...item, ico: item.avatar})) : []
  }),
  agents,
  clues,
  customers,
  enquiryPrices,
  followUpPlans,
  order,
  quotedPrices,
  delivery
};
