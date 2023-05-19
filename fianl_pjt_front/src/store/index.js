import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
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
  actions: {
    setSearchResults({ commit }, { searchInput, movies }) {
      commit('SET_SEARCH_INPUT', searchInput)
      commit('SET_MOVIES', movies)
    },
    clearMovies({ commit }) {
      commit('CLEAR_MOVIES')
    },
  },
  modules: {
    user,
  },
})