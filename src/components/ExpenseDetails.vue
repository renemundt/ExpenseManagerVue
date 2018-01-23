<template>
  <div class="container" v-if="expense">
    <div class="form-group">
      <label for="amount">Amount</label>
      <b-form-input v-model="expense.amount" type="number" :state="!$v.expense.amount.$invalid" class="form-control" placeholder="Enter amount" :disabled="!editMode"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.amount.$invalid">Amount is mandatory.</span>
    </div>
    <div class="form-group">
      <label for="timeOfPurchase">Time of purchase</label>
      <b-form-input v-model="expense.timeOfPurchase" type="date" :state="!$v.expense.timeOfPurchase.$invalid" class="form-control" placeholder="Time of purchase" :disabled="!editMode"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.timeOfPurchase.$invalid">Time of purchase is mandatory.</span>
    </div>
    <div class="form-group">
      <label for="store">Store</label>
      <b-form-input v-model="expense.store" type="text" :state="!$v.expense.store.$invalid" class="store" :disabled="!editMode"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.store.$invalid">Store is mandatory.</span>
    </div>
    <button v-if="!editMode" v-on:click="enableEdit()" class="btn btn-info">Edit</button>
    <button v-else v-on:click="editExpense()" type="submit" class="btn btn-primary">Save</button>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'ExpenseDetails',
  data () {
    return {
      expense: null,
      editMode: false
    }
  },
  validations () {
    return {
      expense: {
        store: {
          required
        },
        amount: {
          required,
          minValue: minValue(1)
        },
        timeOfPurchase: {
          required
        }
      }
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
      this.editMode = true
    },
    editExpense () {
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
