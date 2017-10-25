<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-collapse is-nav id="nav_collapse">

      <b-nav is-nav-bar>
        <b-nav-item :to="{ name: 'Expenses'}">Expenses</b-nav-item>
        <b-nav-item :to="{ name: 'CreateExpense'}">Create</b-nav-item>
        <b-nav-item :to="{ name: 'Barometer'}">
          <indicator></indicator>
        </b-nav-item>
      </b-nav>

      <!-- Right aligned nav items -->
      <b-nav is-nav-bar class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import Indicator from './indicator.vue'
export default {
  name: 'Navigation',
  components: {
    'indicator': Indicator
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
