/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {saveFollowUpRecord, updateFollowUpRecord} from '../../../api/common';
import {getFollowUpPurpose} from '../../../api/followUpPlan';
import {handleForm} from '../../../utils/commonUtil';
import {RouteUtil} from "../../../utils/routeUtil";


export const config = {
  customers: {
    title: '客户跟进',
    transformData: (vueInstance) => {
      let {targetName, targetId} = vueInstance.$route.params;
      let way = {
        text: '',
        value: ''
      };
      let purpose = {
        text: '',
        value: ''
      };
      let nextExecutionTime = '';
      let record = '';
      if (vueInstance.isEditMode && vueInstance.data) {
        way.text = vueInstance.data.way.name;
        way.value = vueInstance.data.way.code;
        purpose.text = vueInstance.data.purpose;
        purpose.value = vueInstance.data.purpose;
        record = vueInstance.data.record;
        nextExecutionTime = vueInstance.data.nextExecutionTime ? vueInstance.data.nextExecutionTime.split(' ')[0] : '';
        targetName = vueInstance.params.targetName;
        targetId = vueInstance.params.targetId;
      }
      const source = vueInstance.$store.state.menu.followUpWay.map(item => ({key: item.name, value: item.code}));
      return [
        {
          type: 'selCustomer',
          title: '跟进客户',
          text: targetName,
          tag: 'targetId',
          value: targetId,
          placeholder: '请输入客户名称',
          indent: false,
          disable: !!targetId,
          required: true
        },
        {
          type: 'select',
          title: '跟进方式',
          text: way.text,
          value: way.value,
          tag: 'way',
          placeholder: '请选择跟进方式',
          selData: {source},
          rules: {required: true, empty: true},
          required: true
        }, {
          type: 'ajaxSelect',
          title: '下次跟进目的',
          text: purpose.text,
          value: purpose.value,
          selData: {
            resource: () => getFollowUpPurpose('customer').then(list => list.map(item => ({
              key: item.value,
              value: item.value
            })))
          },
          tag: 'purpose',
          placeholder: '请选择下次跟进目的',
          rules: {required: false}
        },
        {
          type: 'date',
          title: '下次跟进时间',
          text: nextExecutionTime,
          value: nextExecutionTime,
          tag: 'nextExecutionTime',
          min: new Date(),
          placeholder: '请选择下次跟进时间',
          rules: {required: false, empty: true},
          required: false
        },
        {
          type: 'textarea',
          title: '跟进记录',
          text: record,
          placeholder: '请输入跟进记录',
          tag: 'record',
          rules: {required: true, empty: true, min: 5, max: 100},
          required: true
        }
      ];
    },
    commit: async (vueInstance, form) => {
      const id = vueInstance.params.id;
      if (vueInstance.isEditMode) {
        await updateFollowUpRecord({targetId: vueInstance.data.targetId, id, target: 0, ...handleForm(form)});
      } else {
        let params = {targetId: id, target: 0, ...handleForm(form)};
        if (vueInstance.params.planId) {
          params.planId = vueInstance.params.planId;
        }
        await saveFollowUpRecord(params);
      }
      vueInstance.params.onSuccess && vueInstance.params.onSuccess();
      vueInstance.$router.go(-1);
    }
  },
  agents: {
    transformData: (vueInstance) => {
      let {targetName, targetId} = vueInstance.$route.params;
      let way = {
        text: '',
        value: ''
      };
      let purpose = {
        text: '',
        value: ''
      };
      let nextExecutionTime = '';
      let record = '';
      if (vueInstance.isEditMode && vueInstance.data) {
        way.text = vueInstance.data.way.name;
        way.value = vueInstance.data.way.code;
        purpose.text = vueInstance.data.purpose;
        purpose.value = vueInstance.data.purpose;
        record = vueInstance.data.record;
        nextExecutionTime = vueInstance.data.nextExecutionTime ? vueInstance.data.nextExecutionTime.split(' ')[0] : '';
        targetName = vueInstance.params.targetName;
        targetId = vueInstance.params.targetId;
      }
      const source = vueInstance.$store.state.menu.followUpWay.map(item => ({key: item.name, value: item.code}));
      return [
        {
          type: 'selAgent',
          title: '跟进经纪人',
          tag: 'targetId',
          text: targetName,
          value: targetId,
          placeholder: '请输入跟进经纪人',
          disable: !!targetId,
          required: true
        },
        {
          type: 'select',
          title: '跟进方式',
          text: way.text,
          value: way.value,
          tag: 'way',
          placeholder: '请选择跟进方式',
          rules: {required: true},
          selData: {source},
          required: true
        },
        {
          type: 'ajaxSelect',
          title: '跟进目的',
          text: purpose.text,
          value: purpose.value,
          selData: {
            resource: () => getFollowUpPurpose('agent').then(list => list.map(item => ({
              key: item.value,
              value: item.value
            })))
          },
          tag: 'purpose',
          placeholder: '请选择跟进目的',
          rules: {required: false}
        },
        {
          type: 'date',
          title: '下次跟进时间',
          text: nextExecutionTime,
          tag: 'nextExecutionTime',
          value: nextExecutionTime,
          min: new Date(),
          placeholder: '请选择下次跟进时间',
          rules: {required: true},
          required: true
        },
        {
          type: 'text',
          title: '跟进记录',
          text: record,
          tag: 'record',
          placeholder: '请输入跟进记录',
          rules: {required: true, empty: true, min: 5, max: 100},
          required: true
        }
      ];
    },
    commit: async (vueInstance, form) => {
      const id = vueInstance.params.id;
      if (vueInstance.isEditMode) {
        await updateFollowUpRecord({targetId: vueInstance.data.targetId, id, target: 2, ...handleForm(form)});
      } else {
        await saveFollowUpRecord({targetId: id, target: 2, ...handleForm(form)});
      }
      vueInstance.params.onSuccess && vueInstance.params.onSuccess();
      vueInstance.$router.back();
    }
  },
  clues: {
    title: '线索跟进',
    transformData: (vueInstance) => {
      let {targetName, targetId} = vueInstance.$route.params;
      let way = {
        text: '',
        value: ''
      };
      let purpose = {
        text: '',
        value: ''
      };
      let clueLevel = {
        text: '',
        value: ''
      };
      let nextExecutionTime = '';
      let record = '';
      if (vueInstance.isEditMode && vueInstance.data) {
        way.text = vueInstance.data.way.name;
        way.value = vueInstance.data.way.code;
        clueLevel.text = vueInstance.data.clueLevel.name;
        clueLevel.value = vueInstance.data.clueLevel.code;
        purpose.text = vueInstance.data.purpose;
        purpose.value = vueInstance.data.purpose;
        record = vueInstance.data.record;
        nextExecutionTime = vueInstance.data.nextExecutionTime ? vueInstance.data.nextExecutionTime.split(' ')[0] : '';
        targetName = vueInstance.params.targetName;
        targetId = vueInstance.params.targetId;
      }
      const wap = vueInstance.$store.state.menu.followUpWay.filter(item => item.name !== '无')
        .map(item => ({key: item.name, value: item.code}));
      const clueIntentionGrade = vueInstance.$store.state.menu.clueIntentionGrade.filter(item => item.name !== '无').map(item => ({
        key: item.name,
        value: item.code
      }));
      return [
        {
          type: 'selClue',
          title: '跟进线索',
          text: targetName,
          value: targetId,
          tag: 'targetId',
          params: {type: 'clue'},
          placeholder: '请选择线索',
          rules: {required: true},
          disable: !!targetId,
          required: true
        },
        {
          type: 'select',
          title: '跟进方式',
          text: way.text,
          value: way.value,
          tag: 'way',
          placeholder: '请选择跟进方式',
          selData: {source: wap},
          rules: {required: true},
          required: true
        },
        {
          type: 'select',
          title: '线索等级',
          text: clueLevel.text,
          value: clueLevel.value,
          tag: 'clueLevel',
          selData: {source: clueIntentionGrade},
          placeholder: '请选择线索等级',
          rules: {required: true},
          required: true,
          disable: vueInstance.isEditMode
        },
        {
          type: 'date',
          title: '下次跟进时间',
          min: new Date(),
          text: nextExecutionTime,
          value: nextExecutionTime,
          tag: 'nextExecutionTime',
          placeholder: '请选择下次跟进时间',
          rules: {required: true},
          disable: true,
          required: true
        },
        {
          type: 'textarea',
          title: '跟进记录',
          text: record,
          tag: 'record',
          placeholder: '请输入跟进记录',
          rules: {required: true, empty: true, min: 5, max: 100},
          required: true
        }
      ];
    },
    commit: async (vueInstance, form) => {
      const id = vueInstance.params.id;
      if (vueInstance.isEditMode) {
        await updateFollowUpRecord({targetId: vueInstance.data.targetId, id, target: 1, ...handleForm(form)});
      } else {
        await saveFollowUpRecord({targetId: id, target: 1, ...handleForm(form)});
      }
      vueInstance.params.onSuccess && vueInstance.params.onSuccess();
      vueInstance.$router.go(-1);
    }
  }
};
