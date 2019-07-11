/**
 * User: puti.
 * Time: 2018/5/28 下午4:07.
 */
export const carRoute = [
  {
    path: '/car/carModel/:CREATE_TIME',
    name: 'carModel',
    meta: {title: '意向车型', keepAlive: true},
    component: () => import('../modules/car/model')
  },
  {
    path: '/car/seriesChoose/:id/:CREATE_TIME',
    name: 'carSeriesChoose',
    meta: {keepAlive: true},
    component: () => import('../modules/car/seriesChoose')
  },
  {
    path: '/car/modelChoose/:id/:CREATE_TIME',
    name: 'carModelChoose',
    meta: {keepAlive: true},
    component: () => import('../modules/car/modelChoose')
  },
  {
    path: '/car/search/:CREATE_TIME',
    name: 'carModelSearch',
    meta: {keepAlive: true},
    component: () => import('../modules/car/search')
  },
  {
    path: '/car/searchList/:CREATE_TIME',
    name: 'carModelSearchList',
    meta: {keepAlive: true},
    component: () => import('../modules/car/searchList')
  }
];
