/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';


export default {
  rightTitleParams: () => ({
    // text: '新建',
    // auth: 'wap-quoted-records-add',
    // onSuccess: () => {
    //   // alert('新建询价单');
    //   RouteUtil.quotedRecordAdd({
    //     BACK_ACTION: {path: vueInstance.ROUTE_PATH},
    //     id: vueInstance.id,
    //     module: vueInstance.module,
    //     params: vueInstance.allData,
    //     type: 'add',
    //     onSuccess: () => {
    //       vueInstance.refreshData();
    //       // vueInstance.tabFetchData('OfferTab');
    //     }
    //   });
    // }
  }),
  title: '报价记录',
  onItemClick: ({item, module, type}) => RouteUtil.offerDetail({...item, module, type}),
  chooseTitle: '选择报价记录',
  totalText: '条报价记录',
  searchText: '搜索车型名称/询价人姓名/报价人姓名',
  filterArray: ['quotedRecordsSort',
    ['acceptStatus', 'clueStatusByEnquriy', 'clueLevel', 'store', 'enquiryCreateTime', 'enquiryBelongPlaceId',
      'enquiryArea', 'enquiryUpdateTime', 'quotedTime', 'clueShoppingWay', 'invoiceType', 'insuranceType']]
};
