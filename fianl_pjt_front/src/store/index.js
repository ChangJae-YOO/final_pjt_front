import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  // user 정보만 local storage상에 저장
  plugins: [
    createPersistedState({
      paths: ['user']
    }),
  ],

  state: {
    searchInput: null,
    movies: [],
  },

  getters: {
    getSearchInput: state => state.searchInput,
    getMovies: state => state.movies,
  },
  
  mutations: {
    SET_SEARCH_INPUT(state, searchInput) {
      state.searchInput = searchInput
    },
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    CLEAR_MOVIES(state) {
      state.movies = []
    },
  },
  // setSearchResults -> 검색한 인풋값과 movies를 넘겨받아 값을 저장하는 mutation으로 넘겨짐
  actions: {
    setSearchResults({ commit }, { searchInput, movies }) {
      commit('SET_SEARCH_INPUT', searchInput)
      commit('SET_MOVIES', movies)
    },
    clearMovies({ commit }) {
      commit('CLEAR_MOVIES')
    },
  },
  // user.js 추가
  modules: {
    user,
  },
})