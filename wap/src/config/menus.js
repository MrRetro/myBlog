import {RouteUtil} from '../utils/routeUtil';
import {images} from '../assets';

export const menus = [
  {
    name: '客户菜单',
    id: '1',
    menus: [
      {
        id: '11',
        name: '全部客户',
        auth: 'wap-crm-customer-all',
        route: () => RouteUtil.searchList({type: 'all', module: 'customers'}),
        icon: images.tabs.customer_all
      }, {
        id: '12',
        name: '客户公海',
        auth: 'wap-crm-customer-sea',
        route: () => RouteUtil.searchList({type: 'sea', module: 'customers'}),
        icon: images.tabs.customer_sea
      }, {
        id: '13',
        name: '重点客户',
        auth: 'wap-crm-customer-emphases',
        route: () => RouteUtil.searchList({type: 'follow', module: 'customers'}),
        icon: images.tabs.customer_follow
      }, {
        id: '14',
        name: '跟进记录',
        auth: 'wap-crm-customer-followuprecord',
        route: () => RouteUtil.searchList({type: 'customer', module: 'followUpRecords'}),
        icon: images.tabs.follow_up_recordpng
      }, {
        id: '15',
        name: '跟进计划',
        auth: 'wap-crm-customer-followupplan',
        route: () => RouteUtil.commonPlanAll({type: 'customer', module: 'followUpPlans'}),
        icon: images.tabs.follow_up_plan
      }
    ]
  },
  {
    name: '购车线索',
    id: '2',
    menus: [
      {
        id: '21',
        name: '全部线索',
        auth: 'wap-crm-clue-all',
        route: () => RouteUtil.searchList({type: 'all', module: 'clues'}),
        icon: images.tabs.clue_all
      }, {
        id: '22',
        name: '重点线索',
        auth: 'wap-crm-clue-emphases',
        route: () => RouteUtil.searchList({type: 'follow', module: 'clues'}),
        icon: images.tabs.clue_follow
      }, {
        id: '23',
        name: '线索公海',
        auth: 'wap-crm-clue-sea',
        route: () => RouteUtil.searchList({type: 'sea', module: 'clues'}),
        icon: images.tabs.clue_sea
      }, {
        id: '24',
        name: '无效线索',
        auth: 'wap-crm-clue-invalid',
        route: () => RouteUtil.searchList({type: 'invalid', module: 'clues'}),
        icon: images.tabs.clue_invalid
      }, {
        id: '25',
        name: '跟进记录',
        auth: 'wap-crm-clue-followuprecord',
        route: () => RouteUtil.searchList({type: 'clue', module: 'followUpRecords'}),
        icon: images.tabs.follow_up_recordpng
      }, {
        id: '26',
        name: '跟进计划',
        auth: 'wap-crm-clue-followupplan',
        route: () => RouteUtil.commonPlanAll({type: 'clue', module: 'followUpPlans'}),
        icon: images.tabs.follow_up_plan
      }
    ]
  },
  {
    name: '经纪人管理',
    id: '3',
    menus: [
      {
        id: '31',
        name: '全部经纪人',
        auth: 'wap-crm-agent-all',
        route: () => RouteUtil.searchList({type: 'all', module: 'agents'}),
        icon: images.tabs.agent_all
      }, {
        id: '32',
        name: '重点经纪人',
        auth: 'wap-crm-agent-emphases',
        route: () => RouteUtil.searchList({type: 'follow', module: 'agents'}),
        icon: images.tabs.agent_follow
      }, {
        id: '33',
        name: '经纪人公海',
        auth: 'wap-crm-agent-sea',
        route: () => RouteUtil.searchList({type: 'sea', module: 'agents'}),
        icon: images.tabs.agent_sea
      }, {
        id: '34',
        name: '附近经纪人',
        auth: 'wap-crm-agent-nearby',
        route: () => RouteUtil.nearAgent(),
        icon: images.tabs.agent_near
      }, {
        id: '35',
        name: '跟进记录',
        auth: 'wap-crm-agent-followuprecord',
        route: () => RouteUtil.searchList({type: 'agent', module: 'followUpRecords'}),
        icon: images.tabs.follow_up_recordpng
      }, {
        id: '36',
        name: '跟进计划',
        auth: 'wap-crm-agent-followupplan',
        route: () => RouteUtil.commonPlanAll({type: 'agent', module: 'followUpPlans'}),
        icon: images.tabs.follow_up_plan
      }
    ]
  },
  {
    name: '合同订单',
    id: '4',
    menus: [
      {
        id: '41',
        // name: '零售订单',
        name: '订单',
        auth: 'wap-crm-order-list',
        route: () => RouteUtil.searchList({type: 'all', module: 'order'}),
        icon: images.tabs.order_retail
      }
      // ,
      // {
      //   id: '42',
      //   name: '批售订单',
      //   icon: images.tabs.order_leasable
      // },
      // {
      //   id: '43',
      //   name: '地推订单',
      //   icon: images.tabs.order_ground_promotion
      // },
      // {
      //   id: '44',
      //   name: '垫资订单',
      //   icon: images.tabs.order_leasable
      // },
      // {
      //   id: '45',
      //   name: '展车订单',
      //   icon: images.tabs.order_models
      // }
    ]
  },
  // , {
  //   name: '订车管理',
  //   id: '5',
  //   menus: [
  //     {
  //       id: '51',
  //       name: '订车需求',
  //       icon: images.tabs.order_car_demand
  //     },
  //     {
  //       id: '52',
  //       name: '订车单',
  //       icon: images.tabs.order_car_order
  //     }
  //   ]
  // }, {
  //   name: '物流管理',
  //   id: '6',
  //   menus: [
  //     {
  //       id: '61',
  //       name: '物流单',
  //       icon: images.tabs.order_logistics
  //     }
  //   ]
  // }
  {
    name: '询价管理',
    id: '7',
    menus: [
      {
        id: '71',
        name: '询价单',
        icon: images.tabs.order_enquiry,
        auth: 'wap-crm-inquiry-list',
        route: () => RouteUtil.searchList({type: 'all', module: 'enquiryPrices'})
      }, {
        id: '72',
        name: '报价单',
        icon: images.tabs.order_offer,
        auth: 'wap-crm-quoted-list',
        route: () => RouteUtil.searchList({type: 'all', module: 'quotedPrices'})
      }, {
        id: '73',
        name: '报价记录',
        auth: 'wap-crm-quoted-records',
        icon: images.tabs.offer_recordpng,
        route: () => RouteUtil.searchList({type: 'all', module: 'quotedRecords'})
      }
    ]
  },
  // , {
  //   name: '资金管理',
  //   id: '8',
  //   menus: [
  //     {
  //       id: '81',
  //       name: '垫资计划',
  //       icon: images.tabs.fund_plan
  //     }, {
  //       id: '82',
  //       name: '垫资单',
  //       icon: images.tabs.fund_order
  //     }, {
  //       id: '83',
  //       name: '还款单',
  //       icon: images.tabs.order_refund
  //     }
  //   ]
  // }
  {
    name: '交车管理',
    id: '9',
    menus: [
      {
        id: '91',
        name: '交车单',
        auth: 'wap-erp-delivery-ordercar',
        route: () => RouteUtil.searchList({type: 'all', module: 'delivery'}),
        icon: images.tabs.order_pay
      }
    ]
  }
];
