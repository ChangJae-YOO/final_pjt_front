<template>
  <div class="detail-comment">
  <div class="comment">
    <div class="comment-info">
      <p class="comment-user">작성자: {{ Comment.user_name }}</p>
      <p class="comment-content">{{ Comment.content }}</p>
    </div>
    <div class="comment-actions">
      <div class="comment-likes">
        <button @click="likeComment" :class="{ active: isLiked }">
          <span class="thumb-icon" v-if="isLiked">👍</span>
          <span class="thumb-icon" v-else>👍</span>
          <span class="like-count">{{ likeCount }}</span>
        </button>
      </div>
      <button @click="toggleEdit" class="edit-button">수정</button>
      <button @click="deleteComment" class="delete-button">삭제</button>
    </div>
  </div>

  <div v-if="isEditing" class="edit-comment">
    <input type="text" v-model="editedContent" class="edit-input">
    <button @click="saveEdit" class="save-button">저장</button>
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
  .comment {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.comment-info {
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
}

.comment-content {
  margin-top: 5px;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.comment-likes {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.thumb-icon {
  margin-right: 5px;
}

.like-count {
  font-weight: bold;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  color: #777;
  cursor: pointer;
}

.edit-button:hover,
.delete-button:hover {
  color: #333;
}

.edit-comment {
  margin-top: 10px;
}

.edit-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.save-button {
  margin-top: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.save-button:active {
  background-color: #0056b3;
}

.active {
  color: #007bff;
}
.detail-comment {
  color:black;
}
</style>