export default [
  {
    path: '/log/form',
    name: 'LogForm',
    component: () => import('../views/Log/form.vue')
  },
  {
    path: '/log/form/:id',
    name: 'LogFormById',
    component: () => import('../views/Log/form.vue')
  }
]
