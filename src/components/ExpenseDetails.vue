<template>
  <div>
    <form v-if="expense">
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
      <button v-if="!editMode" v-on:click="enableEdit()" type="submit" class="btn btn-info">Edit</button>
      <button v-else v-on:click="editExpense()" type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'

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
      let expenseId = this.$route.params.expenseId
      this.$http.get(`http://localhost:8666/api/expenses/${expenseId}`).then(response => {
        this.expense = response.data
        this.expense.timeOfPurchase = moment(this.expense.timeOfPurchase).format('YYYY-MM-DD')
      }, error => {
        console.log('error', error)
      })
    },
    enableEdit () {
      this.editMode = true
    },
    editExpense () {
      let expenseId = this.$route.params.expenseId
      this.$http.put(`http://localhost:8666/api/expenses/${expenseId}`, this.expense).then(response => {
        this.$router.push('/expenses')
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
