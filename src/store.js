/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
// const config = require('@/config.json')
// const searchContent = require('../public/api/search.json')

Vue.use(Vuex)

async function fetchData (endpoint) {
  // eslint-disable-next-line no-unused-vars
  let data
  let response = await fetch(endpoint)
  return (data = await response.json())
}

export default new Vuex.Store({
  state: {
    config: null,
    searchContent: () => [],
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
        let searchContent = await fetchData('https://archive.icjia-api.cloud/files/searchIndex.json')
        console.log('Sarch: ', searchContent)
        commit('SET_APP_READY', true)
      } catch (e) {
        console.log(e)
        commit('SET_APP_READY', false)
      }
    },
  },
  getters: {
    searchContent: state => {
      return state.searchContent
    },
    config: state => {
      return state.config
    },

  },
})
