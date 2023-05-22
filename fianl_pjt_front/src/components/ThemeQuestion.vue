<template>
  <div>
    <p>질문 : {{Question.question}}</p>
    <p v-for="query in Question.answerquery_set" :key="query.id">
      대답: {{ query.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ThemeQuestion',

  props: {
    Question: Object
  },
}
</script>

<style>

</style>