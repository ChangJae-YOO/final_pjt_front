<template>
  <div>
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
    :Comment="commentDict"/>
    </div>
  </div>
</template>

<script>
import DetailComment from '@/components/DetailComment'
import axios from 'axios'

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
  
  methods: {
    // movie 변수에 movie 인스턴스 저장, 동시에 commentSet 변수에 comment_set 저장
    getMovieDetail() {
     axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res)
        this.movie = res.data
        this.commentSet = res.data.comment_set
        console.log(this.commentSet)
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
      .catch((err) => {
        console.log(err)
      })
    }
  }

}
</script>

<style>

</style>