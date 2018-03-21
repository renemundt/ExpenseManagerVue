export default {
  install: function (Vue, options) {
    Vue.prototype.$socket = new WebSocket('ws://localhost:8666')

    Vue.mixin({
      created () {
        Vue.prototype.$socket.onmessage = function (response) {
          console.log(response.data) // upon message
        }
      }
    })
  }
}
