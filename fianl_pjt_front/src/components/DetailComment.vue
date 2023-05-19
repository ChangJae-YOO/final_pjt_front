<template>
  <div>
    <h1>여긴 커뮤니티 입니다 ㅋㅋ</h1>
    <form @submit.prevent="createComment">
      <label for="comment" class="form-label">댓글 입력</label>
      <input class="form-control" id="comment" v-model="comment">
    </form>
    <p>작성자 : {{this.userName}} | 댓글: {{this.userComment}}</p>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailComment',
  data() {
    return {
      comment: null,
      userComment: null,
      userName: null,
    }
  },
  methods: {
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