/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {ddApi} from '../../../../api/dingding';
import {RouteUtil} from '../../../../utils/routeUtil';
import {getStatusTime, share} from '../commonFunc';
import {handleDateString} from '../../../../utils/commonUtil';
import {cancelFollowUpPlan, delayFollowUpPlan} from '../../../../api/followUpPlan';
import {AlertUtil} from '../../../../utils/AlertUtil';
import {images} from '../../../../assets';


export default {
  title: '计划详情',
  getTabConfig: () => [{title: '跟进记录', tab: 'FollowUpTab'}],
  getHintShowText: ({data}) => getStatusTime(data.plannedTime, data.status.code !== 1),
  getRightParams: ({instance, data}) => ({
    text: '...',
    onSuccess: () => {
      let items = [];
      if (data.status.code !== 1 && data.status.code !== 3 && data.status.code !== 2) {
        if(
          (instance.type === 'agent' && instance.$store.state.user.userAuths['wap-crm-agent-plan-edit']) ||
          (instance.type === 'clue' && instance.$store.state.user.userAuths['wap-crm-clue-plan-edit']) ||
          (instance.type === 'customer' && instance.$store.state.user.userAuths['wap-crm-customer-plan-edit'])
        ){
          items.push({id: '1', text: '编辑计划'});
        }
        if(
          (instance.type === 'agent' && instance.$store.state.user.userAuths['wap-crm-agent-plan-cancel']) ||
          (instance.type === 'clue' && instance.$store.state.user.userAuths['wap-crm-clue-plan-cancel']) ||
          (instance.type === 'customer' && instance.$store.state.user.userAuths['wap-crm-customer-plan-cancel'])
        ) {
          items.push({id: '2', text: '取消计划'});
        }
      }
      items.push({id: '3', text: '分享计划'});
      ddApi.setPopMenu({
        items,
        onSuccess: ({id}) => {
          switch (id) {
            case '1':
              RouteUtil.commonPlanEdit({
                id: instance.id,
                type: instance.type,
                onSuccess: () => {
                  instance.fetchData();
                }
              });
              break;
            case '2':
              AlertUtil.showInputPop({
                title: '取消计划',
                placeholder: '请输入取消理由…',
                onSuccess: async (text, hide) => {
                  if (text.length < 5 || text.length > 100) {
                    AlertUtil.showToast({txt: '请输入5-100个字符'});
                    return;
                  }
                  if (text) {
                    hide();
                    await cancelFollowUpPlan({id: instance.id, reason: text});
                    AlertUtil.showToast({txt: '取消成功', type: 'success'});
                    instance.fetchData();
                  } else {
                    AlertUtil.showToast({txt: '请输入取消理由'});
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
  getInfoData: ({data}) => {
    const {targetMsg, status, actualTime, cancellationReasons} = data;
    const {mobile, number, gender, level, address} = targetMsg;
    let dataArray = [
      {title: '性别', value: gender && gender.name},
      {title: '编号', value: number, type: 'copy'},
      {title: '地址', value: address},
      {title: '等级', value: level && level.code, type: 'star'},
      {title: '电话', value: mobile, type: 'mobile'},
      {
        title: '状态',
        value: data.status && data.status.name,
        type: data.status.code === 3 ? 'cancel' : '',
        message: '计划已取消',
        hint: `计划取消理由:${cancellationReasons}`
      }
    ];
    if (status.code === 1) {
      dataArray.push({value: `计划执行时间${actualTime}`, type: 'single'});
    }
    return dataArray;
  },
  getPersonData: ({data}) => ({
    subname: '执行人',
    pater: data.planUser ? data.planUser.map(item => ({
      id: item.userId,
      name: item.userName,
      ico: item.userHeadUrl
    })) : []
  }),
  getNameData: ({data}) => ({
    name: data.targetMsg.name,
    remark: data.targetMsg.nickname,
    follow: data.hasFollow,
    showFollow: false
  }),
  getBottomButtons: ({instance, data}) => {
    if (data.status.code === 1 || data.status.code === 3 || data.status.code === 2) return [];
    let auth = instance.$store.state.user.userAuths['wap-crm-clue-plan-followUp'];
    let arr = [
      {
        title: '跟进',
        icon: images.all.ico_go,
        click: () => {
          if(auth){
            RouteUtil.commonFollowUp({
              module: `${instance.type}s`,
              targetId: instance.allData.targetId,
              planId: instance.allData.id,
              targetName: instance.allData.targetMsg.name,
              onSuccess: () => {
                instance.fetchData();
              }
            })
          }else{
            instance.$AlertUtil.showToast({txt: '请用yiauto销售小程序跟进线索'});
          }
        }
      }
    ];

    if(
      (instance.type === 'agent' && instance.$store.state.user.userAuths['wap-crm-agent-plan-delay']) ||
      (instance.type === 'clue' && instance.$store.state.user.userAuths['wap-crm-clue-plan-delay']) ||
      (instance.type === 'customer' && instance.$store.state.user.userAuths['wap-crm-customer-plan-delay'])
    ) {
      arr.push(
        {
          title: '延期',
          icon: images.all.ic_clock,
          click: () => ddApi.datepicker({
            min: new Date(),
            onSuccess: async ({value}) => {
              await delayFollowUpPlan({id: instance.id, postponeTime: handleDateString(value)});
              AlertUtil.showToast({txt: '延期成功', type: 'success'});
              instance.fetchData();
            }
          })
        }
      );
    }
    return arr;
  },
  customer: {
    getNameData: ({data}) => {
      const {targetMsg} = data;
      const {nickname, name, isAttention} = targetMsg;
      return {
        name,
        remark: nickname,
        follow: isAttention,
        showFollow: false
      };
    }
  },
  agent: {
    getInfoData: ({data}) => {
      const {targetMsg, address, status, actualTime, cancellationReasons} = data;
      const {mobile, number, gender, level} = targetMsg;
      let dataArray = [
        {title: '性别', value: gender && gender.name},
        {title: '编号', value: number, type: 'copy'},
        {title: '地址', value: address},
        {title: '等级', value: level && level.name},
        {title: '电话', value: mobile, type: 'mobile'},
        {
          title: '状态',
          value: data.status && data.status.name,
          type: data.status.code === 3 ? 'cancel' : '',
          message: '计划已取消',
          hint: `计划取消理由:${cancellationReasons}`
        }
      ];
      if (status.code === 1) {
        dataArray.push({value: `计划执行时间${actualTime}`, type: 'single'});
      }
      return dataArray;
    }
  },
  clue: {
    getNameData: ({data}) => ({
      carName: data.targetMsg.carName,
      follow: data.targetMsg.isAttention,
      showFollow: false
    }),
    getInfoData: ({data}) => {
      const {targetMsg, status, actualTime, cancellationReasons} = data;
      const {mobile, name, number} = targetMsg;
      let dataArray = [
        {title: '姓名', value: name},
        {title: '编号', value: number, type: 'copy'},
        {title: '性别', value: targetMsg.gender && targetMsg.gender.name},
        {title: '等级', value: targetMsg.level && targetMsg.level.name},
        {title: '电话', value: mobile, type: 'mobile'},
        {
          title: '状态',
          value: data.status && data.status.name,
          type: data.status.code === 3 ? 'cancel' : '',
          message: '计划已取消',
          hint: `计划取消理由:${cancellationReasons}`
        }
      ];
      if (status.code === 1) {
        dataArray.push({value: `计划执行时间${actualTime}`, type: 'single'});
      }
      return dataArray;
    }
  }
};
