<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Expenses'}">Expenses</b-nav-item>
        <b-nav-item :to="{ name: 'CreateExpense'}">Create</b-nav-item>
        <b-nav-item :to="{ name: 'Barometer'}">
          <indicator></indicator>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
            <b-dropdown-item v-show="authService.authenticated" @click="logout()">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</template>

<script>
import Indicator from './indicator.vue'

export default {
  name: 'Navigation',
  props: ['authService'],
  components: {
    'indicator': Indicator
  },
  methods: {
    logout: function () {
      this.authService.logout()
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
