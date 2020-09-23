import axios from 'axios'

const state = () => {
  return {
    dataCategory: []
  }
}

const getters = {
  getCategory (state) {
    return state.dataCategory
  }
}

const mutations = {
  SET_DATA_CATEGORY (state, payload) {
    state.dataCategory = payload
  }
}

const actions = {
  loadCategory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://34.232.66.65:3002/category/find').then(result => {
        context.commit('SET_DATA_CATEGORY', result.data.data)
      }).catch(err => {
        alert(err.message)
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
