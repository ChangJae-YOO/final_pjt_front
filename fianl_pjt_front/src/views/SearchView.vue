<template>
  <div>
      <form @submit.prevent="search" class="px-4 py-3">
      <div class="mb-3">
        <label for="search" class="form-label">검색창</label>
        <input type="text" class="form-control" id="search" placeholder="검색어를 입력하세요" v-model="searchInput">
      </div>
      </form>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="movie in movies" 
        :key="movie.id">
        <CardComponent 
        :movie="movie" :key="movie.id"
        />
      </div>  
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'SearchView',
  components: {
    CardComponent,
  },
  data(){
    return {
      searchInput: null,
    }
  },
  methods: {
    search(){
      axios({
        method: 'get',
        url: `${API_URL}/movies/search/${this.searchInput}/`,
      })
      .then((res) => {
        this.$store.dispatch('setSearchResults', { searchInput: this.searchInput, movies: res.data})
        this.searchInput = null
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    movies(){
      return this.$store.getters.getMovies
    }
  }
}
</script>

<style>

</style>