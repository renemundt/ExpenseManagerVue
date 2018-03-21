import router from './../router'

export default {
  install: function (Vue, options) {
    Vue.prototype.$socket = new WebSocket('ws://localhost:8666')

    Vue.mixin({
      created () {
        Vue.prototype.$socket.onmessage = function (response) {
          router.push('/barometer')
        }
      }
    })
  }
}
