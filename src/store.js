/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
// const config = require('@/config.json')
// const searchContent = require('../public/api/search.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: null,
    isAppReady: false,
  },
  mutations: {
    SET_APP_READY (state, bool) {
      state.isAppReady = bool
      console.log('isAppReady: ', bool)
    },
    SET_CONFIG (state, config) {
      state.config = config
      console.log('Config loaded')
    },

  },
  actions: {
    setConfig ({ commit }, config) {
      commit('SET_CONFIG', config)
    },
    async init ({ commit }) {
      try {
        commit('SET_APP_READY', true)
      } catch (e) {
        console.log(e)
        commit('SET_APP_READY', false)
      }
    },
  },
  getters: {

    config: state => {
      return state.config
    },

  },
})
