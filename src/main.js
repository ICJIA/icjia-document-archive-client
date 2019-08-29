import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/filters'

import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = axios
const jwt = localStorage.getItem('jwt')

if (jwt) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
