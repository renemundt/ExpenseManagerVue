<template>
  <div>
    <h1>Barometer</h1>
    <table class="table table-sm">
      <thead class="thead-inverse">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Total</th>
          <th scope="col">Average</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in barometerExpenses" :key="expense.timeOfPurchase.toString()">
          <td>{{longDate(expense.timeOfPurchase)}}</td>
          <td>{{expense.totalAmount}}</td>
          <td>{{expense.monthToDayAmount}}</td>
          <td>{{expense.average}}</td>
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
          let sortedExpenses = this.sortExpenses(result)
          let barometerExpenses = this.mapReduce(sortedExpenses)
          this.barometerExpenses = this.sortExpenses(barometerExpenses)
        }
      })
    },
    mapReduce: function (expenses) {
      let monthToDayAmountCnt = 0
      const result = expenses.reduce(function (res, currentValue) {
        const tempDate = moment(currentValue.created).format('YYYY-MM-DD')
        if (res.indexOf(tempDate) === -1) {
          res.push(tempDate)
        }
        return res
      }, []).map(function (timeOfPurchase, index) {
        const tAmount = this.getTotalAmountPerDay(expenses, timeOfPurchase)
        monthToDayAmountCnt += tAmount
        return {
          timeOfPurchase: moment(timeOfPurchase).toDate(),
          totalAmount: tAmount,
          monthToDayAmount: monthToDayAmountCnt,
          average: monthToDayAmountCnt / (moment(timeOfPurchase).toDate().getDate())
        }
      }, this)
      return result
    },
    getTotalAmountPerDay: function (expenses, timeOfPurchase) {
      const result = expenses.filter(function (expense) {
        return moment(expense.timeOfPurchase).format('YYYY-MM-DD') === timeOfPurchase
      }).map(function (expense) { return expense.amount })
        .reduce((previous, current) => {
          return previous + current
        })
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
