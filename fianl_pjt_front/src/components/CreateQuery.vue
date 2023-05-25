<template>
    <div class="form-group row mt-3">
      <label class="col-md-1 col-form-label offset-md-2">조건</label>

      <div class="col-md-3">
        <select v-model="temp_value" name="language" v-show="temp_key == 'language'" @input="queryToQuestion" class="form-control" novalidate>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
        </select>
        <select v-model="temp_value" name="with_genres" v-show="temp_key == 'with_genres'" @input="queryToQuestion" class="form-control" novalidate>
          <option value="12">모험</option>
          <option value="14">판타지</option>
          <option value="16">애니메이션</option>
          <option value="18">드라마</option>
          <option value="27">공포</option>
          <option value="28">액션</option>
          <option value="35">코미디</option>
          <option value="36">역사</option>
          <option value="37">서부</option>
          <option value="53">스릴러</option>
          <option value="80">범죄</option>
          <option value="99">다큐멘터리</option>
          <option value="878">SF</option>
          <option value="9648">미스터리</option>
          <option value="10402">음악</option>
          <option value="10749">로맨스</option>
          <option value="10751">가족</option>
          <option value="10752">전쟁</option>
          <option value="10770">TV 영화</option>
        </select>
        <select v-model="temp_value" name="without_genres"  v-show="temp_key == 'without_genres'" @input="queryToQuestion" class="form-control" novalidate>
          <option value="12">모험</option>
          <option value="14">판타지</option>
          <option value="16">애니메이션</option>
          <option value="18">드라마</option>
          <option value="27">공포</option>
          <option value="28">액션</option>
          <option value="35">코미디</option>
          <option value="36">역사</option>
          <option value="37">서부</option>
          <option value="53">스릴러</option>
          <option value="80">범죄</option>
          <option value="99">다큐멘터리</option>
          <option value="878">SF</option>
          <option value="9648">미스터리</option>
          <option value="10402">음악</option>
          <option value="10749">로맨스</option>
          <option value="10751">가족</option>
          <option value="10752">전쟁</option>
          <option value="10770">TV 영화</option>
        </select>
        <input type="number" min="0" max="10" name="vote_average_gte"  v-model="temp_value" v-show="temp_key == 'vote_average_gte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="number" min="0" max="10" name="vote_average_lte"  v-model="temp_value" v-show="temp_key == 'vote_average_lte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="date" v-model="temp_value" name="release_date_gte"  v-show="temp_key == 'release_date_gte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="date" v-model="temp_value" name="release_date_lte"  v-show="temp_key == 'release_date_lte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="number" min="0" max="600" name="with_runtime_gte"  v-model="temp_value" v-show="temp_key == 'with_runtime_gte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="number" min="0" max="600" name="with_runtime_lte"  v-model="temp_value" v-show="temp_key == 'with_runtime_lte'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="text" v-model="temp_value" name="with_keywords"  v-show="temp_key == 'with_keywords'" @input="queryToQuestion" class="form-control" novalidate>
        <input type="text" v-model="temp_value" name="without_keywords"  v-show="temp_key == 'without_keywords'" @input="queryToQuestion" class="form-control" novalidate>
      </div>
      <div class="col-md-4">
        <select v-model="temp_key" class="form-control" novalidate>
            <option v-for="key in key_lst" :value="key" :key="key">{{ key_values[key] }}</option>
        </select>    
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-dark" @click="deleteQuery">삭제</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreateQuery',

    props:{
     queryIdx: Number,
     },
  
    data () {
      return {
        key_lst : [
          'language',
          'include_adult',
          'with_genres',
          'without_genres',
          'with_keywords',
          'without_keywords',
          'vote_average_gte',
          'vote_average_lte',
          'release_date_gte',
          'release_date_lte',
          'with_runtime_gte',
          'with_runtime_lte',
        ],
  
        key_values : {
          'language': '언어의 영화 추천',
          'include_adult': '성인 영화 추천',
          'with_genres': '장르의 영화 추천',
          'without_genres': '장르를 제외한 영화 추천',
          'vote_average_gte': '보다 평점 높은 영화 추천',
          'vote_average_lte': '보다 평점 낮은 영화 추천',
          'release_date_gte': '보다 늦게 개봉한 영화 추천',
          'release_date_lte': '보다 일찍 개봉한 영화 추천',
          'with_runtime_gte': '보다 상영시간이 긴 영화 추천',
          'with_runtime_lte': '보다 상영시간이 짧은 영화 추천',
          'with_keywords': '라는 단어가 들어간 영화 추천',
          'without_keywords': '라는 단어가 안 들어간 영화 추천',
        },
  
        temp_key: '',
        temp_value: '',
      }
    },
  
    methods: {
      deleteQuery(){
        this.$emit('delete-query', this.queryIdx)
      },

      queryToQuestion() {   

        let queryData = {
          idx: this.queryIdx,
          key: this.temp_key,
          value: event.target.value
        }

        console.log(queryData)
  
        this.$emit('query-to-question', queryData)
      }
    }
  }
  </script>
  
  <style>
  </style>