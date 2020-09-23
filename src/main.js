import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import { url } from './helpers/env'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
axios.defaults.headers = {
  token: localStorage.getItem('token')
}

axios.interceptors.response.use(function (response) {
  if (response.data.msg === 'failed, token expired') {
    return new Promise((resolve, reject) => {
      const refreshToken = localStorage.getItem('token_refresh')
      axios.post(`${url}/pos/users/token`, {
        token: refreshToken
      }).then(result => {
        localStorage.setItem('token', result.data.newToken)
        window.location = '/'
      }).catch(err => {
        console.log(err)
      })
    })
  } else {
    return response
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
