<template>
  <div class="indicator">
    <div class="average">{{average}}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'indicator',
  data () {
    return {
      average: 0,
      temperature: 'UNKNOWN'
    }
  },
  created: function () {
    let presentDay = moment()
    let sameDayLastMonth = moment().subtract(1, 'months')
    let startDate = `${sameDayLastMonth.format('YYYY')}-${sameDayLastMonth.format('MM')}-${sameDayLastMonth.daysInMonth()}T23:59:59.000Z`
    let endDate = `${presentDay.format('YYYY')}-${presentDay.format('MM')}-${presentDay.daysInMonth()}T23:59:59.000Z`
    let url = `http://localhost:8666/api/expenses?startDate=${startDate}&endDate=${endDate}`
    this.$http.get(url).then(response => {
      let expenses = response.data
      if (expenses.length === 0) {
        this.average = 0
        this.temperature = 'NORMAL'
        return
      }
      let total = expenses.map(expense => expense.amount).reduce((previous, current) => { return previous + current })
      this.average = total / +moment().toDate().getDate()
      if (this.average < 300) { this.temperature = 'NORMAL' }
      if (this.average > 300 && this.average < 400) { this.temperature = 'MIDDLE' }
      if (this.average > 400) { this.temperature = 'HIGH' }
    }, error => {
      console.log('error', error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.indicator {
  width: 200px;
  height: 100%;
  background-color: red;

  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
.average {
  position: relative;
  top: 50%;
  transform: translateY(-50%); 
  text-align: center;
  font-weight: bold;
}

</style>
