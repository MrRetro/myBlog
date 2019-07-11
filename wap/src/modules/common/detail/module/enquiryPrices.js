/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */

import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {share} from '../commonFunc';
import {cancelEnquiryPrice} from '../../../../api/inquiry';
import {AlertUtil} from '../../../../utils/AlertUtil';


export default {
  title: '询价单',
  getTabConfig: () => [{title: '询价记录', tab: 'EnquiryRecordTab'},
    {title: '报价记录', tab: 'QuotedRecordTab'},
    {title: '变更记录', tab: 'ChangeTab'}
  ],
  getHintShowText: ({data}) => `发起询价时间 ：${data.createTime}`,
  getNameData: ({data}) => ({
    carName: data.vehicleModel,
    showFollow: false,
    status: data.status
  }),
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: () => {
      let items = [];
      if (data.status.code === 0) {
        items = [
          {id: '1', text: '编辑询价'},
          {id: '2', text: '取消询价'},
          {id: '3', text: '分享单据'}
        ];
      } else {
        items = [
          {id: '3', text: '分享单据'}
        ];
      }
      ddApi.setPopMenu({
        items,
        onSuccess: ({id}) => {
          switch (id) {
            case '1':
              RouteUtil.commonInquiry({
                id: instance.id,
                module: instance.module,
                params: instance.allData,
                type: 'edit',
                onSuccess: () => {
                  instance.fetchData();
                  instance.tabFetchData('ChangeTab');
                }
              });
              break;
            case '2':
              AlertUtil.showInputPop({
                title: '取消询价',
                placeholder: '请输入取消询价理由…',
                onSuccess: async (text, hide) => {
                  if (text) {
                    if (text.length < 10) {
                      AlertUtil.showToast({txt: '不少于10个字'});
                      return;
                    }
                    hide();
                    await cancelEnquiryPrice({id: instance.id, cancelReason: text});
                    AlertUtil.showToast({txt: '取消成功', type: 'success'});
                    instance.fetchData();
                    instance.tabFetchData('ChangeTab');
                    instance.tabFetchData('QuotedRecordTab');
                  } else {
                    AlertUtil.showToast({txt: '请输入取消询价理由'});
                  }
                }
              });
              break;
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
    {title: '编号', value: data.enquiryNo, type: 'copy'},
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
  getBottomButtons: () => []
};
