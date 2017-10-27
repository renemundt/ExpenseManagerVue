import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/components/Expenses'
import ExpenseDetails from '@/components/ExpenseDetails'
import CreateExpense from '@/components/CreateExpense'
import Barometer from '@/components/Barometer'
import Callback from '@/components/Callback'
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/expenses',
      name: 'Expenses',
      beforeEnter: requireAuth,
      component: Expenses
    },
    {
      path: '/expenses/:expenseId',
      name: 'ExpenseDetails',
      beforeEnter: requireAuth,
      component: ExpenseDetails
    },
    {
      path: '/create-expense',
      name: 'CreateExpense',
      beforeEnter: requireAuth,
      component: CreateExpense
    },
    {
      path: '/barometer',
      name: 'Barometer',
      beforeEnter: requireAuth,
      component: Barometer
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/',
      name: 'Barometer',
      beforeEnter: requireAuth,
      component: Barometer
    }
  ]
})
