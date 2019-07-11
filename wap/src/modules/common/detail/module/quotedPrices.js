/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */

import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {share} from '../commonFunc';
import {images} from '../../../../assets';


export default {
  title: '报价单',
  getTabConfig: () => [{title: '询价记录', tab: 'EnquiryRecordTab'},
    {title: '报价记录', tab: 'QuotedRecordTab'}
  ],
  getHintShowText: ({data}) => `发起询价时间 ：${data.createTime}`,
  getNameData: ({data}) => ({
    carName: data.vehicleModel,
    showFollow: false,
    status: data.status
  }),
  getRightParams: ({instance}) => ({
    text: '...',
    onSuccess: () => {
      let items = [{id: '3', text: '分享单据'}];
      ddApi.setPopMenu({
        items,
        onSuccess: ({id}) => {
          switch (id) {
            case '3':
              share({module: instance.module, type: instance.type, id: instance.id});
              break;
            default:
              break;
          }
        }
      });
    }
  }),
  getInfoData: ({data}) => [
    {title: '姓名', value: data.customerName},
    {title: '编号', value: data.quotedNo, type: 'copy'},
    {title: '电话', value: data.customerMobile, type: 'mobile'},
    {
      title: '状态',
      value: data.status.code === 2 ? '已取消' : data.status && data.status.name,
      type: data.status.code === 2 ? 'cancel' : '',
      message: '单据已取消',
      hint: `取消原因:${data.cancelReason || '无'}`
    }
  ],
  getPersonData: () => ({}),
  getBottomButtons: ({instance, data}) => {
    if (data.status.code !== 0 && data.status.code !== 1) return [];
    return [{
      title: '提交报价',
      icon: images.all.ico_go,
      click: () => {
        // alert('提交报价');
        RouteUtil.quotedAdd({
          id: instance.id,
          module: instance.module,
          params: instance.allData,
          type: 'add',
          onSuccess: () => {
            instance.fetchData();
            instance.tabFetchData('QuotedRecordTab');
            instance.tabFetchData('EnquiryRecordTab');
          }
        });
      }
    }];
  }
};
