<template>
  <div>
    <h2>제목: {{ themeDetail.title }}</h2>
    <h4>설명: {{ themeDetail.description }}</h4>
    <ThemeQuestion 
    :Question="questionSet[queryIndex]"
    @query-to-question="plusIndex"/>
  </div>
</template>

<script>
import ThemeQuestion from '@/components/ThemeQuestion'
import router from '@/router'
import axios from 'axios'
import { mapMutations} from 'vuex'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ThemeView',
  
  components: {
    ThemeQuestion
  },
  
  data() {
    return {
      themeDetail: {},
      questionSet: {},
      queryDict: {},
      queryIndex: 0,
      queryLength: 0,
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
        url: `${API_URL}/themes/detail/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.themeDetail = res.data
        this.questionSet = res.data.question_set

        this.queryLength = Object.keys(this.questionSet).length
      })
      .catch((err) => {
        console.log(err)
      }) 
    },

    plusIndex: function(inputData){
      this.queryIndex++

      if (this.queryIndex == this.queryLength){
        this.SET_THEME_RESULT(this.queryDict)
        console.log(this.queryDict)
        router.push({
          name:'themeResult',
        })
      }
      
      for (const key of Object.keys(inputData)){
         if (key in this.queryDict && inputData[key] != null){
          this.queryDict[key].push(inputData[key])
         }
         else if (inputData[key] != null){
          this.queryDict[key] = [inputData[key]]
         }
      }
    },

    ...mapMutations(['SET_THEME_RESULT']),
  }
}
</script>

<style>

</style>