import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/components/Expenses'
import ExpenseDetails from '@/components/ExpenseDetails'
import CreateExpense from '@/components/CreateExpense'
import Barometer from '@/components/Barometer'

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
    },
    {
      path: '/create-expense',
      name: 'CreateExpense',
      component: CreateExpense
    },
    {
      path: '/barometer',
      name: 'Barometer',
      component: Barometer
    }
  ]
})
