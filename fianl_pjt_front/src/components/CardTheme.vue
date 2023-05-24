<template>
  <div class="card">
    <div class="card-title">
      <span>{{ theme.title }} </span>
      <span v-if="isLiked" @click="likeTheme"><i class="fas fa-heart"></i></span>
      <span v-else @click="likeTheme"><i class="far fa-heart"></i></span>
      <span>{{ likeCount }}</span>
    </div>
    
    <div class="poster-container" @click="goToDetail" >
      <div class="image-wrapper">
        <img :src="url + theme.image" class="card-img-top" alt="포스터 이미지">
      </div>
      <div class="card-text-overlay">   
        <p class="card-text">{{ theme.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'CardTheme',

  props: {
    theme: Object,
  },

  data() {
    return {
      likeCount: this.theme.like_user.length,
      isLiked: false,
      url: API_URL,
    }
  },

  created() {
    if (this.theme.like_user.includes(this.$store.state.user.username)) {
      this.isLiked = true
    }
    else {
      this.isLiked = false
    }
  },

  methods: {
    likeTheme() {
      if (this.isLiked) {
        axios({
        method: 'post',
        url: `${API_URL}/themes/detail/${this.theme.id}/like_theme/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
      .then((res) => {
        this.likeCount = res.data.like_count
        this.isLiked = !this.isLiked
      })
      .catch((err) => {
          console.error(err)
      })
      } 
      else {
        axios({
        method: 'post',
        url: `${API_URL}/themes/detail/${this.theme.id}/like_theme/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
      .then((res) => {
        this.likeCount = res.data.like_count
        this.isLiked = !this.isLiked
      })
      .catch((err) => {
        console.error(err)
      })
      }
    },


    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },

    goToDetail() {
      this.$router.push({ name: 'theme', params: { id: this.theme.id } });
    },
  },
}
</script>

<style>
.card {
  position: relative;
  width: 100%;
  height: 80%;
  color: white;
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
}
</style>
