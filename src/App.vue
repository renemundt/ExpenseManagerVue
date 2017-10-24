<template>
  <div id="app">
    <navigation></navigation>
    <indicator></indicator>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue'
import Indicator from './components/indicator.vue'
export default {
  name: 'app',
  components: {
    'navigation': Navigation,
    'indicator': Indicator
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
