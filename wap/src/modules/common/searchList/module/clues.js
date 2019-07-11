/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';


export default {
  rightTitleParams: (instance) => ({
    auth: 'wap-crm-clue-add',
    text: '新建',
    onSuccess: () => {
      RouteUtil.clueAdd({
        BACK_ACTION: {path: instance.ROUTE_PATH},
        onSuccess: () => {
          instance.refreshData();
        }
      });
    }
  }),
  chooseTitle: '选择线索',
  totalText: '条线索',
  searchText: '搜索姓名/手机/备注名称/线索编号',
  all: {
    title: '全部线索',
    filterArray: ['sort', 'clueIntentionGrade',
      ['clueStatus', 'clueOrigin', 'onLineClue', 'clueStore', 'groundPromotion', 'toStoreClue', 'clueType',
        'lastFollowUpTime', 'nextFollowUpTime', 'clueCreateTime',
        'clueObtainTime', 'clueResponsible', 'isActivity', 'clueTeamwork']]
  },
  follow: {
    rightTitleParams: () => ({}),
    title: '重点线索',
    filterArray: ['sort', 'clueIntentionGrade',
      ['clueStatus', 'clueOrigin', 'onLineClue', 'toStoreClue', 'clueType', 'lastFollowUpTime', 'nextFollowUpTime', 'clueCreateTime',
        'clueObtainTime', 'clueResponsible', 'isActivity', 'clueTeamwork']]
  },
  sea: {
    rightTitleParams: () => ({}),
    title: '线索公海',
    filterArray: [['clueOrigin', 'onLineClue', 'clueType', 'isActivity', 'clueCreateTime']]
  },
  invalid: {
    rightTitleParams: () => ({}),
    title: '无效线索',
    filterArray: ['clueFailSort',
      'clueIntentionGrade',
      ['clueOrigin', 'onLineClue', 'toStoreClue', 'clueType', 'lastFollowUpTime', 'clueFailTime', 'clueCreateTime',
        'clueResponsible', 'isActivity', 'clueTeamwork']
    ]
  }
};
