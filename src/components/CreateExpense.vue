<template>
  <div class="container">
    <div class="form-group">
      <label for="amount">Amount</label>
      <b-form-input v-model="expense.amount" type="number" :state="!$v.expense.amount.$invalid" class="form-control" placeholder="Enter amount"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.amount.$invalid">Amount is mandatory.</span>
    </div>
    <div class="form-group">
      <label for="timeOfPurchase">Time of purchase</label>
      <b-form-input v-model="expense.timeOfPurchase" type="date" :state="!$v.expense.timeOfPurchase.$invalid" class="form-control" placeholder="Time of purchase"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.timeOfPurchase.$invalid">Time of purchase is mandatory.</span>
    </div>
    <div class="form-group">
      <label for="store">Store</label>
      <b-form-input v-model="expense.store" type="text" :state="!$v.expense.store.$invalid" class="form-control"></b-form-input>
      <span class="invalid-feedback" v-if="$v.expense.store.$invalid">Store is mandatory.</span>
    </div>
    <button v-on:click="createExpense()" :disabled="$v.expense.$invalid" type="submit" :class="{'btn-secondary':$v.expense.$invalid, 'btn-primary':!$v.expense.$invalid  }" class="btn">Save</button>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'
import { getProfile } from './../utils/auth'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CreateExpense',
  data () {
    return {
      expense: null
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
    getProfile((err, userProfile) => {
      if (err) console.error(err)
      else {
        this.expense = {
          timeOfPurchase: moment(new Date()).format('YYYY-MM-DD'),
          profile: {
            id: userProfile.sub,
            givenName: userProfile.name
          }
        }
      }
    })
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
