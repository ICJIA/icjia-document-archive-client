/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
const config = require('@/config.json')
const searchContent = require('../public/api/search.json')

Vue.use(Vuex)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config,
    searchContent,
  },
  mutations: {},
  actions: {

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
