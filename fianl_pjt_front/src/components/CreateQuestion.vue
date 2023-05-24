<template>
  <div>
    <div>
      <div class="form-group row mt-3">
        <label for="question" class="col-md-1 col-form-label offset-md-2">질문</label>
        <div class="col-md-7">
          <input type="text" id="question" class="form-control" v-model="question">
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 offset-md-3 text-start mt-1 mb-3">
          영화 추천을 위한 질문을 작성하세요. 예시) 오늘 기분이 어떠신가요?
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="question" class="col-md-1 col-form-label offset-md-2">이미지</label>
        <div class="col-md-7">
          <input type="file" accept="image/*" id="questionImgae" @change="fileUpload" class="form-control"/>
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="queryDescription1" class="col-md-1 col-form-label offset-md-2">대답</label>

        <div class="col-md-5">
          <input type="text" id="queryDescription1" v-model="queryDescription1" @input="questionToTheme" class="form-control">
        </div>

        <div class="col-md-2">
          <button type="button" class="btn btn-dark" @click="addQuery1">조건 추가</button>
        </div>

        <div v-for="(item, idx) in queryLst1" :key="item">
          <CreateQuery @query-to-question="getQuery1" @delete-query="deleteQuery1" :query-idx="idx"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 offset-md-3 text-start mt-1 mb-3">
          질문에 대한 두가지 대답을 작성하고 조건을 추가해서 추천할 영화의 특징을 알려주세요.
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="queryDescription2" class="col-md-1 col-form-label offset-md-2">대답</label>

        <div class="col-md-5">
          <input type="text" id="queryDescription2" v-model="queryDescription2" @input="questionToTheme" class="form-control">
        </div>

        <div class="col-md-2">
          <button type="button" class="btn btn-dark" @click="addQuery2">조건 추가</button>
        </div>

        <div v-for="(item, idx) in queryLst2" :key="item">
          <CreateQuery @query-to-question="getQuery2" @delete-query="deleteQuery2" :query-idx="idx"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateQuery from '@/components/CreateQuery.vue'

export default {
  name: 'CreateQuestion',

  components: {
    CreateQuery
  },

  props:{
    initData: Object,
    questionIdx: Number,
  },

  data () {
    return {
      question: '',
      imageFile: '',

      queryDescription1: '',
      queryLst1: [],
      queryDataLst1: [],

      queryDescription2: '',
      queryLst2: [],
      queryDataLst2: [],

      keyIdx: 0,

    }
  },

  methods: {
    fileUpload: function(file){
      this.imageFile = file.target.files[0]
    },

    addQuery1() {
      this.queryLst1.push(this.keyIdx)
      this.queryDataLst1.push({})
      this.keyIdx += 1
    },

    addQuery2() {
      this.queryLst2.push(this.keyIdx)
      this.queryDataLst2.push({})
      this.keyIdx += 1
    },

    deleteQuery1(tempIdx){
      this.queryLst1.splice(tempIdx, 1);
      this.queryDataLst1.splice(tempIdx, 1)
    },

    deleteQuery2(tempIdx){
      this.queryLst2.splice(tempIdx, 1);
      this.queryDataLst2.splice(tempIdx, 1)
    },

    getQuery1(queryData) {
      this.queryDataLst1[queryData.idx] = queryData
      this.questionToTheme()
    },

    getQuery2(queryData) {
      this.queryDataLst2[queryData.idx] = queryData
      this.questionToTheme()  
    },
  
    questionToTheme() {  
      // for (const temp_query of this.queryDataLst1){
      //   console.log(temp_query)
      //   if (temp_query.key in this.queryData1){
      //     this.queryData1.push(temp_query.value)
      //   }
      //   else{
      //     this.queryData1[temp_query.key] = [temp_query.value,]
      //   }
      // }

      // for (const temp_query of this.queryDataLst2){
      //   console.log(temp_query)
      //   if (temp_query.key in this.queryData2){
      //     this.queryData2[temp_query.key].push(temp_query.value)
      //   }
      //   else{
      //     this.queryData2[temp_query.key] = [temp_query.value,]
      //   }
      // }
      let questionData = {
        idx: this.questionIdx,

        question: this.question,
        image: this.imageFile,

        queryDescription1: this.queryDescription1,
        queryData1: this.queryDataLst1,

        queryDescription2: this.queryDescription2,
        queryData2: this.queryDataLst2,
      }
      console.log(questionData)
      this.$emit('question-to-theme', questionData)
    }
  }
}
</script>

<style>
</style>