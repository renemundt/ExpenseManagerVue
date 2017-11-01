import moment from 'moment'
import { getAccessToken } from './auth'
import Vue from 'vue'

const options = { headers: { Authorization: `Bearer ${getAccessToken()}` } }

export function getExpenses (callback) {
  const presentDay = moment()
  const sameDayLastMonth = moment().subtract(2, 'months')
  const startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
  // const startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
  const endDate = `${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59.000Z`
  const url = `http://localhost:8666/api/expenses?startDate=${startDate}&endDate=${endDate}`
  Vue.http.get(url, options).then(response => {
    // Vue.http.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } }).then(response => {
    let result = sortExpenses(response.data)
    callback(null, result)
  }, error => {
    callback(error, null)
    console.log('error', error)
  })
}

export function deleteExpense (expenseId, callback) {
  Vue.http.delete(`http://localhost:8666/api/expenses/${expenseId}`, options).then(response => {
    callback(null, 'success')
  }, error => {
    callback(error, 'failure')
  })
}

function sortExpenses (expenses) {
  return expenses.sort(function (a, b) {
    a.timeOfPurchase = new Date(a.timeOfPurchase)
    b.timeOfPurchase = new Date(b.timeOfPurchase)
    return a.timeOfPurchase > b.timeOfPurchase ? -1 : a.timeOfPurchase < b.timeOfPurchase ? 1 : 0
  })
}
