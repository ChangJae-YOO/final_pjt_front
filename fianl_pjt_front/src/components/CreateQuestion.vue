<template>
  <div>
      <div>
        <label for="question">질문: </label>
        <input type="question" id="question" v-model="question">
      </div>

      <div>
        <label for="queryDescription1">대답1:</label>
        <input type="queryDescription1" id="queryDescription1" v-model="queryDescription1">
        
        <label>조건:</label>
        <select name="temp_key1" id="temp_key1" v-model="temp_key1">
          <option value="include_adult">include_adult</option>
          <option value="with_genres">with_genres</option>
          <option value="without_genres">without_genres</option>
          <option value="language">language</option>
          <option value="with_keywords">with_keywords</option>
          <option value="without_keywords">without_keywords</option>
          <option value="vote_average_gte">vote_average_gte</option>
          <option value="vote_average_lte">vote_average_lte</option>
          <option value="release_date_gte">release_date_gte</option>
          <option value="release_date_lte">release_date_lte</option>
          <option value="with_runtime_gte">with_runtime_gte</option>
          <option value="with_runtime_lte">with_runtime_lte</option>
        </select>
        <input type="temp_value1" id="temp_value1" v-model="temp_value1">
      </div>

      <div>
        <label for="queryDescription2">대답2:</label>
        <input type="queryDescription2" id="queryDescription2" v-model="queryDescription2">
        
        <label>조건:</label>
        <select name="temp_key2" id="temp_key2" v-model="temp_key2">
          <option value="include_adult">include_adult</option>
          <option value="with_genres">with_genres</option>
          <option value="without_genres">without_genres</option>
          <option value="language">language</option>
          <option value="with_keywords">with_keywords</option>
          <option value="without_keywords">without_keywords</option>
          <option value="vote_average_gte">vote_average_gte</option>
          <option value="vote_average_lte">vote_average_lte</option>
          <option value="release_date_gte">release_date_gte</option>
          <option value="release_date_lte">release_date_lte</option>
          <option value="with_runtime_gte">with_runtime_gte</option>
          <option value="with_runtime_lte">with_runtime_lte</option>
        </select>
        <input type="temp_value2" id="temp_value2" v-model="temp_value2">
      </div>

      <p @click="questionToTheme">만들기</p>
  </div>
</template>

<script>
export default {
  name: 'CreateQuestion',

  data () {
    return {
      question: '',

      queryDescription1: '',
      queryData1: {},

      queryDescription2: '',
      queryData2: {},

      temp_key1: '',
      temp_value1: '',

      temp_key2: '',
      temp_value2: '',
    }
  },

  methods: {
    questionToTheme() {
      this.queryData1[this.temp_key1] = this.temp_value1
      this.queryData1['description'] = this.queryDescription1
      this.queryData2[this.temp_key2] = this.temp_value2
      this.queryData2['description'] = this.queryDescription2
      
      let questionData = {
        question: this.question,

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