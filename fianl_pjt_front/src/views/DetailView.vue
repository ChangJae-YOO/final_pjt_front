<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호 : {{ movie?.id }}</p>
    <p>제목 : {{ movie?.title }}</p>
    <p>{{ movie?.overview }}</p>
    <img :src="getPosterUrl(movie?.poster_path)" alt="Movie Poster" width="300px" height="300px">
    <CommunityForm/>
  </div>
</template>

<script>
import CommunityForm from '@/components/CommunityForm'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailView',
  components: {
    CommunityForm,
  },
  data() {
    return {
      movie: null,

    }
  },
  created() {
    this.getMovieDetail()
  },
  methods: {
    getMovieDetail() {
     axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res)
        this.movie = res.data
      })
      .catch((err) => {
        console.log(err)
      }) 
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`
    }
  }

}
</script>

<style>

</style>