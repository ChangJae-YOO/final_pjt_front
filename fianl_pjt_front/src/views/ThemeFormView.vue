<template>
  <div>
    <div class="row">
      <h2 class="mt-5 col-md-8 offset-md-2 text-start"> 테마 기본정보 </h2>
    </div>
    <div class="row">
      <hr class="col-md-8 offset-md-2 text-start">
    </div>

    <form @submit.prevent="makeTheme"> 

      <div class="form-group row mt-3">
        <label for="title" class="col-md-1 col-form-label offset-md-2">제목</label>
        <div class="col-md-7">
          <input type="text" id="title" class="form-control" v-model="themeTitle">
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 offset-md-3 text-start mt-1 mb-3">
          영화 추천 테마의 제목을 입력하세요. 예시) 기분에 따라 영화 추천, 롤 테마 영화 추천 ...
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="themeDescription" class="col-sm-1 col-form-label offset-sm-2">설명</label>
        <div class="col-sm-7">
          <input type="text" id="themeDescription" class="form-control" v-model="themeDescription">
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 offset-md-3 text-start mt-1 mb-3">
          추천 테마에 대한 가벼운 설명을 적어주세요.
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="themeImage" class="col-sm-1 col-form-label offset-sm-2">이미지</label>
        <div class="col-sm-7">  
          <input type="file" accept="image/*" id="themeImgae" class="form-control" @change="fileUpload"/>
        </div>

      </div>

      <div class="row">
        <div class="col-md-7 offset-md-3 text-start mt-1 mb-3">
          테마를 설명할 수 있는 이미지를 올려주세요.
        </div>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-dark col-1 offset-md-3 mt-3 mb-3">저장</button>
        <hr class="col-md-8 offset-md-2">
      </div>

    
      <div class="row">

        <div class="form-group col-8 offset-md-2">
          <label for="exampleFormControlSelect2">Example multiple select</label>
          <select multiple class="form-control" id="exampleFormControlSelect2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <button type="button" @click="add" class="btn btn-dark">테마에 질문 추가</button>

        <div v-for="item in questions" :key="item">
          <CreateQuestion @question-to-theme="getQuestion" v-if="item"/>
        </div>

        <div class="form-group col-8 offset-md-2">
          <label for="exampleFormControlTextarea1">Example textarea</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

      </div>
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