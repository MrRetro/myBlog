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
      customerName, customerMobile, customerGender, clueNo, customerId, vehicleModel, area, shoppingWay, clueCreateTime,
      appearance, interior, clueId, storeName, belongPlace, clueLevel, clueStatus, clueRemark, brokerId, brokerName, quotedTime, createTime, updateTime
    } = params;
    let data = [{
      title: '客户姓名',
      value: customerName,
      click: () => RouteUtil.commonDetail({id: customerId, module: 'customers', type: 'all'})
    },
    {title: '客户性别', value: customerGender && customerGender.name},
    {title: '客户电话', value: customerMobile},
    {title: '车型', value: vehicleModel},
    {title: '外观', value: appearance, type: 'color'},
    {title: '内饰', value: interior, type: 'color'},
    {
      title: '线索编号',
      value: clueNo,
      click: () => RouteUtil.commonDetail({id: clueId, module: 'clues', type: 'all'})
    },
    {title: '线索状态', value: clueStatus && clueStatus.name},
    {title: '意向等级', value: clueLevel && clueLevel.name},
    {title: '预计提车时间', value: area},
    {title: '购车方式', value: shoppingWay && shoppingWay.name},
    {title: '线索归属地', value: belongPlace},
    {title: '线索归属地面店', value: storeName}];
    if (brokerId) {
      data.push({
        title: '关联经纪人',
        value: brokerName,
        click: () => RouteUtil.commonDetail({id: brokerId, module: 'agents', type: 'all'})
      });
    }
    data.push(...[{title: '线索备注', value: clueRemark, type: 'html'},
      {title: '线索创建时间', value: clueCreateTime},
      {title: '发起询价时间', value: createTime},
      {title: '提交报价时间', value: quotedTime},
      {title: '单据更新时间', value: updateTime}
    ]);
    return {
      data
    };
  }
};
