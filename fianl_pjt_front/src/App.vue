<template>
  <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-4" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item me-4 text-center">
          <a class="nav-link" aria-current="page" href="/theme-form">테마 만들기</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/search">영화 검색</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/liked-movie">내가 좋아한 영화</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/liked-theme">내가 좋아한 테마</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/made-theme">내가 만든 테마</a>
        </li>
      </ul>
      <div v-if="isLogin">
        <a href="#" @click="logout" class="text-light" style="text-decoration:none; margin-right:24px">로그아웃</a>
      </div>
      <div class="text-light" style="margin-right:24px" v-else>
      <router-link :to="{name: 'login'}">로그인</router-link> /
      <router-link :to="{name: 'signup'}">회원가입</router-link>
      </div>
    </div>
  </div>
</nav>
    <router-view/>
  </div>
</template>
  <script>
  import { mapActions,mapGetters } from 'vuex'
  export default {
    computed: {
    ...mapGetters(['isLogin']),
    },

    methods: {
      ...mapActions(['logout']),
    }
  }
  </script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  }

</style>
