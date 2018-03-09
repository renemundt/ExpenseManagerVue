<template>
  <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Expenses'}">Expenses</b-nav-item>
        <b-nav-item :to="{ name: 'CreateExpense'}">Create</b-nav-item>
        <b-nav-item :to="{ name: 'Barometer'}">
          <indicator v-if="isLoggedIn"></indicator>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item right @click="handleLogout()"><span class="fa fa-sign-out"></span>Sign out</b-nav-item>
      </b-navbar-nav>
  </b-navbar>

</template>

<script>
import Indicator from './indicator.vue'
import { isLoggedIn, login, logout, getProfile } from './../utils/auth'

export default {
  name: 'Navigation',
  data () {
    return {
      userName: '',
      userPicture: ''
    }
  },
  mounted: function () {
    if (isLoggedIn()) {
      getProfile((err, result) => {
        if (err) {
          console.log('error', err)
        } else {
          this.userName = result.name
          this.userPicture = result.picture
        }
      })
    }
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
  font-size: 30px;
}
img {
  height: 32px;
}
ul, li {
  display: inline-block;
}

</style>
