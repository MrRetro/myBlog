import Vue from 'vue'
import Router from 'vue-router'
import Case from './case'
import Article from './article'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/myBlog/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/user/:user',
      name: 'Main',
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/list/:type',
      name: 'MainList',
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/list/:type/:id',
      name: 'MainListType',
      component: () => import('../views/main/index.vue')
    },
    ...Case,
    ...Article
  ]
})
