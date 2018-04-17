<template>
  <div id="app">
    <navigation v-if="isLoggedIn"></navigation>
    <main role="main">
      <router-view>
      </router-view>
    </main>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue'
import EventBus from './utils/eventBus'
import { isLoggedIn } from './utils/auth'

export default {
  name: 'app',
  data () {
    return {
      isLoggedIn: isLoggedIn()
    }
  },
  components: {
    navigation: Navigation
  },
  mounted: function () {
    EventBus.$on('EVENT_A', () => {
      this.$router.push('barometer')
    })
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
