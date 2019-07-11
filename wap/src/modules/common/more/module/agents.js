/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';

export default {
  rightTitleParams: (vueInstance) => {
    if (!vueInstance.params.params.responsible || !vueInstance.$store.state.user.userAuths['wap-crm-agent-edit']) {
      return {};
    }
    return {
      text: '编辑',
      onSuccess: () => {
        if (!vueInstance.hasAuth) {
          AlertUtil.showToast({txt: '只有负责人、协同人或者主管才能操作'});
          return;
        }
        RouteUtil.editInfo({
          ...vueInstance.params,
          onSuccess: () => {
            vueInstance.params.onSuccess && vueInstance.params.onSuccess();
            vueInstance.$router.go(-1);
          }
        });
      }
    };
  },
  transformData: (params) => {
    let {
      name, nickname, agentNo, mobile, address, createTime, lastFollowUpTime, obtainTime, nextFollowUpTime, lastActiveTime,
      gender, level, area, type, followUpStatus, category, label, remark, origin, giveUpReason,
      industry, ageRange, experience, identity, livingTime,
      wechatAccount,communication, beingConsulted, interestedly, advantage, business, valueJudgment,
      salesNextFollowUpTime,salesLastFollowUpTime
    } = params;
    return {
      data: [
        {title: '微信名', value: name},
        {title: '经纪人姓名', value: nickname},
        {title: '微信号', value: wechatAccount},
        {title: '经纪人编号', value: agentNo},
        {title: '经纪人性别', value: gender && gender.name},
        {title: '联系电话', value: mobile},
        {title: '经纪人等级', value: level && level.name},
        // {title: '经纪人来源', value: origin && origin.name},
        {title: '经纪人类别', value: type && type.name},
        // {title: '经纪人分类', value: category && category.name},
        // {title: '经纪人类型', value: ''},
        // {title: '经纪人标签', value: label},
        {title: '经纪人状态', value: followUpStatus && followUpStatus.name},
        {title: '经纪人地址', value: address},
        {title: '经纪人地区', value: area},
        {title: '年龄段', value: ageRange && ageRange.name},
        {title: '行业', value: industry},
        {title: '从业经验', value: experience && experience.name},
        {title: '身份', value: identity && identity.name},
        {title: '本地居住时间', value: livingTime && livingTime.name},
        {title: '是否愿意积极沟通', value: communication && communication.name},
        {title: '平时是否有人咨询买车', value: beingConsulted && beingConsulted.name},
        {title: '对经纪人模式是否感兴趣', value: interestedly && interestedly.name},
        {title: '认为宜买车是否有优势', value: advantage && advantage.name},
        {title: '对卖车的了解程度', value: valueJudgment && valueJudgment.name},
        {title: '对经纪人的价值判断', value: business && business.name},
        {title: 'BD备注', value: remark, type: 'html'},
        {title: '放弃理由', value: giveUpReason, type: 'html'},
        {title: '创建时间', value: createTime},
        // {title: '跟进时间', value: lastFollowUpTime},
        {title: '获取时间', value: obtainTime},
        {title: '地推下次跟进时间', value: nextFollowUpTime},
        {title: '地推最后跟进时间', value: lastFollowUpTime},
        {title: '销售下次跟进时间', value: salesNextFollowUpTime},
        {title: '销售最后跟进时间', value: salesLastFollowUpTime},
      ]
    };
  }
};
