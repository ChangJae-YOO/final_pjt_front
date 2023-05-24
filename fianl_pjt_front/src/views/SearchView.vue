<template>


  <div>
    <img src="@/assets/zz.jpeg" alt="">
    <div class="search-container">
      <form @submit.prevent="search" class="search-form">
        <div class="search-input">
          <label for="search" class="form-label"></label>
          <input type="text" class="form-control" id="search" placeholder="검색어를 입력하세요" v-model="searchInput">
        </div>
      </form>
    </div>

    <div class="card-container">
      <div class="card-row">
        <div class="card-col" v-for="movie in movies" :key="movie.id">
          <CardComponent :movie="movie" :key="movie.id" />
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import CardComponent from '@/components/CardComponent'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

const API_URL = 'http://127.0.0.1:8000'

export default {
  // detail에서 뒤로가기를 누를때, redirect되는 사이트가 검색페이지이면 movies정보를 유지해주고, 그게아니라면 movies를 비우는 작업
  beforeRouteLeave(to, from, next) {
    if (to.name === 'detail') {
      next()
    } else {
      this.clearMovies()
      next()
    }
  },

  name: 'SearchView',

  components: {
    CardComponent,
  },

  data() {
    return {
      searchInput: null,
    }
  },

  methods: {
    // 검색 기능 구현
    search() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/search/${this.searchInput}/`,
      })
        .then((res) => {
          this.$store.dispatch('setSearchResults', { searchInput: this.searchInput, movies: res.data })
          this.searchInput = null
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions(['logout']),
    ...mapActions(['clearMovies']),
  },

  computed: {
    ...mapGetters(['isLogin']),
    movies() {
      return this.$store.getters.getMovies
    }
  }
}
</script>

<style>
.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 400px;
}
/* .card-container {
  margin: 0 auto;
  max-width: 1200px;
} */

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card-col {
  flex: 0 0 calc(25% - 15px);
  max-width: calc(25% - 15px);
}

@media (max-width: 991px) {
  .card-col {
    flex: 0 0 calc(33.33333% - 15px);
    max-width: calc(33.33333% - 15px);
  }
}

@media (max-width: 767px) {
  .card-col {
    flex: 0 0 calc(50% - 15px);
    max-width: calc(50% - 15px);
  }
}

@media (max-width: 575px) {
  .card-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

</style>
