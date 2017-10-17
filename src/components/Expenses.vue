<template>
  <div class="hello">
    <h1>Latest expenses</h1>
    <table class="table table-hover table-sm">
      <thead class="thead-inverse">
        <tr>
          <th>Date</th>
          <th>Store</th>
          <th>Amount</th>
          <th>User</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense.id">
          <td>{{ longDate(expense.timeOfPurchase) }}</td>
          <td>{{expense.store}}</td>
          <td>{{expense.amount}}</td>
          <td>{{expense.profile.givenName}}</td>
          <button type="button" class="btn btn-danger" v-on:click="deleteExpense(expense.id)">Delete</button>
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
      expenses: []
    }
  },
  created: function () {
    this.getExpense()
  },
  methods: {
    longDate: function (input) {
      if (input == null) return ''
      return moment(input).format('DD. MMMM YYYY')
    },
    getExpense: function () {
      this.$http.get('http://localhost:8666/api/expenses').then(response => {
        this.expenses = response.data
      }, error => {
        console.log('error', error)
      })
    },
    deleteExpense: function (expenseId) {
      this.$http.delete(`http://localhost:8666/api/expenses/${expenseId}`).then(response => {
        this.getExpense()
      }, error => {
        console.log('error', error)
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
</style>
