/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */

export default {
  rightTitleParams: () => ({
    // text: '开通',
    // onSuccess: () => {
    //   ddApi.setPopMenu({
    //     items: [
    //       {id: '1', text: '协助开通'},
    //       {id: '2', text: '二维码开通'}],
    //     onSuccess: ({id}) => {
    //       switch (id) {
    //         case '1':
    //           RouteUtil.assistOpen();
    //           break;
    //         case '2':
    //           RouteUtil.qrcodeOpen();
    //           break;
    //       //         default:
    //       //           break;
    //       //       }
    //       //     }
    //   });
    // }
  }),
  totalText: '名经纪人',
  searchText: '搜索姓名/手机/备注名称/经纪人编号',
  chooseTitle: '选择经纪人',
  all: {
    title: '全部经纪人',
    filterArray: ['agentSort', 'agentLevel',
      ['agentFollowUpStatus', 'onLineAgent', 'agentType', 'lastFollowUpTime', 'nextFollowUpTime',
        'agentObtainTime', 'agentCreateTime', 'agentResponsible', 'agentTeamwork']]
  },
  follow: {
    title: '重点经纪人',
    filterArray: ['agentSort', 'agentLevel',
      ['agentFollowUpStatus', 'onLineAgent', 'agentType', 'lastFollowUpTime', 'nextFollowUpTime',
        'agentObtainTime', 'agentCreateTime', 'agentResponsible', 'agentTeamwork']]
  },
  sea: {
    title: '经纪人公海',
    filterArray: [['agentOrigin', 'onLineAgent', 'agentType', 'agentCreateTime']]
  }
};
