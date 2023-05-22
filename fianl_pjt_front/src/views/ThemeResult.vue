<template>
  <div>
    <h1>결괔ㅋㅋㅋ</h1>
    <ResultMovie/>
    {{ movies }}
  </div>
</template>

<script>
import ResultMovie from '@/components/ResultMovie'
// import router from '@/router'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ThemeResult',
  
  components: {
    ResultMovie
  },
  
  data() {
    return {
      inputData: this.$store.state.themeResult,
      movies: {},
    }
  },
  
  created() {
    this.getMovies()
  },
  
  methods: {
    getMovies() {
     axios({
        method: 'POST',
        url: `${API_URL}/themes/detail/get_movies/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
        data: {
          content: this.inputData,
        }
      })
      .then((res) => {
        console.log(res.data)
        this.movies = res.data
      })
      .catch((err) => {
        console.log(err)
      }) 
    },
  }
}
</script>

<style>

</style>