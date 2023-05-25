import axios from 'axios'
import router from '../router'

const API_URL = 'https://cjpjt.pythonanywhere.com'

export default {

state: {
  token: null,
  username: null,
},
// token 으로 로그인여부 확인
getters: {
  isLogin(state) {
    return state.token ? true : false
  },
},

mutations: {
  // 유저이름 저장
  SET_USERNAME(state, username) {
    state.username = username
  },
  //토큰 저장
  SAVE_TOKEN(state, token) {
    state.token = token
  },
},

actions: {
  //장고서버로 로그인
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
  // 회원가입 및 장고서버 로그인
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
      context.commit('SET_USERNAME', username)
    })
    .catch(err => console.log(err))
  },
  //로그아웃
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    context.commit('SAVE_TOKEN', null)
    context.commit('SET_USERNAME', null)
  },

  setUsername(context, username) {
    context.commit('SET_USERNAME', username)
  },
},
modules: {
},
}