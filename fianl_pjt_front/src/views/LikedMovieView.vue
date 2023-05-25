<template>


  <div>
    <div class="card-container">
      <div class="card-row">
        <div class="card-col" v-for="movie in movies" :key="movie.id">
          <CardComponent :movie="movie"/>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import CardComponent from '@/components/CardComponent'
import axios from 'axios'

const API_URL = 'http://cjpjt.pythonanywhere.com'

export default {
  name: 'LikedMovieView',

  components: {
    CardComponent,
  },

  data() {
    return {
      movies: {},
    }
  },

  created(){
    this.search()
  },

  methods: {
    // 검색 기능 구현
    search() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/liked_movie/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
        .then((res) => {
          this.movies = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
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
.card-container {
  padding-top: 30px;
  margin: 0 auto;
  max-width: 1200px;
}

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
