<template>
  <div class="hello">
    <h1>Latest expenses</h1>
    <div v-for="expense in expenses" :key="expense.id">
      <div>{{ expense.store }} || {{ expense.amount }} || {{ expense.timeOfPurchase }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Expenses',
  data () {
    return {
      expenses: []
    }
  },
  created: function () {
    this.$http.get('http://localhost:8666/api/expenses').then(response => {
      this.expenses = response.data
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
</style>
