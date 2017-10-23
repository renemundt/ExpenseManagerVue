<template>
  <div>
    <h1>Expenses</h1>
    <table class="table table-sm">
      <thead class="thead-inverse">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Store</th>
          <th scope="col">Amount</th>
          <th scope="col">User</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense.id">
          <td><router-link :to="{ name: 'ExpenseDetails', params: { expenseId: expense.id }}">{{longDate(expense.timeOfPurchase)}}</router-link></td>
          <td>{{expense.store}}</td>
          <td>{{expense.amount}}</td>
          <td>{{expense.profile.givenName}}</td>
          <td>
            <div class="fixed-buttons-width">
              <button v-if="activeButtonIndex == null" type="button" class="btn btn-danger btn-sm" v-on:click="alert(index)">Delete</button>
              <button v-if="activeButtonIndex == index" type="button" class="btn btn-warning btn-sm pull-left" v-on:click="cancel()">Cancel</button>
              <button v-if="activeButtonIndex == index" type="button" class="btn btn-danger btn-sm pull-right" v-on:click="deleteExpense(expense.id)">Delete(Yes)</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Expenses',
  data () {
    return {
      expenses: [],
      activeButtonIndex: null
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
      const presentDay = moment()
      const sameDayLastMonth = moment().subtract(1, 'months')
      const startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
      const endDate = `${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59.000Z`
      const url = `http://localhost:8666/api/expenses?startDate=${startDate}&endDate=${endDate}`
      this.$http.get(url).then(response => {
        this.expenses = this.sortExpenses(response.data)
      }, error => {
        console.log('error', error)
      })
    },
    deleteExpense: function (expenseId) {
      this.$http.delete(`http://localhost:8666/api/expenses/${expenseId}`).then(response => {
        this.activeButtonIndex = null
        this.getExpenses()
      }, error => {
        console.log('error', error)
      })
    },
    alert: function (index) {
      this.activeButtonIndex = index
      this.deleteConfirm = true
    },
    cancel: function () {
      this.activeButtonIndex = null
      this.deleteCoZnfirm = false
    },
    sortExpenses: function (expenses) {
      return expenses.sort(function (a, b) {
        a.created = new Date(a.created)
        b.created = new Date(b.created)
        return a.created > b.created ? -1 : a.created < b.created ? 1 : 0
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
  width: 150px;
}
</style>
