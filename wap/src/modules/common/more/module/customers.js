/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';

export default {
  rightTitleParams: (vueInstance) => {
    if (!vueInstance.params.params.responsible || !vueInstance.$store.state.user.userAuths['wap-crm-customer-edit']) {
      return {};
    }
    return {
      text: '编辑',
      onSuccess: () => {
        if (!vueInstance.hasAuth) {
          AlertUtil.showToast({txt: '只有负责人、协同人或者主管才能操作'});
          return;
        }
        RouteUtil.clientAdd({
          ...vueInstance.params,
          type: 'edit',
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
      name, nickname, customerNo, mobile,
      gender, level, type, followUpStatus, industry, remark, origin
    } = params;
    return {
      data: [
        {title: '客户姓名', value: name},
        {title: '客户编号', value: customerNo},
        {title: '姓名备注', value: nickname},
        {title: '联系电话', value: mobile},
        {title: '客户性别', value: gender.name},
        {title: '客户来源', value: origin && origin.name},
        {title: '客户类型', value: type && type.name},
        {title: '客户状态', value: followUpStatus && followUpStatus.name},
        {title: '客户行业', value: industry},
        {title: '客户等级', value: level.code, type: 'rate'},
        // {title: '客户地址', value: area},
        {title: '备注信息', value: remark, type: 'html'}
      ]
    };
  }
};
