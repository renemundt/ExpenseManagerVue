import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/components/Expenses'
import ExpenseDetails from '@/components/ExpenseDetails'
import CreateExpense from '@/components/CreateExpense'
import Barometer from '@/components/Barometer'
import Callback from '@/components/Callback'

import { isLoggedIn, login } from '../utils/auth'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      meta: { requiresAuth: true }
    },
    {
      path: '/expenses/:expenseId',
      name: 'ExpenseDetails',
      component: ExpenseDetails,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-expense',
      name: 'CreateExpense',
      component: CreateExpense,
      meta: { requiresAuth: true }
    },
    {
      path: '/barometer',
      name: 'Barometer',
      component: Barometer,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'Root',
      component: Barometer,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      login()
      next(false)
    } else {
      next()
    }
  }
  next()
})

export default router
