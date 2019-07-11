/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';
import {getClueEditAble} from '../../detail/commonFunc';

export default {
  rightTitleParams: (vueInstance) => {
    // console.log(vueInstance);
    // console.log(vueInstance.data.status.code)
    // debugger
    if (
      !vueInstance.params.params.responsibleId ||
      !vueInstance.$store.state.user.userAuths['wap-crm-clue-edit'] ||
      !getClueEditAble(vueInstance.data.status.code)
    ) {
      return {};
    }
    return {
      text: '编辑',
      onSuccess: () => {
        if (!vueInstance.hasAuth) {
          AlertUtil.showToast({txt: '只有负责人、协同人或者主管才能操作'});
          return;
        }
        RouteUtil.clueEdit({
          id: vueInstance.id,
          onSuccess: () => {
            vueInstance.params.onSuccess && vueInstance.params.onSuccess();
            vueInstance.$router.go(-1);
          }
        });
      }
    };
  },
  transformData: (params) => {
    const {
      customerName, carName, customerMobile,
      customerGender, inColor, area, outColor, groundPromotionId, groundPromotionName, intentionGrade, customerId, remark, storeSimpleDTO, shoppingWay,
      brokerName, brokerId, intentionType, coupon,
      darkLevel, shoppingTime, compareNum, to4s, quotation, qualifications
    } = params;
    let otherData = [];
    if (groundPromotionId) {
      otherData.push({title: '关联地推', value: groundPromotionName});
    }
    if (brokerId) {
      otherData.push({
        title: '关联经纪人',
        value: brokerName,
        click: () => RouteUtil.commonDetail({id: brokerId, module: 'agents', type: 'all'})
      });
    }
    if (coupon) {
      otherData.push({
        title: '活动信息',
        value: '客户已领取1000元现金抵用券，请知悉！'
      });
    }
    let clueInfo = [];
    if (intentionType.code === 2) {
      clueInfo.push({title: '意向车型', value: '意向模糊'});
    } else {
      clueInfo.push(...[{title: '意向车型', value: carName},
        {title: '外观', value: outColor},
        {title: '内饰', value: inColor}]);
    }
    if(darkLevel && darkLevel.name){
      clueInfo.push({title: '实际等级', value: darkLevel.name});
    }
    clueInfo.push(...[
      {title: '意向等级', value: intentionGrade && intentionGrade.name},
      {title: '线索地区', value: area},
      {title: '地面店', value: storeSimpleDTO && storeSimpleDTO.storeName},
      {title: '备注信息', value: remark, type: 'html'},
      {title: '购车方案', value: shoppingWay && shoppingWay.name},
      {title: '预计购车时间', value: shoppingTime && shoppingTime.name},
      {title: '对比车型数量', value: compareNum && compareNum.name},
      {title: '是否去过4S店', value: to4s ? '是' : '否'},
      {title: '是否有4S店报价单', value: quotation ? '是' : '否'},
      {title: '购车资格', value: qualifications ? '是' : '否'}
    ]);
    return {
      type: 'section',
      data: [{
        title: '客户信息',
        data: [
          {
            title: '客户姓名',
            value: customerName,
            click: () => RouteUtil.commonDetail({id: customerId, module: 'customers', type: 'all'})
          },
          {title: '客户性别', value: customerGender && customerGender.name},
          {title: '联系电话', value: customerMobile}
        ]
      },
      {
        title: '线索信息',
        data: clueInfo
      },
      {
        title: '其它信息',
        data: otherData
      }]
    };
  }
};
