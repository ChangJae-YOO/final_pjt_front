<template>
  <div>
    <p>질문 : {{Question.question}}</p>
    <div v-for="query in Question.answerquery_set" :key="query.id">
      <p @click="queryToQuestion(query)"> 대답: {{ query.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeQuestion',

  props: {
    Question: Object
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