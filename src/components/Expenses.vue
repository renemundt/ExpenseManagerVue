<template>
  <div>
    <h1>Expenses</h1>
    <p v-if="showError">An error occured, contact Renøj</p>
    <table class="table table-md">
      <thead class="thead-inverse">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Store</th>
          <th scope="col" class="text-right">Amount</th>
          <th scope="col" class="d-none d-sm-block">User</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense.id">
          <td>
            <router-link v-if="expense.id" :to="{ name: 'ExpenseDetails', params: { expenseId: expense.id }}">{{longDate(expense.timeOfPurchase)}}</router-link>
            <a v-else>{{longDate(expense.timeOfPurchase)}}</a>
          </td>
          <td>{{expense.store }}</td>
          <td class="text-right">{{expense.amount | currency}}</td>
          <td class="d-none d-sm-block">{{expense.profile ? expense.profile.givenName : '-'}}</td>
          <td>
            <div v-if="expense.id" class="fixed-buttons-width">
              <button v-if="activeButtonIndex == null" type="button" class="btn btn-danger btn-sm" v-on:click="alert(index)">Delete</button>
              <button v-if="activeButtonIndex == index" type="button" class="btn btn-warning btn-sm pull-left" v-on:click="cancel()">No</button>
              <button v-if="activeButtonIndex == index" type="button" class="btn btn-danger btn-sm pull-right" v-on:click="deleteExpense(expense.id)">Yes</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'

export default {
  name: 'Expenses',
  data () {
    return {
      expenses: [],
      activeButtonIndex: null,
      showError: false
    }
  },
  created: function () {
    this.getExpenses()
  },
  methods: {
    longDate: function (input) {
      if (input == null) return ''
      return moment(input).format('DD. MMMM YYYY')
    },
    getExpenses: function () {
      expensesService.getExpenses((err, result) => {
        if (err) this.showError = true
        else {
          this.expenses = this.sortExpenses(result)
          let total = result.map(expense => expense.amount).reduce((previous, current) => { return previous + current })
          this.average = total / +moment().toDate().getDate()
        }
      })
    },
    deleteExpense: function (expenseId) {
      expensesService.deleteExpense(expenseId, (err, result) => {
        if (err) this.showError = true
        else {
          this.activeButtonIndex = null
          this.getExpenses()
        }
      })
    },
    alert: function (index) {
      this.activeButtonIndex = index
      this.deleteConfirm = true
    },
    cancel: function () {
      this.activeButtonIndex = null
      this.deleteConfirm = false
    },
    sortExpenses: function (expenses) {
      return expenses.sort(function (a, b) {
        a.timeOfPurchase = new Date(a.timeOfPurchase)
        b.timeOfPurchase = new Date(b.timeOfPurchase)
        return a.timeOfPurchase > b.timeOfPurchase ? -1 : a.timeOfPurchase < b.timeOfPurchase ? 1 : 0
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.fixed-buttons-width {
  width: 100px;
}

button {
  float: left;
  border-radius: 0
}

.table thead th {
    border-bottom: 0px solid ;
}
</style>
