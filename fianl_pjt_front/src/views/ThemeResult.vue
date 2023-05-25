<template>
  <div class="mt-5">
    <ResultMovie :Movie="movies"/>
  </div>
</template>

<script>
import ResultMovie from '@/components/ResultMovie'
// import router from '@/router'
import axios from 'axios'

const API_URL = 'https://cjpjt.pythonanywhere.com'

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
        url: `${API_URL}/movies/get_movies/`,
        method: 'post',
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