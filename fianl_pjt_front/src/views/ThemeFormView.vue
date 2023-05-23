<template>
  <div>
    <h1>테마만들깈ㅋㅋㅋㅋ</h1>
    <form @submit.prevent="makeTheme">
      <div>
        <label for="themeTitle">테마 제목</label>
        <input type="themeTitle" id="themeTitle" v-model="themeTitle">
      </div>

      <div>
        <label for="themeDescription">테마 설명</label>
        <input type="themeDescription" id="themeDescription" v-model="themeDescription">
      </div>

      <CreateQuestion @question-to-theme="getQuestion"/>
      <button type="submit" @click="makeTheme">제출</button>
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
    }
  },

  created() {
  },
  
  methods: {

    getQuestion: function(questionData){
      this.questionLst.push(questionData)
      console.log(this.questionLst)
    },

    makeTheme: function(){
      axios({
        url: `${API_URL}/themes/index/`,
        method: 'post',
        data: {
          title: this.themeTitle,
          description: this.themeDescription,
        },
        headers: {
          Authorization: `Token ${this.$store.state.user.token}`,
        }
      })
      .then((res) => {
        let themeId = res.data.id

        for (const question of this.questionLst){
          
          axios({
          url: `${API_URL}/themes/detail/${themeId}/create_question/`,
          method: 'post',
          data: {
            question: question.question
          },
          })
          .then((res) => {
            let questionId = res.data.id

            console.log(question.queryDescription1)
            console.log(question.queryDescription2)
            console.log(questionId)

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