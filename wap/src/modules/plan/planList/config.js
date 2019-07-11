/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */

import {RouteUtil} from '../../../utils/routeUtil';

/**
 * 获取正确的配置项
 * @param type    类型
 * @param tag     需要获取的字段
 * @returns {*}
 */
export const getCorrectParams = (type, tag) => {
  return (config[type] && config[type][tag]) || config[tag];
};

export const config = {
  rightTitleParams: (vueInstance) => {
    let items = [{
      id: '1',
      text: '今天',
      url: 'http://images.itsmycar.cn/button_today.png'
    }];
    if (
      vueInstance.params.type === 'clue' && vueInstance.$store.state.user.userAuths['wap-crm-clue-plan-auth'] ||
      vueInstance.params.type === 'agent' && vueInstance.$store.state.user.userAuths['wap-agents-add-auth']
    ) {
      items.push({
        id: '2',
        text: '新建'
      });
    }
    return {
      items,
      onSuccess: (data) => {
        if (data.id === '1') {
          vueInstance.selToDay();
        } else if (data.id === '2') {
          RouteUtil.commonPlanAdd({
            BACK_ACTION: {path: vueInstance.ROUTE_PATH},
            type: vueInstance.type,
            module: vueInstance.module,
            onSuccess: () => {
              vueInstance.refreshData();
            }
          });
        }
      }
    }
  },
  customer: {
    filterArray: ['customerLevel', 'followUpPlanStatus',
      ['responsible']]
  },
  agent: {
    filterArray: ['agentLevel', 'followUpPlanStatus',
      ['responsible']]
  },
  clue: {
    filterArray: ['clueIntentionGrade', 'followUpPlanStatus',
      ['responsible']]
  }
};
