export const deliveryRoute = [
  {
    path: '/delivery/arrivalStore/:CREATE_TIME',
    name: 'arrivalStore',
    meta: {title: '到店详情'},
    component: () => import('../modules/delivery/arrivalStore')
  },
  {
    path: '/delivery/arrivalStoreForm/:CREATE_TIME',
    name: 'arrivalStoreForm',
    meta: {title: '入库详情'},
    component: () => import('../modules/delivery/arrivalStoreForm')
  },
  {
    path: '/delivery/checkIncome/:CREATE_TIME',
    name: 'checkIncome',
    meta: {title: '查看收入'},
    component: () => import('../modules/delivery/checkIncome')
  },
  {
    path: '/delivery/costSubtotal/:CREATE_TIME',
    name: 'costSubtotal',
    meta: {title: '成本小计'},
    component: () => import('../modules/delivery/costSubtotal')
  },
  {
    path: '/delivery/financialFund/:CREATE_TIME',
    name: 'financialFund',
    meta: {title: '金融款项'},
    component: () => import('../modules/delivery/financialFund')
  },
  {
    path: '/delivery/extraApply/:CREATE_TIME',
    name: 'extraApply',
    meta: {title: '杂费申请'},
    component: () => import('../modules/delivery/extraApply')
  },
  {
    path: '/delivery/extraApplyForm/:CREATE_TIME',
    name: 'extraApplyForm',
    meta: {title: '杂费申请'},
    component: () => import('../modules/delivery/extraApplyForm')
  },
  {
    path: '/delivery/customerReceipt/:CREATE_TIME',
    name: 'customerReceipt',
    meta: {title: '客户收款'},
    component: () => import('../modules/delivery/customerReceipt')
  },
  {
    path: '/delivery/addReceipt/:CREATE_TIME',
    name: 'addReceipt',
    meta: {title: '客户收款'},
    component: () => import('../modules/delivery/addReceipt')
  },
  {
    path: '/delivery/finishDelivery/:CREATE_TIME',
    name: 'finishDelivery',
    meta: {title: '完成交车'},
    component: () => import('../modules/delivery/finishDelivery')
  },
  {
    path: '/delivery/refundsForm/:CREATE_TIME',
    name: 'refundsForm',
    meta: {title: '客户应退款'},
    component: () => import('../modules/delivery/refundsForm')
  },
  {
    path: '/delivery/refundsFormTwo/:CREATE_TIME',
    name: 'refundsFormTwo',
    meta: {title: '客户应退款'},
    component: () => import('../modules/delivery/refundsFormTwo')
  },
  {
    path: '/delivery/addFinancialFund/:CREATE_TIME',
    name: 'addFinancialFund',
    meta: {title: '金融款项'},
    component: () => import('../modules/delivery/addFinancialFund')
  },
  {
    path: '/delivery/serviceProviderList/:CREATE_TIME',
    name: 'serviceProviderList',
    meta: {title: '选择服务商'},
    component: () => import('../modules/delivery/ServiceProviderList')
  }
];
