<template>
  <div>
    <h1>홈입니다 ㅋㅋ</h1>
    <div v-if="isLogin">
    <p>Welcome, {{ username }}</p>
    <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
    <router-link :to="{name: 'login'}">로그인 화면</router-link> |
    </div>
    <router-link :to="{name: 'signup'}">회원가입 화면</router-link> |
    <router-link :to="{name: 'detail'}">디테일화면</router-link> |
    <router-link :to="{name: 'search'}">검색 화면</router-link>
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

</style>