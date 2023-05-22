<template>
  <div>
    <h2>제목: {{ themeDetail.title }}</h2>
    <h4>설명: {{ themeDetail.description }}</h4>
    <div v-for="question in questionSet" :key="question.id">
      <ThemeQuestion :Question="question"/>
    </div>
  </div>
</template>

<script>
import ThemeQuestion from '@/components/ThemeQuestion'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ThemeView',
  
  components: {
    ThemeQuestion
  },
  
  data() {
    return {
      themeDetail: null,
      questionSet: null,
      queryLst: null, // v-model로 연결된 input변수
    }
  },
  
  created() {
    this.getQueries()
  },
  
  methods: {
    // movie 변수에 movie 인스턴스 저장, 동시에 commentSet 변수에 comment_set 저장
    getQueries() {
     axios({
        method: 'get',
        // url: `${API_URL}/themes/detail/${ this.$route.params.id }/`,
        url: `${API_URL}/themes/detail/7/`,
      })
      .then((res) => {
        this.themeDetail = res.data
        this.questionSet = res.data.question_set
      })
      .catch((err) => {
        console.log(err)
      }) 
    },
  }
}
</script>

<style>

</style>