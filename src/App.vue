<template>
  <div id="app">
    <navigation :authService="authService" v-if="authenticated"></navigation>   
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import AuthService from './utils/auth2'
import Navigation from './components/navigation.vue'
const authService = new AuthService()
const { authNotifier } = authService

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
      this.admin = authState.admin
    })
    return {
      authService,
      authenticated: authService.authenticated
    }
  },
  components: {
    navigation: Navigation
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
