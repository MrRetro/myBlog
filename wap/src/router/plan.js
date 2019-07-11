export const planRoute = [
  {
    path: '/:module/:type/plan/all/:CREATE_TIME',
    name: 'commonPlanAll',
    meta: {title: '跟进计划'},
    component: () => import('../modules/plan/all/index')
  },
  {
    path: '/:module/:type/plan/planList/:date/:id/:CREATE_TIME',
    name: 'commonPlanList',
    meta: {title: '跟进计划 '},
    component: () => import('../modules/plan/planList/index')
  },
  {
    path: '/:module/:type/plan/add/:CREATE_TIME',
    name: 'commonPlanAdd',
    meta: {title: '新建计划 '},
    component: () => import('../modules/plan/add/index')
  },
  {
    path: '/:module/:type/plan/edit/:id/:CREATE_TIME',
    name: 'commonPlanEdit',
    meta: {title: '编辑计划 '},
    component: () => import('../modules/plan/add/index')
  },
  {
    path: '/:module/:type/plan/success/:CREATE_TIME',
    name: 'commonPlanAddSuccess',
    meta: {title: '新建成功 '},
    component: () => import('../modules/plan/add/success/index')
  }
];
