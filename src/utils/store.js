import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    monthToDayAverage: 0
  },
  mutations: {
    setAverage: (state, payload) => {
      state.monthToDayAverage = payload
    }
  },
  getters: {
    average: state => state.monthToDayAverage
  }
})
