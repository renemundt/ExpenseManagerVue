<template>
  <div>
    <form v-if="expense">
      <div class="form-group">
        <label for="amount">Amount</label>
        <input v-model="expense.amount" type="number" class="form-control" id="amount" placeholder="Enter amount">
      </div>
      <div class="form-group">
        <label for="timeOfPurchase">Time of purchase</label>
        <input v-model="expense.timeOfPurchase" type="date" class="form-control" id="timeOfPurchase" placeholder="Time of purchase">
      </div>
      <div class="form-group">
        <label for="store">Store</label>
        <input v-model="expense.store" type="text" class="store">
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ExpenseDetails',
  data () {
    return {
      expense: null
    }
  },
  created: function () {
    this.getExpense()
  },
  methods: {
    getExpense: function () {
      let expenseId = this.$route.params.expenseId
      this.$http.get(`http://localhost:8666/api/expenses/${expenseId}`).then(response => {
        this.expense = response.data
        this.expense.timeOfPurchase = moment(this.expense.timeOfPurchase).format('YYYY-MM-DD')
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
