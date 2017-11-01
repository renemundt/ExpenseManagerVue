<template>
  <div v-if="expense">
    <div class="form-group">
      <label for="amount">Amount</label>
      <input v-model="expense.amount" type="number" class="form-control" id="amount" placeholder="Enter amount" :disabled="!editMode">
    </div>
    <div class="form-group">
      <label for="timeOfPurchase">Time of purchase</label>
      <input v-model="expense.timeOfPurchase" type="date" class="form-control" id="timeOfPurchase" placeholder="Time of purchase" :disabled="!editMode">
    </div>
    <div class="form-group">
      <label for="store">Store</label>
      <input v-model="expense.store" type="text" class="store" :disabled="!editMode">
    </div>
    <button v-if="!editMode" v-on:click="enableEdit()" class="btn btn-info">Edit</button>
    <button v-else v-on:click="editExpense()" type="submit" class="btn btn-primary">Save</button>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'

export default {
  name: 'ExpenseDetails',
  data () {
    return {
      expense: null,
      editMode: false
    }
  },
  created: function () {
    this.getExpense()
  },
  methods: {
    getExpense: function () {
      expensesService.getExpense(this.$route.params.expenseId, (err, result) => {
        if (err) console.error(err)
        else {
          this.expense = result
          this.expense.timeOfPurchase = moment(this.expense.timeOfPurchase).format('YYYY-MM-DD')
        }
      })
    },
    enableEdit () {
      console.log('??')
      this.editMode = true
    },
    editExpense () {
      // let expenseId = this.$route.params.expenseId
      // this.$http.put(`http://localhost:8666/api/expenses/${expenseId}`, this.expense).then(response => {
      expensesService.updateExpense(this.expense, (err, result) => {
        if (err) console.error(err)
        else {
          this.$router.push('/expenses')
        }
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
