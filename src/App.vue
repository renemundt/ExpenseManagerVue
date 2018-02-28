<template>
  <div id="app">
    <navigation></navigation>
    <main role="main">
      <router-view>
      </router-view>
    </main>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue'

export default {
  name: 'app',
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
