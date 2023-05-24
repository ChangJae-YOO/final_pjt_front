<template>
  <div class="container">
    <div class="header">
      <div class="backdrop-image" :style="{ backgroundImage: `url(${getBackDropUrl(movie?.backdrop_path)})` }">
      </div>
      <div class="title-likes">
      <h3 class="title">{{ movie?.title }}</h3>
      <div class="likes-count"><div class="heart-icon" :class="{'liked':is_Liked}" @click="likeMovie"><i class="fas fa-heart"></i>
      <span>{{likeCount}}</span>
      </div>
      </div>
      </div>
      <img :src="getPosterUrl(movie?.poster_path)" alt="Movie Poster" class="poster">
    </div>

    <div class="content">
      <div class="overview">
        <h2>개요</h2>
        <p class="movie-overview">{{ movie?.overview }}</p>
      </div>
    
      <div class="comment-wrapper">
        <div>
          <div v-if="!isLogin" class="comment-form">
            <p>댓글 작성을 위해 로그인하세요.</p>
            <button @click="goToLogin" class="btn btn-secondary">로그인</button>
          </div>
          <div v-else class="comment-form">
            <form @submit.prevent="createComment">
              <div class="form-group">
                <label for="comment" class="form-label">댓글</label>
                <input class="form-control" id="comment" v-model="comment">
              </div>
              <button type="submit" class="btn mt-4 btn-secondary">작성하기</button>
            </form>
          </div>
        </div>
      <div class="comments">
        <div v-for="commentDict in (showAllComments ? commentSet : commentSet.slice(0, 4))" :key="commentDict.id">
          <DetailComment :Comment="commentDict" @commentDeleted="getMovieDetail" @commentEdited="getMovieDetail" />
        </div>
        <button class="btn m-4 btn-dark" v-if="commentSet.length > 4" @click="showAllComments = !showAllComments">{{ showAllComments ? '접기' : '더보기' }}</button>
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
      showAllComments: false,
      is_Liked: false,
      likeCount: null,
    }
  },
  
  created() {
    this.getMovieDetail()
  },


  computed: {
    ...mapGetters(['isLogin']),
  },

  methods: {
    //로그인 이동
    goToLogin() {
      this.$router.push({name:'login'})
    },

    ...mapActions(['logout']),
    // movie 변수에 movie 인스턴스 저장, 동시에 commentSet 변수에 comment_set 저장
    getMovieDetail() {
     axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res.data)
        this.movie = res.data
        this.commentSet = res.data.comment_set.reverse()
        this.likeCount = res.data.movie_likes.length
        if (this.movie.movie_like_users.includes(this.$store.state.user.username)) {
      this.is_Liked = true
        }
        else {
      this.is_Liked = false
        }
      })
      .catch((err) => {
        console.log(err)
      }) 
    },

    // 포스터 가져오기
    getPosterUrl(path) {
      if (path) {
      return `https://image.tmdb.org/t/p/original${path}`
    }
    else {
      return ''
    }
    },
    getBackDropUrl(path) {
      if (path) {
      return `https://image.tmdb.org/t/p/original${path}`
      }
      else {
        return ''
      }
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

    //영화 좋아요
    likeMovie() {
      axios({
        method: 'post',
        url: `${API_URL}/movies/detail/${this.$route.params.id}/like_movie/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
        .then((res) => {
          console.log(res.data)
          this.is_Liked = !this.is_Liked
          this.getMovieDetail()
        })
        .catch((err) => {
          console.error(err)
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
  height: 600px;
}

.backdrop-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: -1;
  background-color: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.poster {
  position: absolute;
  width: 250px;
  height: 300px;
  bottom: 0;
  right: 0;
  margin: auto;
  top: 625px;
  left: 800px;
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
.heart-icon {
  display: inline-block;
  color: gray;
  cursor: pointer;
}

.heart-icon.liked {
  color: red;
}
.movie-overview {
  font-size: 16px;
}
.overview {
  flex: 1;
  margin-right: 500px;
  width: 400px;
}
.comment-wrapper {
  margin-top: 150px;
  flex: 1;
}
.comments {
  margin-top: 100px;
  margin-bottom: 100px;
}

</style>
