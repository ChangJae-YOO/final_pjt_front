<template>
  <div id="app">
  <nav class="navbar navbar-expand-xxl navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name: 'home'}">ThemTree</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-4" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item me-4 text-center">
          <router-link class="nav-link" aria-current="page" :to="{name: isLogin ? 'themeFormView' : 'login'}" @click.native="checkLogin('themeFormView', $event)">테마 만들기</router-link>
        </li>
        <li class="nav-item me-4 text-center">
          <router-link class="nav-link" :to="{name: 'search'}">영화 검색</router-link>
        </li>
        <li class="nav-item me-4 text-center">
          <router-link class="nav-link" :to="{name: isLogin ? 'likedMovieView' : 'login'}" @click.native="checkLogin('likedMovieView', $event)">내가 좋아한 영화</router-link>
        </li>
        <li class="nav-item me-4 text-center">
          <router-link class="nav-link" :to="{name: isLogin ? 'likedThemeView' : 'login'}" @click.native="checkLogin('likedThemeView', $event)">내가 좋아한 테마</router-link>
        </li>
        <li class="nav-item me-4 text-center">
          <router-link class="nav-link" :to="{name: isLogin ? 'madeThemeView' : 'login'}" @click.native="checkLogin('madeThemeView', $event)">내가 만든 테마</router-link>
        </li>
      </ul>
      <div v-if="isLogin">
        <router-link :to="{name: 'login'}" @click.native="logout" class="text-light" style="text-decoration:none; margin-right:24px">로그아웃</router-link>
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
        checkLogin(routeName, event) {
        if (!this.isLogin) {
          event.preventDefault()
          alert('로그인이 필요한 서비스입니다. 로그인 후 이용해 주세요!')
        } 
      },
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
  margin: 0 auto;
  }
  .container-fluid{
    margin: 0 220px;
  }
</style>
