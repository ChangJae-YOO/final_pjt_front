<template>
  <div class="container">
    <!-- <div class="header" :style="{ backgroundImage: `url(${getBackDropUrl(movie?.backdrop_path)})` }"> -->
    <div class="header">
      <div class="title-likes">
      <h3 class="title">{{ movie?.title }}</h3>
      <div class="likes-count"><div class="heart-icon"><i class="fas fa-heart"></i>
      <span>몇개인지</span>
      </div>
      </div>
      </div>
      <img :src="getPosterUrl(movie?.poster_path)" alt="Movie Poster" class="poster">
    </div>

      <div class="buttons">
        <button>좋아요</button>
        <button>싫어요</button>
        <button>봤어요</button>
      </div>
    <div class="content">
      <div class="overview">
        <h2>개요</h2>
        <p class="movie-overview">{{ movie?.overview }}</p>
      </div>
    
      <div class="comment-wrapper">
      <div class="comments">
        <h2>댓글</h2>
        <div v-for="commentDict in (showAllComments ? commentSet : commentSet.slice(0, 4))" :key="commentDict.id">
          <DetailComment :Comment="commentDict" @commentDeleted="getMovieDetail" @commentEdited="getMovieDetail" />
        </div>
        <button v-if="commentSet.length > 4" @click="showAllComments = !showAllComments">{{ showAllComments ? '접기' : '더보기' }}</button>
      </div>
      <div class="comment-form">
        <form @submit.prevent="createComment">
          <div class="form-group">
            <label for="comment" class="form-label">댓글</label>
            <input class="form-control" id="comment" v-model="comment">
          </div>
          <button type="submit" class="btn btn-primary">작성</button>
        </form>
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
      commentSet: [],
      comment: null, // v-model로 연결된 input변수
      showAllComments: false
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
        this.commentSet = res.data.comment_set.reverse()
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
    },
  }

}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin-top: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  z-index: 1;
  width: 100%;
  height: 500px;
}

.header::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://image.tmdb.org/t/p/original//gs70htixF6j1oqrrwsM4lVfcgNN.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: -1;
}

.poster {
  width: 250px;
  height: 300px;
}

.title-likes {
  display: flex;
  padding: 40px
}
.title {
  margin-right:20px
}
.likes-count {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.heart-icon i {
  margin-right: 10px;
}
.movie-overview {
  font-size: 16px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.overview {
  flex: 1;
  margin-right: 500px;
  width: 400px;
}
.comment-wrapper {
  flex: 1;
}
</style>
