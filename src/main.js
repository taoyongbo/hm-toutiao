import Vue from 'vue'

import App from './App.vue'

import ElementUi from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'
import '@/styles/index.less'
import axios from '@/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUi)

new Vue({

  render: h => h(App),
  router

}).$mount('#app')
