/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';
import {getFollowUpRecordsList} from '../../../../api/common';


export default {
  rightTitleParams: (vueInstance) => ({
    text: '新建',
    onSuccess: () => {
      RouteUtil.commonFollowUp({
        onSuccess: () => {
          vueInstance.refreshData();
        }
      });
    }
  }),
  fetchData: getFollowUpRecordsList,
  chooseTitle: '选择跟进记录',
  totalText: '条记录',
  searchText: '搜索姓名/手机/备注名称',
  onItemClick: ({cell}) => cell.resetShow(),
  customer: {
    title: '客户跟进记录',
    searchText: '搜索姓名/手机/备注名称/客户编号',
    rightTitleParams: (vueInstance) => ({
      text: '新建',
      onSuccess: () => {
        RouteUtil.commonFollowUp({
          module: 'customers',
          onSuccess: () => {
            vueInstance.refreshData();
          }
        });
      }
    }),
    filterArray: ['customerLevel',
      ['responsible']]
    // onItemClick: ({id, item, instance}) =>
    //   RouteUtil.commonFollowUp({
    //     id,
    //     module: 'customers',
    //     type: 'edit',
    //     targetId: item.targetId,
    //     targetName: item.targetName,
    //     onSuccess: () => {
    //       console.log(instance, '跟新成功');
    //       instance.refreshData();
    //     }
    //   })
  },
  clue: {
    title: '线索跟进记录',
    searchText: '搜索姓名/手机/备注名称/线索编号',
    rightTitleParams: (vueInstance) => ({
      text: '新建',
      auth: 'wap-crm-clue-followRecord-add',
      onSuccess: () => {
        RouteUtil.commonFollowUp({
          module: 'clues',
          onSuccess: () => {
            vueInstance.refreshData();
          }
        });
      }
    }),
    filterArray: ['clueIntentionGrade',
      ['responsible']]
    // onItemClick: ({id, item, instance}) => RouteUtil.commonFollowUp({
    //   id,
    //   module: 'clues',
    //   type: 'edit',
    //   targetId: item.targetId,
    //   targetName: item.targetName,
    //   onSuccess: () => instance.refreshData()
    // })
  },
  agent: {
    title: '经纪人跟进记录',
    auth: 'wap-crm-agent-followRecord-add',
    searchText: '搜索姓名/手机/备注名称/经纪人编号',
    rightTitleParams: (vueInstance) => ({
      text: '新建',
      onSuccess: () => {
        RouteUtil.commonFollowUp({
          module: 'agents',
          onSuccess: () => {
            vueInstance.refreshData();
          }
        });
      }
    }),
    filterArray: ['agentLevel', ['responsible']]
    // onItemClick: ({id, item, instance}) => RouteUtil.commonFollowUp({
    //   id,
    //   module: 'agents',
    //   type: 'edit',
    //   targetId: item.targetId,
    //   targetName: item.targetName,
    //   onSuccess: () => instance.refreshData()
    // })
  }
};
