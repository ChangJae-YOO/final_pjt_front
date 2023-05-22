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
        url: `${API_URL}/themes/detail/get_movies/`,
        method: 'post',
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
        data: this.inputData,
      })
      .then((res) => {
        console.log(res.data)
        console.log(this.inputData)
        console.log(this.$store.state.themeResult)
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