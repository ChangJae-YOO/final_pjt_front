<template>
  <div>
    <h1 class="mt-5"> 테마 만들기 </h1>
    <form @submit.prevent="makeTheme">
      <div>
        <label for="themeTitle" class="m-3">테마 제목</label>
        <input type="themeTitle" id="themeTitle" v-model="themeTitle">
      </div>

      <div>
        <label for="themeDescription" class="m-3">테마 설명</label>
        <input type="themeDescription" id="themeDescription" v-model="themeDescription">
      </div>
      <br>

      <div>
        <label for="themeImage" class="m-3">테마 이미지</label>
        <input type="file" accept="image/*" id="themeImgae" @change="fileUpload"/>
      </div>

      <div v-for="item in questions" :key="item">
        <CreateQuestion @question-to-theme="getQuestion" v-if="item"/>
      </div>

      
      <button type="button" @click="add">질문 추가</button>
      <br>


      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script>
// import router from '@/router'
import axios from 'axios'
import CreateQuestion from '@/components/CreateQuestion.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ThemeFormView',
  
  components: {
    CreateQuestion
  },

  data() {
    return {
      themeTitle: '',
      themeDescription: '',

      questionLst: [],
      questions: [],

      imageFile: '',
    }
  },

  created() {
  },
  
  methods: {

    fileUpload: function(file){
      this.imageFile = file.target.files[0]
    },

    getQuestion: function(questionData){
      this.questionLst.push(questionData)
    },

    closeQuestionForm(){
      for (let idx in this.questions){
        this.questions[idx] = false
      }
    },

    add () {
			this.questions.push(true)
		},

    makeTheme: function(){
      const frm = new FormData()
      frm.append('title', this.themeTitle)
      frm.append('description', this.themeDescription)
      frm.append('image', this.imageFile)

      axios({
        url: `${API_URL}/themes/index/`,
        method: 'post',
        data: frm,
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        }
      })
      .then((res) => {
        let themeId = res.data.id

        for (const question of this.questionLst){
          const questionFrm = new FormData()
          questionFrm.append('question', question.question)
          questionFrm.append('image', question.image)
          
          axios({
          url: `${API_URL}/themes/detail/${themeId}/create_question/`,
          method: 'post',
          data: questionFrm,
          })
          .then((res) => {
            let questionId = res.data.id

            axios({
            url: `${API_URL}/themes/detail/${questionId}/create_query/`,
            method: 'post',
            data: question.queryData1
            })
            .then(() => {
            })
            .catch((err) => {
              console.log(err)
            })

            axios({
            url: `${API_URL}/themes/detail/${questionId}/create_query/`,
            method: 'post',
            data: question.queryData2
            })
            .then(() => {
            })
            .catch((err) => {
              console.log(err)
            }) 

            })
          .catch((err) => {
            console.log(err)
          }) 
          }
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