import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import food from './Fooddata'
import category from './category'
import history from './history'

import { url } from '../helpers/env'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    food,
    category,
    history
  },
  state: {
    token: localStorage.getItem('token') || null
  },
  getters: {
    isLogin (state) {
      if (state.token !== null) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    onLogin (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/pos/users/login`, {
          email: payload.loginEmail,
          password: payload.loginPassword
        }).then(result => {
          resolve(result.data.message)
          localStorage.setItem('token', result.data.data.token)
          localStorage.setItem('token_refresh', result.data.data.token_refresh)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token_refresh')
        resolve()
      })
    },
    onRegister (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/pos/users/register`, payload).then(result => {
          resolve(result.data.message)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
