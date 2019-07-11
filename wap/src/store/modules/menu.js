/**
 * User: puti.
 * Time: 2018/5/21 上午11:01.
 */
import {getAllMenu} from '../../api/types';
import {getOrderType} from '../../api/order';
let vuex = null;
export const setMenuVuex = (a) => {
  vuex = a;
};

const menu = {
  namespaced: true,
  state: {
    clueType: [
      // {
      //   'code': 1,
      //   'name': '线上线索'
      // }, {
      //   'code': 2,
      //   'name': '线下线索'
      // }
    ],
    'orderType': [
      //   {
      //   'code': 0,
      //   'name': '门店零售',
      //   'businessCode': 'R'
      // }, {
      //   'code': 1,
      //   'name': '门店批售',
      //   'businessCode': 'W'
      // }, {
      //   'code': 2,
      //   'name': '地推订单',
      //   'businessCode': 'T'
      // }, {
      //   'code': 3,
      //   'name': '经销商服务部垫资',
      //   'businessCode': 'X'
      // }, {
      //   'code': 4,
      //   'name': '经销商服务部批售',
      //   'businessCode': 'P'
      // }, {
      //   'code': 5,
      //   'name': '大客户部销售',
      //   'businessCode': 'F'
      // }, {
      //   'code': 6,
      //   'name': '房车部销售',
      //   'businessCode': 'H'
      // }, {
      //   'code': 7,
      //   'name': '线上导流订单',
      //   'businessCode': 'L'
      // }
    ],
    'orderSource': [],
    'clueFuel': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '汽油'
      // }, {
      //   'code': 2,
      //   'name': '柴油'
      // }, {
      //   'code': 3,
      //   'name': '纯电动'
      // }, {
      //   'code': 4,
      //   'name': '油电混合'
      // }, {
      //   'code': 5,
      //   'name': '油气混合'
      // }
    ],
    'clueAdditionalConfiguration': [
      //   {
      //   'code': '',
      //   'name': ''
      // }, {
      //   'code': '天窗',
      //   'name': '天窗'
      // }, {
      //   'code': 'GPS导航',
      //   'name': 'GPS导航'
      // }, {
      //   'code': '倒车影像',
      //   'name': '倒车影像'
      // }, {
      //   'code': '儿童锁',
      //   'name': '儿童锁'
      // }, {
      //   'code': '涡轮增压',
      //   'name': '涡轮增压'
      // }, {
      //   'code': '无钥匙启动',
      //   'name': '无钥匙启动'
      // }, {
      //   'code': '真皮座椅',
      //   'name': '真皮座椅'
      // }, {
      //   'code': 'ESP',
      //   'name': 'ESP'
      // }, {
      //   'code': '氙气大灯',
      //   'name': '氙气大灯'
      // }, {
      //   'code': '定速巡航',
      //   'name': '定速巡航'
      // }, {
      //   'code': '自动空调',
      //   'name': '自动空调'
      // }, {
      //   'code': '胎压监测',
      //   'name': '胎压监测'
      // }, {
      //   'code': '自动泊车',
      //   'name': '自动泊车'
      // }, {
      //   'code': '空气净化器',
      //   'name': '空气净化器'
      // }, {
      //   'code': '换挡拨片',
      //   'name': '换挡拨片'
      // }, {
      //   'code': '电动座椅',
      //   'name': '电动座椅'
      // }, {
      //   'code': '儿童座椅接口',
      //   'name': '儿童座椅接口'
      // }
    ],
    'followUpPlanRemindTime': [
      //   {
      //   'code': 0,
      //   'name': '不提醒'
      // }, {
      //   'code': 1,
      //   'name': '提前15分钟'
      // }, {
      //   'code': 2,
      //   'name': '提前1小时'
      // }, {
      //   'code': 3,
      //   'name': '提前1天'
      // }
    ],
    'followUpPlanStatus': [
      //   {
      //   'code': 0,
      //   'name': '未跟进'
      // }, {
      //   'code': 1,
      //   'name': '已完成'
      // }, {
      //   'code': 2,
      //   'name': '已逾期'
      // }, {
      //   'code': 3,
      //   'name': '已取消'
      // }, {
      //   'code': 4,
      //   'name': '已延期'
      // }
    ],
    'agentOrigin': [
      //   {
      //   'code': 0,
      //   'name': '二维码注册',
      //   'businessCode': 'C'
      // }, {
      //   'code': 1,
      //   'name': '主动注册',
      //   'businessCode': 'A'
      // }, {
      //   'code': 2,
      //   'name': '协助注册',
      //   'businessCode': 'H'
      // }, {
      //   'code': 3,
      //   'name': '主管分配',
      //   'businessCode': 'A'
      // }, {
      //   'code': 4,
      //   'name': '遗失认领',
      //   'businessCode': 'A'
      // }, {
      //   'code': 5,
      //   'name': '责任转交',
      //   'businessCode': 'A'
      // }, {
      //   'code': 6,
      //   'name': '自由注册',
      //   'businessCode': 'F'
      // }
    ],
    'planUserType': [
      //   {
      //   'code': 0,
      //   'name': '负责人'
      // }, {
      //   'code': 1,
      //   'name': '协同人'
      // }
    ],
    'agentLevel': [
      //   {
      //   'code': 'N',
      //   'name': 'N'
      // }, {
      //   'code': 'C',
      //   'name': 'C'
      // }, {
      //   'code': 'B',
      //   'name': 'B'
      // }, {
      //   'code': 'A',
      //   'name': 'A'
      // }, {
      //   'code': 'S',
      //   'name': 'S'
      // }
    ],
    'orderFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部单据'
      // }, {
      //   'code': 1,
      //   'name': '我负责的合同订单'
      // }, {
      //   'code': 2,
      //   'name': '我协同的合同订单'
      // }, {
      //   'code': 3,
      //   'name': '下属负责的合同订单'
      // }, {
      //   'code': 4,
      //   'name': '下属协同的合同订单'
      // }, {
      //   'code': 5,
      //   'name': '今日新增合同订单'
      // }, {
      //   'code': 6,
      //   'name': '本周新增合同订单'
      // }, {
      //   'code': 7,
      //   'name': '本月新增合同订单'
      // }
    ],
    'customerOrigin': [
      //   {
      //   'code': 0,
      //   'name': '线索客户',
      //   'businessCode': 'A'
      // }, {
      //   'code': 1,
      //   'name': '订单客户',
      //   'businessCode': 'I'
      // }, {
      //   'code': 2,
      //   'name': '询价客户',
      //   'businessCode': 'E'
      // }, {
      //   'code': 3,
      //   'name': '下单客户',
      //   'businessCode': 'C'
      // }, {
      //   'code': 4,
      //   'name': '车商城',
      //   'businessCode': 'O'
      // }, {
      //   'code': 5,
      //   'name': '官网客户',
      //   'businessCode': 'O'
      // }, {
      //   'code': 6,
      //   'name': '内部创建',
      //   'businessCode': 'I'
      // }
    ],
    'clueDisplacement': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '1.3L以下'
      // }, {
      //   'code': 2,
      //   'name': '1.3L~1.6L'
      // }, {
      //   'code': 3,
      //   'name': '1.7L~2.0L'
      // }, {
      //   'code': 4,
      //   'name': '2.1L~3.0L'
      // }, {
      //   'code': 5,
      //   'name': '3.1L~5.0L'
      // }, {
      //   'code': 6,
      //   'name': '5.0以上'
      // }
    ],
    'customerType': [
      //   {
      //   'code': 0,
      //   'name': '首单客户'
      // }, {
      //   'code': 1,
      //   'name': '回单客户'
      // }, {
      //   'code': 2,
      //   'name': '回收客户'
      // }, {
      //   'code': 3,
      //   'name': '无效客户'
      // }
    ],
    'orderContractStatus': [
      //   {
      //   'code': -1,
      //   'name': '取消合同'
      // }, {
      //   'code': 0,
      //   'name': '待确认合同'
      // }, {
      //   'code': 1,
      //   'name': '待发起订车'
      // }, {
      //   'code': 2,
      //   'name': '已完成'
      // }
    ],
    'clueNationality': [
      //   {
      //   'code': '',
      //   'name': ''
      // }, {
      //   'code': '合资',
      //   'name': '合资'
      // }, {
      //   'code': '进口',
      //   'name': '进口'
      // }, {
      //   'code': '自主',
      //   'name': '自主'
      // }, {
      //   'code': '德系',
      //   'name': '德系'
      // }, {
      //   'code': '韩系',
      //   'name': '韩系'
      // }, {
      //   'code': '欧系',
      //   'name': '欧系'
      // }, {
      //   'code': '美系',
      //   'name': '美系'
      // }, {
      //   'code': '日系',
      //   'name': '日系'
      // }
    ],
    'followUpRecordFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部跟进记录'
      // }, {
      //   'code': 1,
      //   'name': '我的跟进记录'
      // }, {
      //   'code': 2,
      //   'name': '我负责的客户跟进记录'
      // }, {
      //   'code': 3,
      //   'name': '我下属的跟进记录'
      // }, {
      //   'code': 4,
      //   'name': '我下属负责的客户跟进记录'
      // }
    ],
    'clueDriveMode': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '前驱'
      // }, {
      //   'code': 2,
      //   'name': '后驱'
      // }, {
      //   'code': 3,
      //   'name': '四驱'
      // }
    ],
    'busType': [
      // 'CUSTOMER', 'CLUE', 'AGENT', 'CONTRACT', 'ORDER'
    ],
    'clueFailureType': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '订单战败'
      // }, {
      //   'code': 2,
      //   'name': '线索失效'
      // }
    ],
    'orderCancelType': [
      //   {
      //   'code': -1,
      //   'name': '未定义'
      // }, {
      //   'code': 0,
      //   'name': '订单退订'
      // }
    ],
    'clueCarStructure': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '两厢车'
      // }, {
      //   'code': 2,
      //   'name': '三厢车'
      // }, {
      //   'code': 3,
      //   'name': 'SUV'
      // }
    ],
    'customerFollowUpStatus': [
      //   {
      //   'code': 0,
      //   'name': '未跟进'
      // }, {
      //   'code': 1,
      //   'name': '已完成'
      // }, {
      //   'code': 2,
      //   'name': '已逾期'
      // }, {
      //   'code': 3,
      //   'name': '已取消'
      // }, {
      //   'code': 4,
      //   'name': '已延期'
      // }
    ],
    'wapFollowUpRecordFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '我执行的'
      // }, {
      //   'code': 1,
      //   'name': '我下属执行的'
      // }, {
      //   'code': 2,
      //   'name': '指定执行人'
      // }
    ],
    'clueDesignateWay': [
      //   {
      //   'code': 0,
      //   'name': '平台指派'
      // }, {
      //   'code': 1,
      //   'name': '指定销售'
      // }
    ],
    'planUserStatus': [
      //   {
      //   'code': 0,
      //   'name': '当前负责人'
      // }, {
      //   'code': 1,
      //   'name': '前任负责人'
      // }
    ],
    'followUpWay': [
      //   {
      //   'code': 0,
      //   'name': '到店'
      // }, {
      //   'code': 1,
      //   'name': '上门'
      // }, {
      //   'code': 2,
      //   'name': '来电'
      // }, {
      //   'code': 3,
      //   'name': '微信'
      // }, {
      //   'code': 4,
      //   'name': '短信'
      // }
    ],
    'agentFollowUpStatus': [
      //   {
      //   'code': 0,
      //   'name': '未跟进'
      // }, {
      //   'code': 1,
      //   'name': '跟进中'
      // }, {
      //   'code': 2,
      //   'name': '逾期未跟进'
      // }, {
      //   'code': 3,
      //   'name': '30天未跟进'
      // }
    ],
    'userType': [
      //   {
      //   'code': 'USER',
      //   'name': '系统用户'
      // }, {
      //   'code': 'CUSTOMER',
      //   'name': '客户'
      // }, {
      //   'code': 'AGENT',
      //   'name': '经纪人'
      // }
    ],
    'clueStatus': [
      //   {
      //   'code': 1,
      //   'name': '待跟进'
      // }, {
      //   'code': 2,
      //   'name': '待分配'
      // }, {
      //   'code': 3,
      //   'name': '跟进中'
      // }, {
      //   'code': 4,
      //   'name': '已签约'
      // }, {
      //   'code': 5,
      //   'name': '已战败'
      // }, {
      //   'code': 6,
      //   'name': '已失效'
      // }, {
      //   'code': 7,
      //   'name': '已取消'
      // }
    ],
    'clueIntentionType': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '意向明确'
      // }, {
      //   'code': 2,
      //   'name': '意向模糊'
      // }
    ],
    'clueIntentionGrade': [
      // {
      //   'code': 1,
      //   'name': 'H'
      // }, {
      //   'code': 2,
      //   'name': 'A'
      // }, {
      //   'code': 3,
      //   'name': 'B'
      // }, {
      //   'code': 4,
      //   'name': 'C'
      // }
    ],
    'agentType': [
      //   {
      //   'code': 0,
      //   'name': '僵尸经纪人'
      // }, {
      //   'code': 1,
      //   'name': '活跃经纪人'
      // }, {
      //   'code': 2,
      //   'name': '推送经纪人'
      // }
    ],
    'clueSpeedChangingBox': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '自动'
      // }, {
      //   'code': 2,
      //   'name': '手动'
      // }
    ],
    'gender': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '女'
      // }, {
      //   'code': 2,
      //   'name': '男'
      // }
    ],
    'orderStatus': [
      //   {
      //   'code': -1,
      //   'name': '取消订单'
      // }, {
      //   'code': 0,
      //   'name': '待客户签约'
      // }, {
      //   'code': 1,
      //   'name': '待确认合同'
      // }, {
      //   'code': 2,
      //   'name': '待发起订车'
      // }, {
      //   'code': 3,
      //   'name': '待确认车源'
      // }, {
      //   'code': 4,
      //   'name': '待确认垫资'
      // }, {
      //   'code': 5,
      //   'name': '待确认提车'
      // }, {
      //   'code': 6,
      //   'name': '待完成提车'
      // }, {
      //   'code': 7,
      //   'name': '待完成垫资'
      // }, {
      //   'code': 8,
      //   'name': '待确认交车'
      // }, {
      //   'code': 9,
      //   'name': '待确认奖励'
      // }, {
      //   'code': 10,
      //   'name': '待结算奖励'
      // }, {
      //   'code': 11,
      //   'name': '待订单完成'
      // }, {
      //   'code': 12,
      //   'name': '订单完成'
      // }
    ],
    'orderSynergyType': [
      //   {
      //   'code': 0,
      //   'name': '订单协同人'
      // }, {
      //   'code': 1,
      //   'name': '合同单据协同人'
      // }
    ],
    'clueSource': [
      //   {
      //   'code': 0,
      //   'name': '',
      //   'businessCode': ''
      // }, {
      //   'code': 1,
      //   'name': '经纪人提交',
      //   'businessCode': 'A'
      // }, {
      //   'code': 2,
      //   'name': '官网提交',
      //   'businessCode': 'O'
      // }, {
      //   'code': 3,
      //   'name': 'APP下单',
      //   'businessCode': 'C'
      // }, {
      //   'code': 4,
      //   'name': 'APP询价',
      //   'businessCode': 'E'
      // }, {
      //   'code': 5,
      //   'name': '内部创建',
      //   'businessCode': 'I'
      // }
    ],
    'clueFailureReason': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '车身或金融无优势'
      // }, {
      //   'code': 2,
      //   'name': '对品牌及售后信任度低'
      // }, {
      //   'code': 3,
      //   'name': '按揭未通过，退订'
      // }, {
      //   'code': 4,
      //   'name': '交车时间无法达到客户需求'
      // }, {
      //   'code': 5,
      //   'name': '其他'
      // }, {
      //   'code': 6,
      //   'name': '空号或主机不符'
      // }, {
      //   'code': 7,
      //   'name': '联系不上、关机或无人接听'
      // }, {
      //   'code': 8,
      //   'name': '客户已在别处购买'
      // }, {
      //   'code': 9,
      //   'name': '客户无购车意向'
      // }
    ],
    'clueFailureReasonInvalid': [
      //   {
      //   'code': 0,
      //   'name': null
      // }, {
      //   'code': 1,
      //   'name': '空号或主机不符'
      // }, {
      //   'code': 2,
      //   'name': '联系不上、关机或无人接听'
      // }, {
      //   'code': 3,
      //   'name': '客户已在别处购买'
      // }, {
      //   'code': 4,
      //   'name': '客户无购车意向'
      // }
    ],
    'clueFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部线索'
      // }, {
      //   'code': 1,
      //   'name': '我负责的线索'
      // }, {
      //   'code': 2,
      //   'name': '我协同的线索'
      // }, {
      //   'code': 3,
      //   'name': '下属负责的线索'
      // }, {
      //   'code': 4,
      //   'name': '下属协同的线索'
      // }
    ],
    'clueSeating': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '2座'
      // }, {
      //   'code': 2,
      //   'name': '4~5座'
      // }, {
      //   'code': 3,
      //   'name': '6座'
      // }, {
      //   'code': 4,
      //   'name': '7座'
      // }, {
      //   'code': 5,
      //   'name': '7座以上'
      // }
    ],
    'displayOrderStatus': [
      //   {
      //   'code': 1,
      //   'name': '客户签约'
      // }, {
      //   'code': 2,
      //   'name': '确认合同'
      // }, {
      //   'code': 3,
      //   'name': '发起订车'
      // }, {
      //   'code': 4,
      //   'name': '确认车源'
      // }, {
      //   'code': 5,
      //   'name': '确认垫资'
      // }, {
      //   'code': 6,
      //   'name': '确认提车'
      // }, {
      //   'code': 7,
      //   'name': '完成提车'
      // }, {
      //   'code': 8,
      //   'name': '完成垫资'
      // }, {
      //   'code': 9,
      //   'name': '完成交车'
      // }, {
      //   'code': 10,
      //   'name': '确认奖励'
      // }, {
      //   'code': 11,
      //   'name': '结算奖励'
      // }, {
      //   'code': 12,
      //   'name': '订单完成'
      // }
    ],
    'followUpPlanFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部跟进计划'
      // }, {
      //   'code': 1,
      //   'name': '我的跟进计划'
      // }, {
      //   'code': 2,
      //   'name': '我下属的跟进计划'
      // }
    ],
    'clueShoppingWay': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '全款'
      // }, {
      //   'code': 2,
      //   'name': '按揭'
      // }, {
      //   'code': 3,
      //   'name': '置换'
      // }
    ],
    'clueCarDoorNumber': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '2~3门'
      // }, {
      //   'code': 2,
      //   'name': '4~5门'
      // }, {
      //   'code': 3,
      //   'name': '6~8门'
      // }
    ],
    'customerFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部客户'
      // }, {
      //   'code': 1,
      //   'name': '我负责的客户'
      // }, {
      //   'code': 2,
      //   'name': '我协同的客户'
      // }, {
      //   'code': 3,
      //   'name': '下属负责的客户'
      // }, {
      //   'code': 4,
      //   'name': '下属协同的客户'
      // }, {
      //   'code': 5,
      //   'name': '今日新增客户'
      // }, {
      //   'code': 6,
      //   'name': '本周新增客户'
      // }
    ],
    'numberSource': [
      //   {
      //   'code': 1,
      //   'name': 'A'
      // }, {
      //   'code': 2,
      //   'name': 'O'
      // }, {
      //   'code': 3,
      //   'name': 'C'
      // }, {
      //   'code': 4,
      //   'name': 'E'
      // }, {
      //   'code': 5,
      //   'name': 'I'
      // }
    ],
    'agentCategory': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '核心经纪人'
      // }, {
      //   'code': 2,
      //   'name': '维护经纪人'
      // }
    ],
    'pOrderFileType': [
      //   {
      //   'code': 0,
      //   'name': '签约相关图片'
      // }, {
      //   'code': 1,
      //   'name': '确认车源相关图片'
      // }, {
      //   'code': 2,
      //   'name': '确认提车相关图片'
      // }
    ],
    'customerLevel': [
      //   {
      //   'code': 1,
      //   'name': '一星'
      // }, {
      //   'code': 2,
      //   'name': '二星'
      // }, {
      //   'code': 3,
      //   'name': '三星'
      // }, {
      //   'code': 4,
      //   'name': '四星'
      // }, {
      //   'code': 5,
      //   'name': '五星'
      // }
    ],
    'clueCommunication': [
      //   {
      //   'code': 0,
      //   'name': ''
      // }, {
      //   'code': 1,
      //   'name': '线上沟通'
      // }, {
      //   'code': 2,
      //   'name': '带客到店'
      // }
    ],
    'orderFileType': [
      //   {
      //   'code': 0,
      //   'name': '委托订购合同',
      //   'fileType': {
      //     'code': 0,
      //     'name': '签约相关图片'
      //   }
      // }, {
      //   'code': 1,
      //   'name': '身份证或企业营业执照',
      //   'fileType': {
      //     'code': 0,
      //     'name': '签约相关图片'
      //   }
      // }, {
      //   'code': 2,
      //   'name': '客户订金凭证',
      //   'fileType': {
      //     'code': 0,
      //     'name': '签约相关图片'
      //   }
      // }, {
      //   'code': 5,
      //   'name': '银行放款书',
      //   'fileType': {
      //     'code': 0,
      //     'name': '签约相关图片'
      //   }
      // }
    ],
    'clueLevel': [
      //   {
      //   'code': 1,
      //   'name': 'H'
      // }, {
      //   'code': 2,
      //   'name': 'A'
      // }, {
      //   'code': 3,
      //   'name': 'B'
      // }, {
      //   'code': 4,
      //   'name': 'C'
      // }
    ],
    'agentFastScreening': [
      //   {
      //   'code': 0,
      //   'name': '全部经纪人'
      // }, {
      //   'code': 1,
      //   'name': '我负责的经纪人'
      // }, {
      //   'code': 2,
      //   'name': '我协同的经纪人'
      // }, {
      //   'code': 3,
      //   'name': '下属负责的经纪人'
      // }, {
      //   'code': 4,
      //   'name': '下属协同的经纪人'
      // }, {
      //   'code': 5,
      //   'name': '今日新增经纪人'
      // }, {
      //   'code': 6,
      //   'name': '本周新增经纪人'
      // }
    ],
    'followUpTarget': [
      //   {
      //   'code': 0,
      //   'name': '客户端'
      // }, {
      //   'code': 1,
      //   'name': '线索端'
      // }, {
      //   'code': 2,
      //   'name': '经纪人端'
      // }
    ],
    'resourceLocation': [],
    'insuranceType': [],
    'invoiceType': [],
    'enquiryStatus': [],
    'acceptStatus': [],
    'clueStatusByEnquriy': []
  },
  mutations: {
    setValue: (state, obj) => {
      Object.keys(obj).forEach(item => obj[item] = obj[item].filter(t => t.name));
      Object.assign(state, obj);
    },
    setOrderType: (state, value) => {
      state.orderType = value;
    }
  },
  actions: {
    syncMenuData: ({commit, dispatch}) => {
      getAllMenu().then(res => {
        commit('setValue', res);
        dispatch('getOrderType');
      });
    },
    getOrderType: ({commit}) => {
      return getOrderType({id:vuex.state.user.dingUserId}).then(res => {
        return commit('setOrderType', res);
      });
    }
  }
};

export default menu;
