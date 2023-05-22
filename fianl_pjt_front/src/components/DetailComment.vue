<template>
  <div>
    <p>작성자 : {{Comment.user_name}} | 댓글: {{Comment.content}} | 좋아요 개수: {{ likeCount }}</p>
    <button @click="toggleEdit">수정</button>
    <button @click="deleteComment">삭제</button>
    <button @click="likeComment">{{likeButtonLabel}}</button>

    <div v-if="isEditing">
      <input type="text" v-model="editedContent">
      <button @click="saveEdit">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'DetailComment',

  data() {
    return {
      isEditing: false,
      editedContent: null,
      likeCount: this.Comment.comment_likes.length,
      likeButtonLabel: '좋아용 ㅋㅋ',
      isLiked: false,
    }
  },

  props: {
    Comment: Object
  },
  
  methods: {
    //수정창 토글
    toggleEdit(){
      if (this.Comment.user_name === this.$store.state.user.username){
        this.isEditing = !this.isEditing
        if (this.isEditing) {
        this.editedContent = null
        }
      }
      else {
        alert('본인 댓글만 수정하세용~')
      }
    },

    //댓글 수정
    editComment(){
      axios({
        method: 'put',
        url: `${API_URL}/movies/comments/${ this.Comment.id }/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
        data: {
          content: this.editedContent
        }
      })
      .then(() => {
        this.$emit('commentEdited')
        this.isEditing = false
        this.editedContent
      })
      .catch((err) => {
        console.error(err)
      })
    },

    saveEdit() {
      this.editComment()
    },

    //댓글 삭제
    deleteComment() {
      axios({
        method: 'delete',
        url: `${API_URL}/movies/comments/${ this.Comment.id }/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
      .then(() => {
        this.$emit('commentDeleted')
      })
      .catch(() => {
        alert('너 댓글만 삭제 가능 ㅋㅋ')
      })
    },

    //좋아요 기능
    likeComment() {
      if (this.isLiked) {
        axios({
        method: 'post',
        url: `${API_URL}/movies/comments/${this.Comment.id}/like_comment/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
      .then((res) => {
        this.likeCount = res.data.like_count
        console.log(1)
        this.likeButtonLabel = '좋아용 ㅋㅋ'
        this.isLiked = !this.isLiked
      })
      .catch((err) => {
          console.error(err)
      })
      } 
      else {
        axios({
        method: 'post',
        url: `${API_URL}/movies/comments/${this.Comment.id}/like_comment/`,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        },
      })
      .then((res) => {
        this.likeCount = res.data.like_count
        console.log(this.Comment.comment_user)
        console.log(this.$store.state.user.username)
        console.log(this.Comment)
        this.likeButtonLabel = '안좋아용 ㅋㅋ'
        this.isLiked = !this.isLiked
      })
      .catch((err) => {
        console.error(err)
      })
      }
    },
  },

  created() {
    if (this.Comment.comment_user.includes(this.$store.state.user.username)) {
      this.isLiked = true
      this.likeButtonLabel = '안좋아용 ㅋㅋ'
    }
    else {
      this.isLiked = false
      this.likeButtonLabel = '좋아용 ㅋㅋ'
    }
  }
}
</script>

<style>

</style>