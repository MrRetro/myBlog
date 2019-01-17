import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main/index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Speed from '../components/Speed.vue'

import editDiv from '../views/Article/editDiv.vue'
import border from '../views/Article/border.vue'
import ant from '../views/Article/ant.vue'
import circle from '../views/Article/circle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/myBlog/',
  routes: [
    {
      path: '/index',
      name: 'Main',
      component: Main
    },
    {
      path: '/edit',
      name: 'EditDiv',
      component: editDiv
    },
    {
      path: '/border',
      name: 'Border',
      component: border
    },
    {
      path: '/ant',
      name: 'Ant',
      component: ant
    },
    {
      path: '/circle',
      name: 'Circle',
      component: circle
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
