import EventBus from './eventBus'

export default {
  install: function (Vue, options) {
    Vue.prototype.$socket = new WebSocket(process.env.WEBSOCKETURL)

    Vue.mixin({
      created () {
        Vue.prototype.$socket.onmessage = function (response) {
          EventBus.$emit('EVENT_A', 'Must redirect')
        }
      }
    })
  }
}
