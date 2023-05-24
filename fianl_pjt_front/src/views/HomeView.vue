<template>
  <div>
    <h3 v-if="isLogin">Welcome, {{ username }}</h3>
    <div class="texts">
      <span class="rainbow" style="font-size:50px">
        <span class="rainbow-text">테마</span>
        <span>별 영화 추천</span>
      </span>
      <h3 class="top-text">오직 당신만을 위한 주제로 </h3>
      <h3 class="bt-text">영화를 추천받아 보세요</h3>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="@/assets/ㅋㅋ.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>롤 성향에 따른 영화 추천</h5>
        <p>리그오브레전드를 즐길 때 플레이어의 성향에 맞춰 영화를 추천해 드립니다.</p>
      </div>
    </div>
        <div class="carousel-item">
      <img src="@/assets/카리나.webp" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>음악취향에 따른 영화 추천</h5>
        <p>좋아하는 음악을 파악해서 영화를 추천해 드립니다.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="@/assets/류승범.jpeg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>패션 스타일에 맞는 영화 추천</h5>
        <p>옷스타일에 따라 영화를 추천해 드립니다.</p>
      </div>
    </div>
        <div class="carousel-item">
      <img src="@/assets/쓸거.jpeg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>오늘 기분에 맞는 영화 추천</h5>
        <p>당신의 오늘 하루 기분에 따라 영화를 추천해 드립니다.</p>
      </div>
    </div>

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </div>
    <div class="card-container">
      <div class="card-row">
        <div class="card-col" v-for="theme in themes" :key="theme.id">
          <CardTheme :theme="theme" :show-delete-button="false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import CardTheme from '@/components/CardTheme'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'HomeView',

  components:{
    CardTheme,
  },

  // mapGetters 로그인 된상태면 isLogin true, 로그아웃상태면 false
  // store.state.user 는 store에서 user에 대한 state를 갖고있음
  computed: {
    ...mapGetters(['isLogin']),
    username() {
      return this.$store.state.user.username
    },
  },

  data() {
    return {
      themes: [],
    }
  },

  created() {
    this.getThemes()
  },
  
  methods: {
    ...mapActions(['logout']),

    getThemes() {
      axios({
        url: `${API_URL}/themes/index/`,
        method: 'get',
      })
      .then((res) => {
        this.themes = res.data
        console.log(this.themes)
      })
      .catch((err) => {
        console.log(err)
      }) 
    }
  }
}
</script>

<style>
.container {
  padding: 0;

  @media (min-width: 768px) {
  padding: 0 50px;
  }
}
.container-fluid{
    padding: 0;

  @media (min-width: 768px) {
  padding: 0 100px;
  }
}
.rainbow-text {
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.top-text {
  margin-top: 30px;
}
.bt-text {
  margin-bottom: 100px;
}
.texts {
  position: relative;
  margin-top: 150px;
  text-align: left;
  padding-left: 200px
}
.carousel {
  max-width: 600px; /* 원하는 캐러셀 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬을 위해 필요한 경우 */
}

.carousel-control-prev,
.carousel-control-next {
  font-size: 20px; /* 버튼 크기 조정 */
  /* 원하는 추가 스타일 설정 */
}
.carousel-item {
  width: 600px;
  height: 400px;
}
.carousel-item img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
#carouselExampleCaptions {
  top:-300px;
  left: 150px;
}
</style>