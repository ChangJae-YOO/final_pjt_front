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
        <a href="#" @click="logout" class="text-light" style="text-decoration:none">로그아웃</a>
      </div>
      <div class="text-light" style="margin-right:24px" v-else>
      <a href="accounts/login" class="text-light" style="text-decoration:none">로그인</a> /
      <a href="accounts/signup" class="text-light" style="text-decoration:none">회원가입</a>
      </div>
    </div>
  </div>
</nav>
    <h1>홈입니다 ㅋㅋ</h1>
    <p>Welcome, {{ username }}</p>
    <router-link :to="{name: 'detail'}">디테일화면</router-link> |
    <router-link :to="{name: 'theme'}">테마 화면</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',

  // mapGetters 로그인 된상태면 isLogin true, 로그아웃상태면 false
  // store.state.user 는 store에서 user에 대한 state를 갖고있음
  computed: {
    ...mapGetters(['isLogin']),
    username() {
      return this.$store.state.user.username
    },
  },
  
  methods: {
    ...mapActions(['logout']),
  }
}
</script>

<style>
.navbar-brand {
  padding: 0 30px 0 40px;
}
</style>