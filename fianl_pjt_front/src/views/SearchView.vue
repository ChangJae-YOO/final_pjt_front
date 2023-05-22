<template>
  <div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-4" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item me-4 text-center">
          <a class="nav-link" aria-current="page" href="/theme">테마 만들기</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/search">영화 검색</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="#">내가 좋아한 영화</a>
        </li>
      </ul>
      <div v-if="isLogin">
        <a href="#" @click="logout" class="text-light" style="text-decoration:none; margin-right:24px">로그아웃</a>
      </div>
      <div class="text-light" style="margin-right:24px" v-else>
      <a href="accounts/login" class="text-light" style="text-decoration:none">로그인</a> /
      <a href="accounts/signup" class="text-light" style="text-decoration:none">회원가입</a>
      </div>
    </div>
  </div>
</nav>
<div class="container">
      <form @submit.prevent="search" class="px-4 py-3">
      <div class="mb-3">
        <label for="search" class="form-label">
        </label>
        <input type="text" class="form-control" id="search" placeholder="검색어를 입력하세요" v-model="searchInput">
      </div>
      </form>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="movie in movies" 
        :key="movie.id">
        <CardComponent 
        :movie="movie" :key="movie.id"
        />
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'

const API_URL = 'http://127.0.0.1:8000'

export default {
  // detail에서 뒤로가기를 누를때, redirect되는 사이트가 검색페이지이면 movies정보를 유지해주고, 그게아니라면 movies를 비우는 작업
  beforeRouteLeave(to, from, next) {
    if (to.name === 'detail') {
      next()
    } else {
    this.clearMovies()
    next()
    }
  },

  name: 'SearchView',

  components: {
    CardComponent,
  },

  data(){
    return {
      searchInput: null,
    }
  },

  methods: {
    // 검색 기능 구현
    search(){
      axios({
        method: 'get',
        url: `${API_URL}/movies/search/${this.searchInput}/`,
      })
      .then((res) => {
        this.$store.dispatch('setSearchResults', { searchInput: this.searchInput, movies: res.data})
        this.searchInput = null
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ...mapActions(['logout']),
    ...mapActions(['clearMovies']),
  },

  computed: {
    ...mapGetters(['isLogin']),
    movies(){
      return this.$store.getters.getMovies
    }
  }
}
</script>

<style>
.container {
  padding: 0;

  @media (min-width: 768px) {
  padding: 0 50px;
  }
}
.container-fluid{
    padding: 0;

  @media (min-width: 768px) {
  padding: 0 100px;
  }
}
</style>