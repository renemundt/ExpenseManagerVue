<template>
  <div class="indicator" v-bind:class="[temperatureClass]">
    <div class="average">{{average | currency }}</div>
  </div>
</template>

<script>

export default {
  name: 'indicator',
  computed: {
    average: function () {
      return this.$store.getters.average
    },
    temperatureClass: function () {
      if (this.$store.getters.average <= 300) { return 'temperature-normal' }
      if (this.$store.getters.average > 300 && this.$store.getters.average <= 400) { return 'temperature-middle' }
      return 'temperature-high'
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
