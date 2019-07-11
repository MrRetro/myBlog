/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';

export default {
  rightTitleParams: () => ({
    // text: '编辑',
    // onSuccess: () => {
    //   RouteUtil.orderEdit({
    //     ...vueInstance.params,
    //     onSuccess: () => {
    //       vueInstance.params.onSuccess && vueInstance.params.onSuccess();
    //       vueInstance.$router.go(-1);
    //     }
    //   });
    // }
  }),
  transformData: (params) => {
    const {
      name, orderNo, mobile, outColor, inColor, carName, receiptsNo, orderType, clueNo, shoppingWay,
      followUpStatus, giveUpReason, createTime, updateTime, finishTime, customerId, clueId, agent, agentResponsible
    } = params;
    let data = [
      {
        title: '客户姓名',
        value: name,
        click: () => RouteUtil.commonDetail({id: customerId, module: 'customers', type: 'all'})
      },
      {title: '客户电话', value: mobile},
      {title: '车型信息', value: carName},
      {title: '外观', value: outColor},
      {title: '内饰', value: inColor},
      {title: '合同编号', value: orderNo},
      {title: '单据编号', value: receiptsNo},
      {title: '订单类型', value: orderType && orderType.name},
      {
        title: '关联线索',
        value: clueNo,
        click: () => RouteUtil.commonDetail({id: clueId, module: 'clues', type: 'all'})
      },
      {title: '关联经纪人', value: agent && agent.name},
      {title: '关联地推', value: agentResponsible && agentResponsible.name},
      {title: '购车方式', value: shoppingWay && shoppingWay.name},
      {title: '门店信息', value: followUpStatus && followUpStatus.name},
      {title: '订单生成时间', value: createTime},
      {title: '订单更新时间', value: updateTime},
      {title: '实际交车时间', value: giveUpReason},
      {title: '订单完成时间', value: finishTime}
    ].filter(({title, value}) => !((title === '关联线索' || title === '关联地推' || title === '关联经纪人') && !(value)));
    return {
      data
    };
  }
};
