<template>
  <div>
    <p>Welcome, {{ username }}</p>
    <router-link :to="{name: 'detail'}">디테일화면</router-link> |
    <router-link :to="{name: 'themeFormView'}">테마 만들깈ㅋ</router-link>
  
    <div class="card-container">
      <div class="card-row">
        <div class="card-col" v-for="theme in themes" :key="theme.id">
          <CardTheme :theme="theme"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import CardTheme from '@/components/CardTheme'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'HomeView',

  components:{
    CardTheme,
  },

  // mapGetters 로그인 된상태면 isLogin true, 로그아웃상태면 false
  // store.state.user 는 store에서 user에 대한 state를 갖고있음
  computed: {
    ...mapGetters(['isLogin']),
    username() {
      return this.$store.state.user.username
    },
  },

  data() {
    return {
      themes: [],
    }
  },

  created() {
    this.getThemes()
  },
  
  methods: {
    ...mapActions(['logout']),

    getThemes() {
      axios({
        url: `${API_URL}/themes/index/`,
        method: 'get',
      })
      .then((res) => {
        this.themes = res.data
        console.log(this.themes)
      })
      .catch((err) => {
        console.log(err)
      }) 
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