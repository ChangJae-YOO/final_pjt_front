<template>
  <div>
    <div class="row">
      <h2 class="mt-5 col-md-8 offset-md-2 text-start"> 테마 기본정보 </h2>
    </div>
    <div class="row">
      <hr class="col-md-8 offset-md-2 text-start">
    </div>

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
      <button type="button" class="btn btn-dark col-1 offset-md-3 mt-3 mb-3" @click="makeTheme">저장</button>
      <hr class="col-md-8 offset-md-2">
    </div>

  
    <div class="row">
      <button type="button" @click="add" class="btn btn-dark col-8 offset-md-2">테마에 질문 추가</button>
    </div>

    <div class="row">
      <div class="col-md-8 offset-md-2 text-danger text-center mt-3 mb-3" v-show="isError">
        질문을 만들고 빈칸을 모두 채워주세요! 
      </div>
    </div>

    <div class="row">
      <label for="title" class="col-md-2 col-form-label offset-md-2 text-start mt-3">질문 목록</label>
      <div class="col-md-6" >
        <button type="button" class="btn btn-dark m-2 " v-for="(item, idx) in questionLst" :key="idx" @click="changeIdx(idx)">{{ idx+1 }}</button>
      </div>
      <hr class="col-md-8 offset-md-2 mt-4">
    </div>

    <div v-for="(item, idx) in questionLst" :key="item">
      <CreateQuestion @question-to-theme="getQuestion" v-show="idx==nowIdx" :question-idx="idx"/>
      <button class="btn btn-dark mt-3" type="button" v-show="idx==nowIdx" @click="deleteQuestion(idx)">삭제</button>
      <hr class="col-md-8 offset-md-2 mt-4">
    </div>
  </div>
</template>

<script>
// import router from '@/router'
import axios from 'axios'
import CreateQuestion from '@/components/CreateQuestion.vue'

const API_URL = 'https://cjpjt.pythonanywhere.com'

export default {
  name: 'ThemeFormView',
  
  components: {
    CreateQuestion
  },

  data() {
    return {
      uel: API_URL,
      themeTitle: '',
      themeDescription: '',

      questionLst: [],
      questionDataLst: [],

      imageFile: '',
      nowIdx: -1,
      keyIdx: 0,

      isError: false,
    }
  },

  created() {
  },
  
  methods: {
    deleteQuestion(tempIdx){
      this.questionLst.splice(tempIdx, 1);
      this.questionDataLst.splice(tempIdx, 1);
      this.nowIdx = tempIdx
    },

    changeIdx(tempIdx){
      this.nowIdx = tempIdx
    },
    
    fileUpload: function(file){
      this.imageFile = file.target.files[0]
    },

    getQuestion: function(questionData){
      this.questionDataLst[questionData.idx] = questionData
    },

    add () {
			this.questionLst.push(this.keyIdx)
      this.questionDataLst.push({})
      this.nowIdx += 1
      this.keyIdx += 1
		},

    makeTheme: function(){
      console.log(this.questionDataLst)

      if (this.themeTitle == false){
        this.isError = true
        return
      }

      if (this.themeDescription == false){
        this.isError = true
        return
      }

      if (this.themeDescription == false){
        this.isError = true
        return
      }

      for (const question of this.questionDataLst){
        if ('queryData1' in question ){
          'hi'
        }
        else{
          this.isError = true
          return
        }

        if (question == false){
          this.isError = true
          return
        }

        if (question.question == false){
          this.isError = true
          return 
        }

        for (const query of question.queryData1){
          if (query.value == false){
            this.isError = true
            return
          }
        }

        for (const query of question.queryData2){
          if (query.value == false){
            this.isError = true
            return
          }
        }
      }


      const frm = new FormData()
      frm.append('title', this.themeTitle)
      frm.append('description', this.themeDescription)
      console.log(this.questionDataLst)
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

        for (const question of this.questionDataLst){
          const questionFrm = new FormData()
          questionFrm.append('question', question.question)
          if (question.image){
            questionFrm.append('image', question.image)
          }
          axios({
          url: `${API_URL}/themes/detail/${themeId}/create_question/`,
          method: 'post',
          data: questionFrm,
          })
          .then((res) => {
            let questionId = res.data.id
            let tempData1 = {}
            let tempData2 = {}

            for (const temp_query of question.queryData1){
              console.log(temp_query)
              if (temp_query.key in tempData1){
                tempData1[temp_query.key] += ',' + temp_query.value
              }
              else{
                tempData1[temp_query.key] = temp_query.value
              }
            }

            for (const temp_query of question.queryData2){
              console.log(temp_query)
              if (temp_query.key in tempData2){
                tempData2[temp_query.key] += ',' + temp_query.value
              }
              else{
                tempData2[temp_query.key] = temp_query.value
              }
            }

            tempData1['description'] = question.queryDescription1
            tempData2['description'] = question.queryDescription2

            axios({
            url: `${API_URL}/themes/detail/${questionId}/create_query/`,
            method: 'post',
            data: tempData1
            })
            .then(() => {
            })
            .catch((err) => {
              console.log(err)
            })

            axios({
            url: `${API_URL}/themes/detail/${questionId}/create_query/`,
            method: 'post',
            data: tempData2
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

          this.$router.push({name: 'madeThemeView'})
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