/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import Numeral from 'numeral';
import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {share} from '../commonFunc';
import {transformColorName} from '../../../../utils/commonUtil';
import {getIsExecute} from '../../../../api/order';
import {images} from '../../../../assets';


export default {
  title: '交车单',
  getTabConfig: () => [{title: '交车单', tab: 'DeliveryCarTab'},
    // {title: '在途记录', tab: 'OnOrderTab'},
    // {title: '变更记录', tab: 'ChangeTab'},
    {title: '文件柜', tab: 'FileCaseTab'}],
  getHintShowText: ({data}) => (data.orderContractStatus && data.orderContractStatus.code === 1 ? '客户合同已失效，请重新发送签约短信' : `订单更新时间 ：${data.updateTime}`),
  getNameData: ({data}) => ({
    carName: data.carName,
    showFollow: false
  }),
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: async () => {
      // 获取是否有编辑权限
      const editPermission = await getIsExecute(data.orderType.code);
      ddApi.setPopMenu({
        items: [
          {id: '1', text: '编辑合同'},
          // {id: '2', text: '数据变更'},
          {id: '3', text: '申请取消'},
          // {id: '4', text: '取消合同'},
          {id: '5', text: '分享单据'}
        ].filter(item => {
          switch (item.id) {
            case '1':
              // return data.orderType.code !== 2 && data.orderType.code !== 5 && data.status.code !== 12;
              return editPermission && data.status.code !== 12;
            case '3':
              return data.status.code === 12;
            case '4':
              return data.status.code === 1 || data.status.code === 2;
            default:
              return true;
          }
        }),
        onSuccess: ({id}) => {
          switch (id) {
            case '1':
              RouteUtil.orderEdit({
                BACK_ACTION: {path: instance.ROUTE_PATH},
                id: instance.id,
                onSuccess: () => {
                  instance.fetchData();
                  instance.params.onSuccess && instance.params.onSuccess();
                }
              });
              break;
            case '2':
              break;
            case '3':
              RouteUtil.orderCancel({id: instance.id, onSuccess: () => instance.fetchData()});
              break;
            case '4':
              RouteUtil.orderCancel({id: instance.id, onSuccess: () => instance.fetchData()});
              break;
            case '5':
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
    {title: '姓名', value: data.name},
    {title: '编号', value: data.orderNo, type: 'copy'},
    {title: '电话', value: data.mobile, type: 'mobile'},
    {
      title: '状态',
      value: data.isCancel ? '已取消' : data.orderContractStatus && data.orderContractStatus.name,
      type: data.isCancel ? 'cancel' : '',
      message: '订单已取消',
      hint: `失效备注:${data.cancelRemark}`
    }
  ],
  getPersonData: ({data}) => ({
    name: '负责人',
    isDel: false,
    // todo 暂停开放，后续根据状态控制
    edit: false,
    subname: '协同人',
    master: {...data.responsible, ico: data.responsible && data.responsible.avatar},
    pater: data.teamworkMans ? data.teamworkMans.map(item => ({
      id: item.userId,
      name: item.userName,
      ico: item.userHeardUrl
    })) : []
  }),
  getOtherParams: ({data}) => {
    let {carPrice, totalAmount, deposit, appearance, interior, contractUrl = [], depositVoucherUrl = [], certificateUrl = []} = data;
    let params = {};
    let outColor = '';
    let inColor = '';
    try {
      outColor = appearance ? JSON.parse(appearance) : null;
      inColor = interior ? JSON.parse(interior) : null;
    } catch (e) {
      console.log('颜色值错误');
    }
    params.outColor = transformColorName(outColor) || '无';
    params.inColor = transformColorName(inColor) || '无';
    params.carPrice = Numeral(carPrice).format('0,0.00');
    params.totalAmount = Numeral(totalAmount).format('0,0.00');
    params.deposit = Numeral(deposit).format('0,0.00');
    params.orderFileCabinetList = [
      {
        title: '委托订购合同',
        images: contractUrl
      },
      {
        title: '身份证/企业营业执照',
        images: certificateUrl
      },
      {
        title: '定金付款凭证',
        images: depositVoucherUrl
      }
    ];
    return params;
  },
  getListRowData: ({data, instance}) => ([{
    title: '合同订单',
    click: () => RouteUtil.orderList({module: instance.module, id: instance.id}),
    count: data.orderCount,
    icon: images.all.ico_order
  }]),
  getBottomButtons: ({instance, data}) => {
    const onSuccess = () => instance.fetchData();
    let status = -1;

    switch (status) {
      case -1:
        return [{
          title: '车辆到店',
          icon: images.delivery.ic_car,
          click: () => RouteUtil.push({
            name: 'arrivalStoreForm',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      // case 0:
      //   return [{
      //     title: '确认收款',
      //     icon: images.delivery.ic_money,
      //     click: () => RouteUtil.push({
      //       name: 'arrivalStoreForm',
      //       params: {
      //         params: instance.allData,
      //         state: data.orderContractStatus.code,
      //         id: instance.id,
      //         onSuccess
      //       }
      //     })
      //   }];
      case 1:
        return [{
          title: '完成交车',
          icon: images.delivery.ic_delivery,
          click: () => RouteUtil.push({
            name: 'finishDelivery',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      case 2:
        return [{
          title: '多退少补',
          icon: images.delivery.ic_tui,
          click: () => RouteUtil.push({
            name: 'refundsForm',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      case 3:
        return [{
          title: '客户收款',
          icon: images.delivery.ic_shou,
          click: () => RouteUtil.push({
            name: 'addReceipt',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      case 4:
        return [{
          title: '金融款项',
          icon: images.delivery.ic_sure,
          click: () => RouteUtil.push({
            name: 'addFinancialFund',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      case 5:
        return [{
          title: '杂费申请',
          icon: images.delivery.ic_apply,
          click: () => RouteUtil.push({
            name: 'extraApplyForm',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      case 6:
        return [{
          title: '物流调拨',
          icon: images.delivery.ic_logistics,
          click: () => RouteUtil.push({
            name: 'arrivalStoreForm',
            params: {
              params: instance.allData,
              state: data.orderContractStatus.code,
              id: instance.id,
              onSuccess
            }
          })
        }];
      default:
        return [];
    }
  }
};
