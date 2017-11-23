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
            <em>{{ userName }}</em>
            <!-- <em>User</em> -->
          </template>
            <b-dropdown-item v-show="isLoggedIn" @click="handleLogout()">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</template>

<script>
import Indicator from './indicator.vue'
import { isLoggedIn, login, logout, getProfile } from './../utils/auth'

export default {
  name: 'Navigation',
  data () {
    return {
      userName: ''
    }
  },
  mounted: function () {
    getProfile((err, result) => {
      if (err) {
        console.log('error', err)
      } else {
        this.userName = result.name
      }
    })
  },
  components: {
    'indicator': Indicator
  },
  methods: {
    handleLogout: function () {
      logout()
    },
    handleLogin: function () {
      login()
    },
    isLoggedIn: function () {
      return isLoggedIn()
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
