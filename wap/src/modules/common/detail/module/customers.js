/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';
import {images} from '../../../../assets';
import {share} from '../commonFunc';


export default {
  title: '客户详情',
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: () => {
      let items = [];
      if (data.responsible) {
        items = [
          {id: '1', text: '编辑信息', auth: 'wap-crm-customer-edit'},
          {id: '2', text: '分享客户'}
        ];
      } else {
        items = [
          // {id: '1', text: '编辑信息'},
          {id: '2', text: '分享客户'}
        ];
      }
      ddApi.setPopMenu({
        items,
        onSuccess: ({id}) => {
          switch (id) {
            case '1':
              if (!instance.hasAuth) {
                AlertUtil.showToast({txt: '只有负责人、协同人或者主管才能操作'});
                return;
              }
              RouteUtil.clientAdd({
                id: instance.id,
                type: 'edit',
                params: instance.data,
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
            default:
              break;
          }
        }
      });
    }
  }),
  getPersonData: ({data}) => ({
    name: '负责人',
    auth: 'wap-crm-customer-careof',
    edit: true,
    subname: '协同人',
    master: {...data.responsible, ico: data.responsible && data.responsible.avatar},
    pater: data.teamwork ? data.teamwork.map(item => ({...item, ico: item.avatar})) : []
  }),
  getInfoData: ({data}) => [
    {title: '编号', value: data.customerNo, type: 'copy'},
    {title: '性别', value: data.gender && data.gender.name},
    {title: '状态', value: data.followUpStatus && data.followUpStatus.name},
    {title: '等级', value: data.level ? data.level.code : 0, type: 'star'},
    {title: '电话', value: data.mobile, type: 'mobile'}
  ],
  getBottomButtons: ({instance, data}) => {
    if (data.responsible) {
      return [{
        title: '跟进',
        icon: images.base.ic_followup,
        click: () => RouteUtil.commonFollowUp({
          id: instance.id,
          module: instance.module,
          targetId: instance.id,
          targetName: instance.allData.nameData.name,
          onSuccess: () => {
            instance.fetchData();
            instance.tabFetchData('FollowUpTab');
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
      }];
    }
    return [{
      title: '分配',
      icon: images.all.ic_person,
      auth: 'wap-crm-customer-allocation',
      click: () => instance.allocationPerson()
    }, {
      title: '捞取',
      icon: images.all.ic_add,
      click: () => instance.obtainPerson()
    }];
  }
};
