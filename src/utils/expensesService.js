import moment from 'moment'
import Vue from 'vue'

import { getAccessToken } from './../utils/auth'

const options = { headers: { Authorization: `Bearer ${getAccessToken()}` } }
const apiUrl = process.env.API_URL

export function getExpenses (callback) {
  const presentDay = moment()
  const sameDayLastMonth = moment().subtract(1, 'months')
  const startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
  const endDate = `${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59.000Z`
  const url = `${apiUrl}/expenses?startDate=${startDate}&endDate=${endDate}`
  Vue.http.get(url, options).then(response => {
    callback(null, response.data)
  }, error => {
    callback(error, null)
    console.log('error getting expenses', error)
  })
}

export function createExpense (expense, callback) {
  Vue.http.post(`${apiUrl}/expenses/`, expense, options).then(response => {
    callback(null, response.data)
  }, error => {
    callback(error, null)
    console.log('error creating expense', error)
  })
}

export function getExpense (expenseId, callback) {
  Vue.http.get(`${apiUrl}/expenses/${expenseId}`, options).then(response => {
    callback(null, response.data)
  }, error => {
    callback(error, null)
    console.log('error getting expense', error)
  })
}

export function updateExpense (expense, callback) {
  Vue.http.put(`${apiUrl}/expenses/${expense.id}`, expense, options).then(response => {
    callback(null, response.data)
  }, error => {
    callback(error, null)
    console.log('error updating expense', error)
  })
}

export function deleteExpense (expenseId, callback) {
  Vue.http.delete(`${apiUrl}/expenses/${expenseId}`, options).then(response => {
    callback(null, 'success')
  }, error => {
    callback(error, 'error deleting expense')
  })
}
