<template>
  <div class="card h-100" @click="goToDetail">

      <img :src="getPosterUrl(movie?.poster_path)" class="card-img-top" alt="poster_image">

      <div class="card-body">
        <h5 class="card-title">
          {{movie.title}}
        </h5>
        <p class="card-text">{{movie.overview}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',

  props: {
    movie: Object,
  },

  methods: {

    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`
    },
    
    goToDetail() {
      this.$router.push({name:'detail', params:{id:this.movie.id}})
    },
  }
}
</script>

<style>

</style>