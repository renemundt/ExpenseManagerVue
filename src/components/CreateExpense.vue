<template>
  <div v-if="expense">
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
    <button v-on:click="createExpense()" type="submit" class="btn btn-primary">Save</button>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'

export default {
  name: 'CreateExpense',
  data () {
    return {
      expense: null
    }
  },
  created: function () {
    this.expense = {
      timeOfPurchase: moment(new Date()).format('YYYY-MM-DD'),
      profile: {
        id: 'test-profil-id',
        givenName: 'Leo Lummerkrog'
      }
    }
  },
  methods: {
    createExpense () {
      expensesService.createExpense(this.expense, (err, result) => {
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
