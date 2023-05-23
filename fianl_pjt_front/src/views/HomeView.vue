<template>
  <div>

    <h1>홈입니다 ㅋㅋ</h1>
    <p>Welcome, {{ username }}</p>
    <router-link :to="{name: 'detail'}">디테일화면</router-link> |
    <router-link :to="{name: 'theme'}">테마 화면</router-link> |
    <router-link :to="{name: 'themeFormView'}">테마 만들깈ㅋ</router-link>
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