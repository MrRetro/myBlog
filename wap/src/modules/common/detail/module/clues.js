/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';
import {images} from '../../../../assets';
import {getClueEditAble, getStatusTime, share} from '../commonFunc';
import {transformColorName} from '../../../../utils/commonUtil';
import {betchClueStore} from '../../../../api/clue';


export default {
  title: '线索详情',
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: () => {
      let items = [];
      if (data.responsibleId && getClueEditAble(data.status.code)) {
        items = [
          {id: '1', text: '编辑信息', auth: 'wap-crm-clue-edit'},
          {id: '2', text: '分享线索'},
          {id: '3', text: '标记无效'},
          {id: '4', text: '分配到地面店', auth: 'wap-crm-clue-batch-distribute'}
        ];
      } else {
        items = [
          {id: '2', text: '分享线索'},
          {id: '4', text: '分配到地面店', auth: 'wap-crm-clue-batch-distribute'}
        ];
      }
      ddApi.setPopMenu({
        backgroundColor: '#FFFFFF',
        items,
        onSuccess: async ({id}) => {
          switch (id) {
            case '1':
              if (!instance.hasAuth) {
                AlertUtil.showToast({txt: '只有负责人、协同人或者主管才能操作'});
                return;
              }
              RouteUtil.clueEdit({
                id: instance.id,
                onSuccess: () => {
                  instance.fetchData();
                  instance.params.onSuccess && instance.params.onSuccess();
                  instance.tabFetchData('ChangeTab');
                }
              });
              break;
            case '2':
              share({module: instance.module, type: instance.type, id: instance.id});
              break;
            case '3':
              if (!instance.isResponsible) {
                AlertUtil.showToast({txt: '只有负责人才能操作'});
                return;
              }
              RouteUtil.clueFailure({
                id: instance.id,
                onSuccess: () => {
                  instance.fetchData();
                  instance.tabFetchData('ChangeTab');
                }
              });
              break;
            case '4':
              if (!instance.isResponsible && !instance.isLeader) {
                AlertUtil.showToast({txt: '只有负责人或者主管才能操作'});
                return;
              }
              if (instance.$store.state.user.storeList.length === 0) {
                await instance.$store.dispatch('user/getStoreList');
              }
              AlertUtil.show('select', {
                selectList: instance.$store.state.user.storeList.map(t => ({...t, title: t.storeName})),
                title: '选择地面店',
                onSuccess: (data1) => {
                  console.log('哈哈', data1);
                  betchClueStore({clueId: instance.id, storeId: data1[0].id})
                    .then(() => {
                      instance.fetchData();
                      instance.tabFetchData('ChangeTab');
                    }).catch(e => console.log(e));
                }
              });
              break;
            default:
              break;
          }
        }
      });
    }
  }),
  getListRowData: ({data, instance}) => ([{
    title: '合同订单',
    click: () => RouteUtil.orderList({module: instance.module, id: instance.id}),
    count: data.orderNum,
    icon: images.all.ico_order
  }]),
  getInfoData: ({data}) => {
    const {
      customerName, clueNo, customerGender, groundPromotionName, brokerName, area, storeSimpleDTO,
      intentionGrade, customerMobile, status, brokerId, coupon
    } = data;
    let list = [
      {title: '姓名', value: customerName},
      {title: '编号', value: clueNo, type: 'copy'},
      // {title: '状态', value: data.status && data.status.name},
      {title: '性别', value: customerGender && customerGender.name},
      {title: '等级', value: intentionGrade && intentionGrade.name},
      {title: '电话', value: customerMobile, type: 'mobile'},
      coupon ? {title: '活动', value: '', type: 'coupon'} : undefined,
      {
        title: '状态',
        value: status && status.name,
        type: (status.code === 6 || status.code === 5) ? 'cancel' : '',
        message: status.code === 6 ? '线索已失效' : '线索已战败',
        hint: `
        ${data.failureReasonDefeat && data.failureReasonDefeat.name?'战败理由：'+data.failureReasonDefeat.name+'<br />':''}
        ${data.failureReasonInvalid && data.failureReasonInvalid.name?'失效理由：'+data.failureReasonInvalid.name+'<br />':''}
        失效备注:${data.failureRemark}
        `
      },
      {title: '地面店', value: storeSimpleDTO && storeSimpleDTO.storeName},
      {title: '关联地推', value: groundPromotionName}
    ];
    if (!coupon) {
      if (brokerId) {
        list.push({
          title: '关联经纪人',
          value: `${brokerName}`,
          type: 'single',
          click: () => RouteUtil.commonDetail({id: brokerId, module: 'agents'})
        });
      }
      list.push({
        title: '关联经纪人',
        value: `线索地区:${area || '无'}`,
        type: 'single'
      });
    }
    return list.filter(v=>v);
  },
  getHintShowText: ({data}) => getStatusTime(data.nextFollowUpTime, data.responsibleId),
  getNameData: ({data}) => ({
    carName: data.carName,
    follow: data.focusType,
    showFollow: data.status.code !== 6 && data.status.code !== 2 && data.status.code !== 5
  }),
  getPersonData: ({data}) => ({
    name: (data.status.code === 5 || data.status.code === 6) ? '前负责人' : '负责人',
    auth: 'wap-crm-clue-careof',
    edit: getClueEditAble(data.status.code) && data.range,
    subname: (data.status.code === 5 || data.status.code === 6) ? '前协同人' : '协同人',
    master: {...data.responsible, ico: data.responsible && data.responsible.avatar},
    pater: data.teamworkMans ? data.teamworkMans.map(item => ({
      ...item,
      ico: item.avatar
    })) : []
  }),
  getOtherParams: ({data}) => {
    let {appearance, interior} = data;
    let params = {};
    let outColor = '';
    let inColor = '';
    try {
      outColor = appearance ? JSON.parse(appearance) : null;
      inColor = interior ? JSON.parse(interior) : null;
    } catch (e) {
      outColor = '无';
      inColor = '无';
    }
    params.outColor = transformColorName(outColor) || '无';
    params.inColor = transformColorName(inColor) || '无';
    return params;
  },
  getBottomButtons: ({instance, data}) => {
    // 已签约则隐藏按钮
    if (data.status.code === 4) {
      return [];
    }
    if (data.responsibleId && getClueEditAble(data.status.code)) {
      return [{
        title: '询价',
        flex: 1,
        icon: images.all.ic_money_blue,
        click: () => {
          if (data.intentionType.code === 2) {
            AlertUtil.showToast({txt: '线索为模糊意向无法询价，请编辑修改后再做操作。'});
            return;
          }
          RouteUtil.commonInquiry({
            id: instance.id,
            module: instance.module,
            params: instance.allData,
            type: 'add',
            onSuccess: () => {
              instance.tabFetchData('OfferTab');
              instance.tabFetchData('ChangeTab');
            }
          });
        }
      }, {
        title: '签约',
        flex: 1,
        icon: images.base.ic_sign,
        click: () => {
          // if (data.intentionType.code === 2) {
          //   AlertUtil.showToast({txt: '线索为模糊意向无法签约，请编辑修改后再做操作。'});
          //   return;
          // }
          if (!instance.isResponsible) {
            AlertUtil.showToast({txt: '您不是线索负责人,无法签约!'});
            return;
          }
          RouteUtil.orderAddOne({
            clueInfo: instance.allData,
            BACK_ACTION: {
              path: instance.ROUTE_PATH
            },
            onSuccess: () => {
              instance.fetchData();
            }
          });
        }
      }, {
        title: '跟进',
        flex: 2,
        icon: images.base.ic_followup_white,
        click: () => {
          if (instance.$store.state.user.userAuths['crm-wap-clue-detail-followUp']) {
            RouteUtil.commonFollowUp({
              id: instance.id,
              module: instance.module,
              targetId: instance.id,
              targetName: instance.allData.customerName,
              onSuccess: () => {
                instance.tabFetchData('FollowUpTab');
                instance.fetchData();
              }
            });
          } else {
            instance.$AlertUtil.showToast({txt: '请用yiauto销售小程序跟进经纪人', icon: 'warn'});
          }
        }
      }];
    }
    return [{
      title: '分配',
      icon: images.all.ic_person_white,
      auth: 'wap-crm-clue-allocation',
      click: () => instance.allocationPerson()
    }];
  }
};
