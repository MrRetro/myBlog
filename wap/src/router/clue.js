/**
 * User: puti.
 * Time: 2018/5/28 下午4:07.
 */
export const clueRoute = [
  {
    path: '/clue/add/one/:CREATE_TIME',
    name: 'clueAdd',
    meta: {title: '新建线索', keepAlive: true},
    component: () => import('../modules/clue/add/StepOne')
  },
  {
    path: '/clue/add/two/:CREATE_TIME',
    name: 'clueAddTwo',
    meta: {title: '新建线索', keepAlive: true},
    component: () => import('../modules/clue/add/StepTwo')
  },
  {
    path: '/clue/add/:CREATE_TIME',
    name: 'clueAddThree',
    meta: {title: '新建线索', keepAlive: true},
    component: () => import('../modules/clue/add')
  },
  {
    path: '/clue/add/success/:CREATE_TIME',
    name: 'clueAddSuccess',
    meta: {title: '新建线索', keepAlive: true},
    component: () => import('../modules/clue/add/success')
  },
  {
    path: '/clue/edit/:id/:CREATE_TIME',
    name: 'clueEdit',
    meta: {title: '编辑信息', keepAlive: true},
    component: () => import('../modules/clue/add')
  },
  {
    path: '/clue/contract/confirm/:CREATE_TIME',
    name: 'contractConfirm',
    meta: {title: '确认信息', keepAlive: true},
    component: () => import('../modules/clue/contract/confirm')
  },
  {
    path: '/clue/contract/data/:CREATE_TIME',
    name: 'contractData',
    meta: {title: '合同资料', keepAlive: true},
    component: () => import('../modules/clue/contract/data')
  },
  {
    path: '/clue/contract/upload/:CREATE_TIME',
    name: 'contractUpload',
    meta: {title: '合同资料', keepAlive: true},
    component: () => import('../modules/clue/contract/upload')
  },
  {
    path: '/clue/contract/success/:CREATE_TIME',
    name: 'contractSuccess',
    meta: {title: '签约成功', keepAlive: true},
    component: () => import('../modules/clue/contract/success')
  },
  {
    path: '/clueList/:id/:type/:CREATE_TIME',
    name: 'clueList',
    meta: {title: '线索', keepAlive: true},
    component: () => import('../modules/clue/clueList')
  },
  {
    path: '/clue/failure/:id/:CREATE_TIME',
    name: 'clueFailure',
    meta: {title: '标记失效', keepAlive: true},
    component: () => import('../modules/clue/clueFailure')
  },
  {
    path: '/clue/colors/step1/:CREATE_TIME',
    name: 'clueColors1',
    meta: {title: '选择颜色', keepAlive: true},
    component: () => import('../modules/clue/colors/colorStep1')
  },
  {
    path: '/clue/colors/step2/:CREATE_TIME',
    name: 'clueColors2',
    meta: {title: '颜色搜索', keepAlive: true},
    component: () => import('../modules/clue/colors/colorStep2')
  }
];
