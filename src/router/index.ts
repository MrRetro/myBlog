import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main/index.vue'

import editDiv from '../views/Article/editDiv.vue'
import border from '../views/Article/border.vue'
import ant from '../views/Article/ant.vue'
import circle from '../views/Article/circle.vue'
import validate from '../views/Article/validate.vue'
import link from '../views/Article/link.vue'
import comma from '../views/Article/comma.vue'
import focus from '../views/Article/focus.vue'
import wave from '../views/Article/wave.vue'
import white from '../views/Article/white.vue'
import vague from '../views/Article/vague.vue'
import radio from '../views/Article/radio.vue'
import check from '../views/Article/check.vue'
import stream from '../views/Article/stream.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/myBlog/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/list/:type',
      name: 'Main',
      component: Main
    },
    {
      path: '/list/:type/:id',
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
      path: '/validate',
      name: 'Validate',
      component: validate
    },
    {
      path: '/link',
      name: 'Link',
      component: link
    },
    {
      path: '/comma',
      name: 'Comma',
      component: comma
    },
    {
      path: '/focus',
      name: 'Focus',
      component: focus
    },
    {
      path: '/wave',
      name: 'Wave',
      component: wave
    },
    {
      path: '/white',
      name: 'White',
      component: white
    },
    {
      path: '/vague',
      name: 'Vague',
      component: vague
    },
    {
      path: '/radio',
      name: 'Radio',
      component: radio
    },
    {
      path: '/check',
      name: 'Check',
      component: check
    },
    {
      path: '/stream',
      name: 'Stream',
      component: stream
    }
  ]
})
