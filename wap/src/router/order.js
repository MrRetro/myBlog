export const orderRoute = [
  {
    path: '/order/orderConfig/:id/:state/:CREATE_TIME',
    name: 'orderConfirm',
    meta: {title: '确认合同'},
    component: () => import('../modules/order/orderConfirm')
  },
  {
    path: '/order/add/one/:CREATE_TIME',
    name: 'orderAddOne',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add/StepOne')
  },
  {
    path: '/order/add/two/:CREATE_TIME',
    name: 'orderAddTwo',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add/StepTwo')
  },
  {
    path: '/order/add/three/:CREATE_TIME',
    name: 'orderAddThree',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add/StepThree')
  },
  {
    path: '/order/add/four/:CREATE_TIME',
    name: 'orderAddFour',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add/StepFour')
  },
  {
    path: '/order/add/:CREATE_TIME',
    name: 'orderAdd',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add')
  },
  {
    path: '/order/edit/:id/:CREATE_TIME',
    name: 'orderEdit',
    meta: {title: '编辑合同', keepAlive: true},
    component: () => import('../modules/order/add/StepOne')
  },
  {
    path: '/order/edit/fail/:CREATE_TIME',
    name: 'orderEditFail',
    meta: {title: '', keepAlive: true},
    component: () => import('../modules/order/add/Failure')
  },
  {
    path: '/order/add/success/:CREATE_TIME',
    name: 'orderAddSuccess',
    meta: {title: '新建订单', keepAlive: true},
    component: () => import('../modules/order/add/success')
  },
  {
    path: '/order/cancel/:CREATE_TIME',
    name: 'orderCancel',
    meta: {title: '取消订单', keepAlive: true},
    component: () => import('../modules/order/orderCancel')
  },
  {
    path: '/order/add/upload/:CREATE_TIME',
    name: 'orderAddUpload',
    meta: {title: '合同资料', keepAlive: false},
    component: () => import('../commons/UpLoadCell')
  },
  {
    path: '/order/list/:id/:CREATE_TIME',
    name: 'orderList',
    meta: {title: '合同订单'},
    component: () => import('../modules/order/orderList')
  },
  {
    path: '/order/list/:type/:id/:CREATE_TIME',
    name: 'orderTabList',
    component: () => import('../modules/order/orderTabList')
  },
  {
    path: '/order/sign/:CREATE_TIME',
    name: 'orderSign',
    meta: {title: '确认签约'},
    component: () => import('../modules/order/orderSign')
  },
  {
    path: '/order/add/finish/car/:CREATE_TIME',
    name: 'orderFinishCar',
    meta: {title: '完成提车'},
    component: () => import('../modules/order/finishCar')
  }
];
