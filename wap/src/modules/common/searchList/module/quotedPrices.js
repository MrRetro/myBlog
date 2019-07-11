/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';


export default {
  rightTitleParams: () => ({
    // text: '新建',
    // onSuccess: () => {
    //   alert('提交报价？');
    //   // RouteUtil.quotedAdd({
    //   // id: vueInstance.id,
    //   // module: vueInstance.module,
    //   // params: vueInstance.allData,
    //   // type: 'add',
    //   // onSuccess: () => {
    //   //   // vueInstance.tabFetchData('OfferTab');
    //   // }
    //   // });
    // }
  }),
  title: '报价单',
  onItemClick: ({id, module, type}) => RouteUtil.commonDetail({id, module, type}),
  chooseTitle: '选择报价单',
  totalText: '条报价单',
  searchText: '搜索车型名称/询价人姓名/单据编号',
  filterArray: ['enquirySort',
    ['enquiryStatus', 'acceptStatus', 'isQuoted', 'clueStatusByEnquriy', 'clueLevel', 'responsibleArea', 'store', 'enquiryCreateTime',
      'enquiryBelongPlaceId', 'enquiryArea', 'enquiryUpdateTime', 'quotedTime', 'clueShoppingWay']]
};
