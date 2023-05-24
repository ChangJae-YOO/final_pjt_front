<template>
  <div>
    <p>질문 : {{Question.question}}</p>
    <img :src="url + Question.image" alt="질문 이미지">
    <div v-for="query in Question.answerquery_set" :key="query.id">
      <p @click="queryToQuestion(query)"> 대답: {{ query.description }}</p>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'ThemeQuestion',

  props: {
    Question: Object
  },

  data() {
    return {
      url: API_URL,
    }
  },

  methods:{
    queryToQuestion: function(queryData){
      this.$emit('query-to-question', queryData)
    }
  }
}
</script>

<style>

</style>