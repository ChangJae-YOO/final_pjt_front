<template>
  <div @click="goToDetail" class="card">
    <div class="poster-container">
      <div class="image-wrapper">
        <img :src="getPosterUrl(movie?.poster_path)" class="card-img-top" alt="포스터 이미지">
      </div>
      <div class="card-text-overlay">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">{{ movie.overview }}</p>
      </div>
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
      return `https://image.tmdb.org/t/p/original${path}`;
    },

    goToDetail() {
      this.$router.push({ name: 'detail', params: { id: this.movie.id } });
    },
  },
}
</script>

<style>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
}

.poster-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 150%;
  overflow: hidden;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}

.card-img-top {
  object-fit: cover;
}
.card-text-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover .card-text-overlay {
  opacity: 1;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 10; /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
