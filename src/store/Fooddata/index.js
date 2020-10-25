import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    all: {
      foodData: [],
      isLoading: false
    },
    insertLoading: false,
    pagination: null
  }
}

const getters = {
  getAllFood (state) {
    return state.all
  },
  getInsertLoading (state) {
    return state.insertLoading
  },
  getPagination (state) {
    return state.pagination
  }
}

const mutations = {
  SET_FOOD_DATA (state, payload) {
    state.all.foodData = payload
  },
  SET_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_INSERT_LOADING (state, payload) {
    state.insertLoading = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  }
}

const actions = {
  getFoodData (context, payload) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/pos/find?searchname=${payload.search}&page=${payload.page}`).then(result => {
        if (result.data.msg === 'failed, token expired') {
          alert('Your session has ended')
        } else {
          context.commit('SET_FOOD_DATA', result.data.data)
          context.commit('SET_PAGINATION', result.data.meta.totalPage)
        }
      }).catch(err => {
        reject(err)
      }).finally(() => {
        context.commit('SET_LOADING', false)
      })
    })
  },
  sortFoodData (context, payload) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/pos/find?sortkey=${payload.sort}&page=${payload.page}`).then(result => {
        context.commit('SET_FOOD_DATA', result.data.data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        context.commit('SET_LOADING', false)
      })
    })
  },
  latestFoodData (context, payload) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/pos/find?sortlatest=${payload}`).then(result => {
        context.commit('SET_FOOD_DATA', result.data.data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        context.commit('SET_LOADING', false)
      })
    })
  },
  deleteFoddData (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/pos/delete/${payload}`).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },
  insertFoodData (context, payload) {
    context.commit('SET_INSERT_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/pos/insert`, payload).then((result) => {
        alert(result.data.message)
        window.location = '/'
      }).catch(err => {
        reject(err)
      }).finally(() => {
        context.commit('SET_INSERT_LOADING', false)
      })
    })
  },
  editFoodData (context, payload) {
    context.commit('SET_INSERT_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.patch(`${url}/pos/update/${payload.id}`, payload.formData).then(() => {
        window.location = '/'
      }).catch(err => {
        reject(err)
      }).finally(() => {
        context.commit('SET_INSERT_LOADING', false)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
