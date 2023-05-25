<template>
  <div>
    <h4 class="question">Q. {{Question.question}}</h4>
    <img class="questionimg" :src="url + Question.image" alt="질문 이미지">
    <div class="answerset">
    <div v-for="query in Question.answerquery_set" :key="query.id">
      <button class="custom-btn" @click="queryToQuestion(query)">{{query.description }}</button>
    </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'https://cjpjt.pythonanywhere.com'
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
.question {
  margin-bottom: 50px;
}
.questionimg {
  width: 700px;
  height: 400px;
  margin-bottom: 20px;
}
.custom-btn {
  margin:20px 40px;
  background: red;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
.custom-btn{
  background:#1AAB8A;
  color:#fff;
  border:none;
  position:relative;
  height:60px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
.custom-btn:hover{
  background:#fff;
  color:#1AAB8A;
}
.custom-btn:before,.custom-btn:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #1AAB8A;
  transition:400ms ease all;
}
.custom-btn:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.custom-btn:hover:before,.custom-btn:hover:after{
  width:100%;
  transition:800ms ease all;
}

.answerset {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>