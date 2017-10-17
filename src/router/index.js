import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/components/Expenses'
import ExpenseDetails from '@/components/ExpenseDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses
    },
    {
      path: '/expenses/:expenseId',
      name: 'ExpenseDetails',
      component: ExpenseDetails
    }
  ]
})
