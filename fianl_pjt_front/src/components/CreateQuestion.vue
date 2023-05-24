<template>
  <div>
    <div v-if="isChecked">
      <div>
        <label for="question">질문: </label>
        <input type="text" id="question" v-model="question">
      </div>
      <br>

      <div>
        <label for="questionImage" class="m-3">질문 이미지</label>
        <input type="file" accept="image/*" id="questionImgae" @change="fileUpload"/>
      </div>
      <br>

      <div>
        <label for="queryDescription1">대답1:</label>
        <input type="text" id="queryDescription1" v-model="queryDescription1">

        <button type="button" @click="addQuery1">조건 추가</button>
        <CreateQuery @query-to-question="getQuery1" v-for="item in answer1_items" :key="item"/>
      </div>


      <div>
        <label for="queryDescription2">대답2:</label>
        <input type="text" id="queryDescription2" v-model="queryDescription2">

        <button type="button" @click="addQuery2">조건 추가</button>
        <CreateQuery @query-to-question="getQuery2" v-for="item in answer2_items" :key="item"/>
      </div>

      <button type="button" @click="questionToTheme">질문 만들기</button>
    </div>

    <div v-if="!isChecked">
      {{ this.question }}
      <button type="button" @click="eraseQustion">질문 다시 만들기</button>
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

  data () {
    return {
      question: '',

      queryDescription1: '',
      queryData1: {},

      queryDescription2: '',
      queryData2: {},

      answer1_items: [],
      answer2_items: [],

      isChecked: true,
      imageFile: '',
    }
  },

  methods: {
    fileUpload: function(file){
      this.imageFile = file.target.files[0]
    },

    eraseQustion(){
      this.isChecked = true
    },

    addQuery1() {
      this.answer1_items.push(true)
    },

    addQuery2() {
      this.answer2_items.push(true)
    },

    getQuery1(queryData) {
      if (queryData.key in this.queryData1){
        this.queryData1[queryData.key] += ',' + queryData.value
      }
      else{
        this.queryData1[queryData.key] = queryData.value
      }
    },

    getQuery2(queryData) {
      if (queryData.key in this.queryData2){
        this.queryData2[queryData.key] += ',' + queryData.value
      }
      else{
        this.queryData2[queryData.key] = queryData.value
      }
    },
  
    questionToTheme() {  
      this.queryData1['description'] = this.queryDescription1
      this.queryData2['description'] = this.queryDescription2
      this.isChecked = false

      let questionData = {
        question: this.question,
        image: this.imageFile,

        queryDescription1: this.queryDescription1,
        queryData1: this.queryData1,

        queryDescription2: this.queryDescription2,
        queryData2: this.queryData2,
      }

      this.$emit('question-to-theme', questionData)
    }
  }
}
</script>

<style>
</style>