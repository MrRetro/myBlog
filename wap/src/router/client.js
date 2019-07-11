/**
 * User: puti.
 * Time: 2018/5/28 下午4:07.
 */
export const clientRoute = [
  {
    path: '/client/add/:CREATE_TIME',
    name: 'clientAdd',
    meta: {title: '新建客户'},
    component: () => import('../modules/client/add')
  },
  {
    path: '/client/edit/:id/:CREATE_TIME',
    name: 'clientEdit',
    meta: {title: '编辑客户'},
    component: () => import('../modules/client/add')
  },
  {
    path: '/client/add/success/:CREATE_TIME',
    name: 'clientAddSuccess',
    meta: {title: '新建客户'},
    component: () => import('../modules/client/add/success')
  },
  {
    path: '/client/info/edit/:CREATE_TIME',
    name: 'clientEditInfo',
    meta: {title: '个人中心'},
    component: () => import('../modules/client/edit')
  }
];
