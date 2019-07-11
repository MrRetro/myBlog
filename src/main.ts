// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import { Button, Input, Form, FormItem, Message } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

// Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.prototype.$message = Message

// Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  // template: '<App/>',
  render (h) {
    return h('App')
  }
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // }
})
