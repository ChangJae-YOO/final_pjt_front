<template>
  <div class="container">
    <div class="header">
      <img :src="getPosterUrl(movie?.poster_path)" alt="Movie Poster" class="poster">
      <h3 class="title">{{ movie?.title }}</h3>
    </div>

    <div class="content">
      <div class="overview">
        <h2>개요</h2>
        <p>{{ movie?.overview }}</p>
      </div>

      <div class="comment-form">
        <h2>댓글 입력</h2>
        <form @submit.prevent="createComment">
          <div class="form-group">
            <label for="comment" class="form-label">댓글</label>
            <input class="form-control" id="comment" v-model="comment">
          </div>
          <button type="submit" class="btn btn-primary">작성</button>
        </form>
      </div>

      <div class="comments">
        <h2>댓글</h2>
        <div v-for="commentDict in commentSet" :key="commentDict.id">
          <DetailComment :Comment="commentDict" @commentDeleted="getMovieDetail" @commentEdited="getMovieDetail" />
        </div>
      </div>
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
</style>