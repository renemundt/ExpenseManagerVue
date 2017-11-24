<template>
  <div class="indicator" v-bind:class="[temperature]">
    <div class="average">{{average | currency }}</div>
  </div>
</template>

<script>
import moment from 'moment'
import * as expensesService from './../utils/expensesService'

export default {
  name: 'indicator',
  data () {
    return {
      average: 0,
      temperature: 'UNKNOWN'
    }
  },
  created: function () {
    expensesService.getExpenses((err, result) => {
      if (err) this.showError = true
      else {
        this.messureTemperature(result)
      }
    })
  },
  methods: {
    messureTemperature: function (expenses) {
      if (expenses === null) {
        this.average = 0
        this.temperature = 'temperature-unknown'
        return
      }
      let total = expenses.map(expense => expense.amount).reduce((previous, current) => { return previous + current })
      this.average = total / +moment().toDate().getDate()
      if (this.average < 300) { this.temperature = 'temperature-normal' }
      if (this.average > 300 && this.average < 400) { this.temperature = 'temperature-middle' }
      if (this.average > 400) { this.temperature = 'temperature-high' }
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
.indicator {
  width: 200px;
  height: 100%;

  position: absolute;
  top: 0;
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
.temperature-normal {
  background-color: darkgreen;
}
.temperature-middle {
  background-color: yellow;
}
.temperature-high {
  background-color: red;
}
</style>
