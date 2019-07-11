export const agentRoute = [
  {
    path: '/agent/near/:CREATE_TIME',
    name: 'nearAgent',
    meta: {title: '附近经纪人'},
    component: () => import('../modules/agent/nearAgent')
  },
  {
    path: '/agent/assist/:CREATE_TIME',
    name: 'assistOpen',
    meta: {title: '协助开通', keepAlive: true},
    component: () => import('../modules/agent/assistOpen')
  },
  {
    path: '/agent/editinfo/:id/:CREATE_TIME',
    name: 'editInfo',
    meta: {title: '编辑信息', keepAlive: true},
    component: () => import('../modules/agent/editInfo')
  },
  {
    path: '/agent/qrcode/:CREATE_TIME',
    name: 'qrcodeOpen',
    meta: {title: '二维码开通', keepAlive: true},
    component: () => import('../modules/agent/qrcodeOpen')
  },
  {
    path: '/agent/failure/:CREATE_TIME',
    name: 'failure',
    meta: {title: '标为失效', keepAlive: true},
    component: () => import('../modules/agent/markFailure')
  }
];
