/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';

export default {
  rightTitleParams: (vueInstance) => ({
    text: '新建',
    auth: 'wap-inquiry-add',
    onSuccess: () => {
      RouteUtil.commonInquiry({
        BACK_ACTION: {path: vueInstance.ROUTE_PATH},
        id: vueInstance.userId,
        module: vueInstance.module,
        params: vueInstance.allData,
        type: 'add',
        onSuccess: () => {
          console.log('==>inquiry add success');
          vueInstance.refreshData();
          // vueInstance.tabFetchData('OfferTab');
        }
      });
    }
  }),
  title: '询价单',
  onItemClick: ({id, module, type}) => RouteUtil.commonDetail({id, module, type}),
  chooseTitle: '选择询价单',
  totalText: '条询价单',
  searchText: '搜索车型名称/订单编号',
  filterArray: ['enquirySort',
    ['enquiryStatus', 'acceptStatus', 'isQuoted', 'clueStatusByEnquriy', 'clueLevel', 'store', 'enquiryCreateTime', 'enquiryBelongPlaceId',
      'enquiryArea', 'enquiryUpdateTime', 'quotedTime', 'clueShoppingWay']]
};
