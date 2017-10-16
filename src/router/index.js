import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/components/Expenses'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Expenses',
      component: Expenses
    }
  ]
})
