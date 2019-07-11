/**
 * User: retro.
 * Time: 2018/8/2
 */

export const inquiryRoute = [
  {
    path: '/:module/:type/inquiry/add/:CREATE_TIME',
    name: 'inquiryAdd',
    meta: {title: '新建询价', keepAlive: true},
    component: () => import('../modules/inquiry/add')
  },
  {
    path: '/:module/:type/inquiry/edit/:id/:CREATE_TIME',
    name: 'inquiryEdit',
    meta: {title: '编辑询价', keepAlive: true},
    component: () => import('../modules/inquiry/add')
  },
  {
    path: '/:module/:type/inquiry/quoted/add/:CREATE_TIME',
    name: 'quotedAdd',
    meta: {title: '提交报价', keepAlive: true},
    component: () => import('../modules/inquiry/quotation/add')
  },
  {
    path: '/:module/:type/inquiry/quoted/record/add/:CREATE_TIME',
    name: 'quotedRecordAdd',
    meta: {title: '新建报价记录', keepAlive: true},
    component: () => import('../modules/inquiry/quotationRecord/add')
  }
];
