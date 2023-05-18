import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
const API_URL = 'http://127.0.0.1:8000'
export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    username: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SET_USERNAME(state, username) {
      state.username = username
    },
    SAVE_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    login(context, payload){
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then(res => {
        context.commit('SAVE_TOKEN', res.data.key)
        context.dispatch('setUsername', username)
        router.push({name: 'home'})
      })
      .catch(err => {
        context.commit('SAVE_TOKEN', null)
        context.commit('SET_USERNAME', null)
        console.log(err)
      })
    },
    signUp(context, payload) {
      const username = payload.username
      const useremail = payload.useremail
      const password1 = payload.password1
      const password2 = payload.password2
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, useremail, password1, password2
        }
      })
      .then(res => {
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch(err => console.log(err))
    },
    setUsername(context, username) {
      context.commit('SET_USERNAME', username)
    }
  },
  modules: {
  },
})
