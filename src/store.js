/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
// const config = require('@/config.json')
// const searchContent = require('../public/api/search.json')
import axios from 'axios'
import { EventBus } from './event-bus.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: null,
    isAppReady: false,
    status: '',
    jwt: localStorage.getItem('jwt') || '',
    userMeta: JSON.parse(localStorage.getItem('userMeta')) || '',
    user: {},
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
    AUTH_SUCCESS (state, payload) {
      state.jwt = payload.jwt
      state.userMeta = payload.userMeta
      console.log('logged in')
    },
    AUTH_ERROR (state, err) {
      console.log(err)
      let obj = {}
      obj.msg = err.toString()
      EventBus.$emit('error', obj)
    },
    AUTH_LOGOUT (state, err) {
      state.jwt = ''
      state.user = {}
      state.userMeta = ''
      console.log('logged out')
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
    logout ({ commit, state }) {
      // eslint-disable-next-line no-unused-vars
        commit('AUTH_LOGOUT')
        localStorage.removeItem('jwt')
        localStorage.removeItem('userMeta')
        delete axios.defaults.headers.common['Authorization']
        // resolve()
    },
    async login ({ commit, state }, payload) {
      let identifier = payload.identifier
      let password = payload.password
      let agency = payload.agency

      let auth = state.config.auth[agency].url
      return new Promise((resolve, reject) => {
       axios
        .post(auth, {
          identifier: `${identifier}`,
          password: `${password}`,
        })
        .then(response => {
          // Handle success.

          console.log('User profile', response.data.user)
          console.log('User token', response.data.jwt)
          const jwt = response.data.jwt
          const userMeta = response.data.user
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('userMeta', JSON.stringify(userMeta))
          commit('AUTH_SUCCESS', { jwt, userMeta })
          resolve(response)
        })
        .catch(error => {
          // Handle error.
          let message = error
          commit('AUTH_ERROR', message)
          // console.log('An error occurred:', error)
          reject(error)
        })
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    userMeta: state => state.userMeta,
    config: state => {
      return state.config
    },
  },
})
