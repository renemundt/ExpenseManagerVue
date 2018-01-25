// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { store } from './utils/store'
import Vuelidate from 'vuelidate'
import { login } from './utils/auth'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuelidate)

Vue.http.interceptors.push(function (request, next) {
  next(function (response) {
    if (response.status === 401) {
      login()
    }
  })
})

Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  if (typeof value !== 'number') return ''
  return value.toFixed(2)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store: store,
  components: { App }
})
