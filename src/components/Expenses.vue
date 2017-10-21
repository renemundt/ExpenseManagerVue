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
              <button v-if="!deleteConfirm" type="button" class="btn btn-danger btn-sm" v-on:click="confirm()">Delete</button>
              <button v-if="deleteConfirm" type="button" class="btn btn-warning btn-sm pull-left" v-on:click="cancel()">Cancel</button>
              <button v-if="deleteConfirm" type="button" class="btn btn-danger btn-sm pull-right" v-on:click="deleteExpense(expense.id)">Delete(Yes)</button>
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
      deleteConfirm: false
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
      this.$http.get('http://localhost:8666/api/expenses').then(response => {
        this.expenses = response.data
      }, error => {
        console.log('error', error)
      })
    },
    deleteExpense: function (expenseId) {
      this.$http.delete(`http://localhost:8666/api/expenses/${expenseId}`).then(response => {
        this.getExpenses()
      }, error => {
        console.log('error', error)
      })
    },
    confirm: function () {
      this.deleteConfirm = true
    },
    cancel: function () {
      this.deleteConfirm = false
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
