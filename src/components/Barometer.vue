<template>
  <div>
    <h1>Barometer</h1>
    <table class="table table-sm">
      <thead class="thead-inverse">
        <tr>
          <th scope="col">Date</th>
          <th scope="col" class="text-right">Amount</th>
          <th scope="col"></th>
          <th scope="col" class="text-right">Total</th>
          <th scope="col"></th>
          <th scope="col" class="text-right">Average</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in barometerExpenses" :key="expense.timeOfPurchase.toString()">
          <td>{{longDate(expense.timeOfPurchase)}}</td>
          <td class="text-right">{{expense.totalAmountPerDay | currency}}</td>
          <td></td>
          <td class="text-right">{{expense.monthToDayAmount | currency}}</td>
          <td></td>
          <td class="text-right">{{expense.average | currency}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'

export default {
  name: 'Barometer',
  data () {
    return {
      barometerExpenses: []
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
        if (err) console.error(err)
        else {
          this.barometerExpenses = this.sortExpenses(this.groupByTimeOfPurchaseAndCalcTotals(result))
        }
      })
    },
    groupByTimeOfPurchaseAndCalcTotals: function (expenses) {
      let monthToDayAmount = 0
      const result = expenses.reduce(function (res, currentExpense) {
        let existingExpense = res.find(e => moment(e.timeOfPurchase).date() === moment(currentExpense.timeOfPurchase).date())
        monthToDayAmount += currentExpense.amount
        if (!existingExpense) {
          currentExpense.monthToDayAmount = monthToDayAmount
          res.push(currentExpense)
        } else {
          existingExpense.monthToDayAmount = monthToDayAmount
          existingExpense.amount += currentExpense.amount
        }
        return res
      }, []).map(function (expense, index) {
        return {
          timeOfPurchase: moment(expense.timeOfPurchase).toDate(),
          totalAmountPerDay: expense.amount,
          monthToDayAmount: expense.monthToDayAmount,
          average: expense.monthToDayAmount / (moment(expense.timeOfPurchase).date())
        }
      }, this)
      return result
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
  width: 150px;
}
</style>
