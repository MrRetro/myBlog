import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main/index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Speed from '../components/Speed.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/dist/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/speed',
      name: 'Speed',
      component: Speed
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
