/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';
import {images} from '../../../../assets';
import {getDistanceStr, share} from '../commonFunc';
import {giveUpAgent, putAppointArea} from '../../../../api/agent';


export default {
  title: '经纪人详情',
  getNameData: ({data, instance})=>{
    return {
      name: data.nickname,
      remark: data.wechatAccount,
      follow: data.hasFollow,
      showFollow: !!data.responsible
    }
  },
  getInfoData: ({data, instance}) => [
    {title: '编号', value: data.agentNo, type: 'copy'},
    {title: '性别', value: data.gender && data.gender.name},
    {title: '距离', value: getDistanceStr(instance.$store.state.user.location, data), type: 'distance'},
    {title: '等级', value: data.level && data.level.code},
    {title: '电话', value: data.mobile, type: 'mobile'},
    {
      title: '状态',
      value: data.followUpStatus && data.followUpStatus.name,
      type: data.giveUpReason ? 'cancel' : '',
      message: '经纪人已放弃',
      hint: `放弃理由:${data.giveUpReason}`
    }
  ],
  getPersonData: ({data}) => ({
    name: '关联地推',
    auth: 'wap-crm-agent-push',
    saleAuth: 'wap-crm-agent-sales',
    saleName: '关联销售',
    edit: true,
    subname: '协同人',
    master: {...data.responsible, ico: data.responsible && data.responsible.avatar},
    saleMaster: {...data.sales, ico: data.sales && data.sales.avatar},
    pater: data.teamwork ? data.teamwork.map(item => ({...item, ico: item.avatar})) : []
  }),
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: () => {
      let items = [];
      if (data.responsible || data.sales) {
        items = [
          {id: '1', text: '编辑信息', auth: 'wap-crm-agent-edit'},
          // {id: '2', text: '放弃经纪人'},
          {id: '3', text: '分享经纪人'},
          {id: '4', text: '分配到城市', auth: 'wap-crm-agent-batch-distribute'}
        ];
      } else {
        items = [
          // {id: '1', text: '编辑信息'},
          // {id: '2', text: '放弃经纪人'},
          {id: '3', text: '分享经纪人'},
          {id: '4', text: '分配到城市', auth: 'wap-crm-agent-batch-distribute'}
        ];
      }
      ddApi.setPopMenu({
        items,
        onSuccess: async ({id}) => {
          switch (id) {
            case '1':
              if (!instance.hasAuth) {
                AlertUtil.showToast({txt: '只有关联地推、关联销售、协同人或者主管才能操作'});
                return;
              }
              RouteUtil.editInfo({
                id: instance.id,
                onSuccess: () => {
                  instance.fetchData();
                  instance.params.onSuccess && instance.params.onSuccess();
                  instance.tabFetchData('ChangeTab');
                }
              });
              break;
            case '2':
              if (!instance.hasAuth) {
                AlertUtil.showToast({txt: '只有关联地推、关联销售、协同人或者主管才能操作'});
                return;
              }
              AlertUtil.showInputPop({
                title: '放弃经纪人',
                placeholder: '请输入放弃理由…',
                onSuccess: async (text, hide) => {
                  if (text) {
                    hide();
                    await giveUpAgent({id: instance.id, reason: text});
                    AlertUtil.showToast({txt: '放弃成功', type: 'success'});
                    instance.fetchData();
                    instance.tabFetchData('ChangeTab');
                  } else {
                    AlertUtil.showToast({txt: '请输入无效理由'});
                  }
                }
              });
              break;
            case '3':
              share({module: instance.module, type: instance.type, id: instance.id});
              break;
            case '4':
              if (!instance.isResponsible && !instance.isLeader) {
                AlertUtil.showToast({txt: '只有关联地推、关联销售或者主管才能操作'});
                return;
              }
              if (instance.$store.state.user.dredgeCityList.length === 0) {
                await instance.$store.dispatch('user/getDredgeCityList');
              }
              AlertUtil.show('select', {
                selectList: instance.$store.state.user.dredgeCityList.map(t => ({...t, title: t.name})),
                title: '选择已开通城市',
                onSuccess: (data1) => {
                  console.log('哈哈', data1);
                  putAppointArea({id: instance.id, code: data1[0].code})
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

  getBottomButtons: ({instance, data}) => {
    if (data.responsible || data.sales) {
      return [{
        title: '跟进',
        flex: 1,
        icon: images.base.ic_followup_white,
        click: () => {
          // todo 关闭销售跟进
          if (instance.data.responsible && instance.data.responsible.id === instance.$store.state.user.id) {
            RouteUtil.commonFollowUp({
              id: instance.id,
              module: instance.module,
              targetId: instance.id,
              targetName: instance.allData.nameData.name,
              onSuccess: () => {
                instance.fetchData();
                instance.tabFetchData('FollowUpTab');
              }
            });
          } else {
            instance.$AlertUtil.showToast({txt: '请用yiauto销售小程序跟进经纪人', icon: 'warn'});
          }
        }
      }];
    }
    return [{
      title: '分配地推',
      icon: images.all.ic_person,
      auth: 'wap-crm-agent-push',
      click: () => instance.allocationPerson()
    }, {
      title: '分配销售',
      icon: images.all.ic_person,
      auth: 'wap-crm-agent-sales',
      click: () => instance.allSalePerson()
    }];
  },
  getTabConfig: () => [{title: '跟进记录', tab: 'FollowUpTab'},
    {title: '变更记录', tab: 'ChangeTab'}]
};
