<template>
  <div>
    <h1>홈입니다 ㅋㅋ</h1>
    <p>Welcome, {{ username }}</p>
    <router-link :to="{name: 'login'}">로그인 화면</router-link> |
    <router-link :to="{name: 'signup'}">회원가입 화면</router-link> |
    <router-link :to="{name: 'detail'}">디테일화면</router-link> |
    <router-link :to="{name: 'search'}">검색 화면</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['isLogin']),
    username() {
      return this.$store.state.username
    },
  },
  created() {
    if (this.isLogin) {
      this.getUserInfo()
    }
  },
  methods: {
    getUserInfo() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.$store.commit('SET_USERNAME', res.data.username)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>

</style>