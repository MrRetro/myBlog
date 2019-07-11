/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';

export default {
  rightTitleParams: (instance) => ({
    auth: 'wap-crm-customer-add',
    text: '新建',
    onSuccess: () => {
      RouteUtil.clientAdd({params: instance.params, BACK_ACTION: {path: instance.ROUTE_PATH}});
    }
  }),
  chooseTitle: '选择客户',
  totalText: '名客户',
  searchText: '搜索姓名/手机/备注名称/客户编号',
  filterArray: ['sort', 'customerLevel',
    ['customerOrigin', 'customerType', 'lastFollowUpTime', 'nextFollowUpTime', 'customerCreateTime', 'customerObtainTime',
      'customerResponsible', 'customerTeamwork']],
  all: {
    title: '全部客户',
    filterArray: ['sort', 'customerLevel',
      ['customerOrigin', 'customerType', 'lastFollowUpTime', 'nextFollowUpTime', 'customerCreateTime',
        'customerObtainTime', 'customerResponsible', 'customerTeamwork']]
  },
  follow: {
    rightTitleParams: () => ({}),
    title: '重点客户',
    filterArray: ['sort', 'customerLevel',
      ['customerOrigin', 'customerType', 'lastFollowUpTime', 'nextFollowUpTime', 'customerCreateTime',
        'customerObtainTime', 'customerResponsible', 'customerTeamwork']]
  },
  sea: {
    rightTitleParams: () => ({}),
    title: '客户公海',
    filterArray: [
      ['customerOrigin', 'customerType', 'customerCreateTime']]
  }
};
