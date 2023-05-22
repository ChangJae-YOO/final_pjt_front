<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-4" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item me-4 text-center">
          <a class="nav-link" aria-current="page" href="/theme">테마 만들기</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="/search">영화 검색</a>
        </li>
        <li class="nav-item me-4 text-center">
          <a class="nav-link" href="#">내가 좋아한 영화</a>
        </li>
      </ul>
      <div v-if="isLogin">
        <a href="#" @click="logout" class="text-light" style="text-decoration:none; margin-right:24px">로그아웃</a>
      </div>
      <div class="text-light" style="margin-right:24px" v-else>
      <a href="http://localhost:8080/accounts/login" class="text-light" style="text-decoration:none">로그인</a> /
      <a href="http://localhost:8080/accounts/signup" class="text-light" style="text-decoration:none">회원가입</a>
      </div>
    </div>
  </div>
</nav>
    <h1>Detail</h1>

    <p>글 번호 : {{ movie?.id }}</p>
    <p>제목 : {{ movie?.title }}</p>
    <p>{{ movie?.overview }}</p>
    <img :src="getPosterUrl(movie?.poster_path)" alt="Movie Poster" width="300px" height="300px">

    <form @submit.prevent="createComment">
      <label for="comment" class="form-label">댓글 입력</label>
      <input class="form-control" id="comment" v-model="comment">
    </form>

    <div v-for="commentDict in commentSet" :key="commentDict.id">
    <DetailComment
    :Comment="commentDict"
    @commentDeleted="getMovieDetail"
    @commentEdited="getMovieDetail"
    />
    </div>
  </div>
</template>

<script>
import DetailComment from '@/components/DetailComment'
import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  
  components: {
    DetailComment,
  },
  
  data() {
    return {
      movie: null,
      commentSet: null,
      comment: null, // v-model로 연결된 input변수
    }
  },
  
  created() {
    this.getMovieDetail()
  },

  computed: {
    ...mapGetters(['isLogin']),
  },

  methods: {
    ...mapActions(['logout']),
    // movie 변수에 movie 인스턴스 저장, 동시에 commentSet 변수에 comment_set 저장
    getMovieDetail() {
     axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.movie = res.data
        this.commentSet = res.data.comment_set
      })
      .catch((err) => {
        console.log(err)
      }) 
    },

    // 포스터 가져오기
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/original${path}`
    },

    // 댓글 생성함수
    createComment() {
      axios({
        method: 'post',
        url: `${API_URL}/movies/detail/${ this.$route.params.id }/comment_create/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
        data: {
          content: this.comment,
        }
      })
      .then((res) => {
        this.userComment = res.data.content
        this.userName = res.data.user_name
        this.getMovieDetail()
        this.comment = null
      })
      .catch(() => {
        alert('로그인 하세용 ㅋㅋ')
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
</style>