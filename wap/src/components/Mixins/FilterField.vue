<script>
import {mapState} from 'vuex';
import {getSpaceDate} from '../../utils/TimeUtil';

export default {
  props: ['filterArray'],
  data() {
    return {
      condition: {},
      orders: []
    };
  },
  computed: {
    ...mapState({
      // 客户筛选项
      menu: state => state.menu
    }),
    isLeader() {
      return this.$store.getters['user/isLeader'];
    },
    conditions() {
      return {
        sort: {
          key: 'sort',
          name: '最近创建',
          values: [
            {code: 'createTime', name: '最近创建'},
            {code: 'lastFollowUpTime', name: '最后跟进'},
            {code: 'obtainTime', name: '最近获取'},
            {code: 'nextFollowUpTime', name: '下次跟进'}
          ]
        },

        lastFollowUpTime: this.getTimeTypeParams('lastFollowUpTime', '最后跟进时间'),
        nextFollowUpTime: this.getTimeTypeParams('nextFollowUpTime', '下次跟进时间'),

        agentSort: {
          key: 'sort',
          name: '最近创建',
          values: [
            {code: 'createTime', name: '最近创建'},
            {code: 'lastFollowUpTime', name: '最近跟进'},
            {code: 'obtainTime', name: '最近获取'},
            {code: 'nextFollowUpTime', name: '下次跟进'},
            {code: 'lastActiveTime', name: '最后活跃'},
            {code: 'nearestDistance', name: '离我最近'}
          ]
        },
        orderSort: {
          key: 'sort',
          name: '订单创建时间',
          values: [
            {code: 'createTime', name: '订单创建时间'},
            {code: 'updateTime', name: '订单跟新时间'},
            {code: 'deliveryTime', name: '实际交车时间'},
            {code: 'finishTime', name: '订单完成时间'}
          ]
        },
        enquirySort: {
          key: 'sort',
          name: '线索创建时间',
          values: [
            {code: 'clueCreateTime', name: '线索创建时间'},
            {code: 'updateTime', name: '单据更新时间'},
            {code: 'quotedTime', name: '提交报价时间'},
            {code: 'createTime', name: '发起询价时间'}
          ]
        },
        quotedRecordsSort: {
          key: 'sort',
          name: '提交报价时间',
          values: [
            {code: 'clueCreateTime', name: '线索创建时间'},
            {code: 'enquiryTime', name: '发起询价时间'},
            {code: 'createTime', name: '提交报价时间'}
          ]
        },
        customerOrigin: {
          key: 'origin',
          name: '客户来源',
          values: this.menu.customerOrigin
        },
        customerType: {
          key: 'type',
          name: '客户类型',
          values: this.menu.customerType
        },
        customerFastScreening: {
          key: 'fastScreening',
          name: '客户负责人',
          values: this.menu.customerFastScreening
        },
        responsible: {
          key: 'responsibleId',
          name: '负责人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: 'ME'},
            {name: '下属', code: 'MY_UNDERLING'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },

        customerResponsible: {
          key: 'responsible',
          name: '客户负责人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '1', key: 'fastScreening'},
            {name: '下属', code: '3', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        customerTeamwork: {
          key: 'teamwork',
          name: '客户协同人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '2', key: 'fastScreening'},
            {name: '下属', code: '4', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        agentResponsible: {
          key: 'responsible',
          name: '经纪人负责人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '1', key: 'fastScreening'},
            {name: '下属', code: '3', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        agentTeamwork: {
          key: 'teamwork',
          name: '经纪人协同人',
          values: this.getPersonItem(this.isLeader, [
            // {name: '我的', code: '2', key: 'fastScreening'},
            // {name: '下属', code: '4', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        clueResponsible: {
          key: 'responsible',
          name: '线索负责人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '1', key: 'fastScreening'},
            {name: '下属', code: '3', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        clueTeamwork: {
          key: 'teamwork',
          name: '线索协同人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '2', key: 'fastScreening'},
            {name: '下属', code: '4', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        orderResponsible: {
          key: 'responsible',
          name: '单据负责人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '1', key: 'fastScreening'},
            {name: '下属', code: '3', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        orderTeamwork: {
          key: 'teamwork',
          name: '单据协同人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: '2', key: 'fastScreening'},
            {name: '下属', code: '4', key: 'fastScreening'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        teamwork: {
          key: 'teamwork',
          name: '协同人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我的', code: 'ME'},
            {name: '下属', code: 'MY_UNDERLING'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        operator: {
          key: 'operator',
          name: '执行人',
          values: this.getPersonItem(this.isLeader, [
            {name: '我负责的', code: 'ME'},
            {name: '我下属的', code: 'MY_UNDERLING'},
            {name: '其它', code: '', action: 'multipleChoose'}
          ])
        },
        customerLevel: {
          key: 'level',
          name: '客户等级',
          values: [{code: '', action: 'ignore', name: '全部'}, ...this.menu.customerLevel]
        },
        customerCreateTime: this.getTimeTypeParams('createTime', '客户创建时间'),
        customerObtainTime: this.getTimeTypeParams('obtainTime', '客户获取时间'),


        agentOrigin: {
          key: 'origin',
          name: '经纪人来源',
          values: this.menu.agentOrigin
        },
        agentType: {
          key: 'type',
          name: '经纪人类别',
          values: this.menu.agentType
        },
        agentCategory: {
          key: 'category',
          name: '经纪人分类',
          values: this.menu.agentCategory
        },
        agentFastScreening: {
          key: 'fastScreening',
          name: '经纪人负责人',
          values: this.menu.agentFastScreening
        },
        agentLevel: {
          key: 'level',
          name: '经纪人等级',
          values: [{code: '', action: 'ignore', name: '全部'}, ...this.menu.agentLevel]
        },
        agentFollowUpStatus: {
          key: 'followUpStatus',
          name: '经纪人状态',
          values: this.menu.agentFollowUpStatus
        },
        agentObtainTime: this.getTimeTypeParams('obtainTime', '经纪人获取时间'),
        agentCreateTime: this.getTimeTypeParams('createTime', '经纪人创建时间'),
        userLocation: state => ({position: [state.user.location.latitude, state.user.location.longitude]}),

        clueFailSort: {
          key: 'sort',
          name: '默认排序',
          values: [
            {code: 'lastFollowUpTime', name: '最后跟进'},
            {code: 'createTime', name: '最近创建'},
            {code: 'failTime', name: '最近失效'}
          ]
        },
        clueCreateTime: this.getTimeTypeParams('createTime', '线索创建时间'),
        clueFailTime: this.getTimeTypeParams('failTime', '线索失效时间'),
        clueObtainTime: this.getTimeTypeParams('obtainTime', '线索获取时间'),
        clueStatus: {
          key: 'status',
          name: '线索状态',
          values: this.menu.clueStatus
        },
        clueOrigin: {
          key: 'source',
          name: '线索来源',
          values: this.menu.clueSource
        },
        clueType: {
          key: 'type',
          name: '线索类型',
          values: this.menu.clueType
        },
        onLineClue: {
          key: 'isOnline',
          name: '是否是线上线索',
          values: [{code: 1, name: '是'}, {code: 0, name: '否'}]
        },
        isActivity: {
          key: 'isActivity',
          name: '活动方案',
          values: [{code: '1', name: '优惠券'}, {code: '0', name: '无活动'}]
        },
        toStoreClue: {
          key: 'toStoreClue',
          name: '是否到店',
          values: [{code: 1, name: '是'}, {code: 0, name: '否'}]
        },
        onLineAgent: {
          key: 'isOnline',
          name: '是否是线上经纪人',
          values: [{code: 1, name: '是'}, {code: 0, name: '否'}]
        },
        isQuoted: {
          key: 'isQuoted',
          name: '是否报价',
          values: [{code: 1, name: '是'}, {code: 0, name: '否'}]
        },
        clueIntentionGrade: {
          key: 'intentionGrade',
          name: '线索意向等级',
          values: [{code: '', action: 'ignore', name: '全部'}, ...this.menu.clueIntentionGrade]
        },
        orderType: {
          key: 'orderType',
          name: '业务类型',
          values: this.menu.orderType
        },
        orderStatus: {
          key: 'status',
          name: '订单状态',
          values: this.menu.orderStatus
        },
        orderContractStatus: {
          key: 'orderContractStatus',
          name: '单据状态',
          values: this.menu.orderContractStatus
        },
        orderBelongPlaceId: {
          key: 'belongPlaceId',
          name: '订单所在地',
          values: [
            {name: '选择', code: '', action: 'address'}
          ]
        },
        orderBelongStoreId: {
          key: 'belongStoreId',
          name: '门店信息',
          values: [
            {name: '选择', code: '', action: 'store'}
          ]
        },
        orderFastScreening: {
          key: 'fastScreening',
          name: '负责或协同人',
          values: this.menu.orderFastScreening
        },
        orderCreateTime: this.getTimeTypeParams('createTime', '订单创建时间'),

        followUpPlanStatus: {
          key: 'status',
          name: '跟进状态',
          values: [{code: '', action: 'ignore', name: '全部'}, ...this.menu.followUpPlanStatus]
        },
        followUpRecordFastScreening: {
          key: 'fastScreening',
          name: '负责人',
          values: this.menu.followUpRecordFastScreening
        },
        followUpWay: {
          key: 'way',
          name: '跟进方式',
          values: this.menu.followUpWay
        },
        followUpUpdateTime: this.getTimeTypeParams('executionTime', '跟进时间'),

        enquiryStatus: {
          key: 'status',
          name: '单据状态',
          values: this.menu.enquiryStatus
        },
        invoiceType: {
          key: 'invoiceType',
          name: '发票类型',
          values: this.menu.invoiceType
        },
        insuranceType: {
          key: 'insuranceType',
          name: '保险要求',
          values: this.menu.insuranceType
        },
        clueLevel: {
          key: 'clueLevel',
          name: '线索等级',
          values: this.menu.clueIntentionGrade.filter(item => item.name !== '无')
        },
        clueShoppingWay: {
          key: 'shoppingWay',
          name: '购车方式',
          values: this.menu.clueShoppingWay
        },
        enquiryCreateTime: this.getTimeTypeParams('createTime', '单据创建时间'),
        quotedTime: this.getTimeTypeParams('quotedTime', '订单完成时间'),
        enquiryUpdateTime: this.getTimeTypeParams('updateTime', '单据更新时间'),
        enquiryBelongPlaceId: {
          key: 'belongPlace',
          name: '线索所在地',
          values: [
            {name: '选择', code: '', action: 'address'}
          ]
        },
        enquiryArea: {
          key: 'area',
          name: '上牌地',
          values: [
            {name: '选择', code: '', action: 'address'}
          ]
        },
        store: {
          key: 'store',
          name: '门店信息',
          values: [
            {name: '选择', code: '', action: 'store'}
          ]
        },
        groundPromotion: {
          key: 'groundPromotionId',
          name: '关联地推',
          values: [
            {name: '选择', code: '', action: 'groundPromotion'}
          ]
        },
        clueStore: {
          key: 'storeSimpleDTO',
          name: '门店信息',
          values: [
            {name: '选择', code: '', action: 'store'}
          ]
        },
        responsibleArea: {
          key: 'responsibleArea',
          name: '负责区域',
          values: this.menu.responsibleAreaList
        },
        acceptStatus: {
          key: 'acceptStatus',
          name: '采纳状态',
          values: this.menu.acceptStatus
        },
        clueStatusByEnquriy: {
          key: 'clueStatus',
          name: '线索状态',
          values: this.menu.clueStatusByEnquriy
        }
      };
    },
    allFilterData() {
      return this.filterArray.map(item => {
        if (Array.isArray(item)) {
          return {
            name: '全部筛选',
            isAllFilter: true,
            selectedIndex: -1,
            values: item.map(key => ({...this.conditions[key], selectedIndex: -1, isOpen: true}))
          };
        }
        return {...this.conditions[item], selectedIndex: -1};
      });
    }
  },
  methods: {
    getTimeTypeParams(key, name) {
      return {
        key,
        name,
        type: 'date',
        values: [{
          name: '最近一周',
          startTime: getSpaceDate(7),
          endTime: getSpaceDate()
        }, {
          name: '最近半个月',
          startTime: getSpaceDate(15),
          endTime: getSpaceDate()
        }, {
          name: '最近一个月',
          startTime: getSpaceDate(30),
          endTime: getSpaceDate()
        }, {
          name: '2个月以上',
          startTime: getSpaceDate(60),
          endTime: getSpaceDate()
        }, {
          name: '自定义',
          action: 'date',
          startTime: getSpaceDate(60),
          endTime: getSpaceDate()
        }]
      };
    },
    getPersonItem(isLeader, items) {
      return items;
      // if (isLeader) {
      //   return items;
      // }
      // return [items[0]];
    },
    resetQueryParams() {
      let condition = {};
      // 排序条件
      let orders = [];
      this.allFilterData.forEach((item) => {
        // 设置排序的字段
        if (item.key === 'sort') {
          if (item.selectedIndex === -1) {
            // orders.push({name: item.values[0].code, order: 'desc'});
          } else {
            orders.push({name: item.values[item.selectedIndex].code, order: 'desc'});
          }
          // 设置全部筛选的字段
        } else if (item.isAllFilter) {
          let data = item.values.filter(t => t.isOpen && t.selectedIndex !== -1);
          const list = data.map(t => t.values[t.selectedIndex]);
          list.forEach((subItem, i) => {
            if (data[i].type === 'date') {
              condition[data[i].key] = [subItem.startTime, subItem.endTime];
            } else {
              if (subItem.key) {
                if (condition[subItem.key] && Array.isArray(condition[subItem.key])) {
                  condition[subItem.key].push(subItem.code);
                } else {
                  condition[subItem.key] = [subItem.code];
                }
              } else if (Array.isArray(subItem.code)) {
                if (condition[data[i].key] && Array.isArray(condition[data[i].key])) {
                  condition[data[i].key].push(...subItem.code);
                } else {
                  condition[data[i].key] = subItem.code;
                }
              } else {
                if (condition[data[i].key] && Array.isArray(condition[data[i].key])) {
                  condition[data[i].key].push(subItem.code);
                } else {
                  condition[data[i].key] = [subItem.code];
                }
              }
            }
          });
          // 设置列表的字段
        } else if (item.selectedIndex !== -1) {
          let value = item.values[item.selectedIndex];
          if (value.action !== 'ignore') {
            if (value.key) {
              if (condition[value.key] && Array.isArray(condition[value.key])) {
                condition[value.key].push(value.code);
              } else {
                condition[value.key] = [value.code];
              }
            } else {
              if (condition[item.key] && Array.isArray(condition[item.key])) {
                condition[item.key].push(value.code);
              } else {
                condition[item.key] = [value.code];
              }
            }
          }
        }
      });
      // 点击筛选之后如果条件一样则不刷新
      if (JSON.stringify(this.condition) === JSON.stringify(condition) && JSON.stringify(this.orders) === JSON.stringify(orders)) {
        return false;
      }
      Object.keys(condition).forEach(item => {
        condition[item] = condition[item].filter(t => !!t || t === 0);
        if (condition[item].length === 0) {
          delete condition[item];
        }
      });
      this.condition = condition;
      this.orders = orders;
      return true;
    }
  }
};
</script>
