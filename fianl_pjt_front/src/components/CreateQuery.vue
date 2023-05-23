<template>
    <div>
        <label>조건:</label>

        <select v-model="temp_value" v-if="temp_key == 'include_adult'">
            <option value="1">O</option>
            <option value="0">X</option>
        </select>
        <select v-model="temp_value" v-if="temp_key == 'with_genres'">
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
         <select v-model="temp_value" v-if="temp_key == 'without_genres'">
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
        <input type="number" min="0" max="10" v-model="temp_value" v-if="temp_key == 'vote_average_gte'">
        <input type="number" min="0" max="10" v-model="temp_value" v-if="temp_key == 'vote_average_lte'">
        <input type="date" v-model="temp_value" v-if="temp_key == 'release_date_gte'">
        <input type="date" v-model="temp_value" v-if="temp_key == 'release_date_lte'">
        <input type="number" min="0" max="600" v-model="temp_value" v-if="temp_key == 'with_runtime_gte'">
        <input type="number" min="0" max="600" v-model="temp_value" v-if="temp_key == 'with_runtime_lte'">
        <input type="text" v-model="temp_value" v-if="temp_key == 'with_keywords'">
        <input type="text" v-model="temp_value" v-if="temp_key == 'without_keywords'">

        <select v-model="temp_key">
            <option v-for="key in key_lst" :value="key" :key="key">{{ key_values[key] }}</option>
        </select>    

        <button type="button" @click="queryToQuestion">조건 만들기</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreateQuery',
  
    data () {
      return {
        key_lst : [
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
  
        key_html : {
          'include_adult': 
          '<select v-model="temp_value">'
          + '<option value="1">O</option>'
          + '<option value="0">X</option>'
          + '</select>',
          'with_genres': 
          '<select v-model="temp_value">'
          + '<option value="12">모험</option>'
          + '<option value="14">판타지</option>'
          + '<option value="16">애니메이션</option>'
          + '<option value="18">드라마</option>'
          + '<option value="27">공포</option>'
          + '<option value="28">액션</option>'
          + '<option value="35">코미디</option>'
          + '<option value="36">역사</option>'
          + '<option value="37">서부</option>'
          + '<option value="53">스릴러</option>'
          + '<option value="80">범죄</option>'
          + '<option value="99">다큐멘터리</option>'
          + '<option value="878">SF</option>'
          + '<option value="9648">미스터리</option>'
          + '<option value="10402">음악</option>'
          + '<option value="10749">로맨스</option>'
          + '<option value="10751">가족</option>'
          + '<option value="10752">전쟁</option>'
          + '<option value="10770">TV 영화</option>'
          + '</select>',
          'without_genres': 
          '<select v-model="temp_value">'
          + '<option value="12">모험</option>'
          + '<option value="14">판타지</option>'
          + '<option value="16">애니메이션</option>'
          + '<option value="18">드라마</option>'
          + '<option value="27">공포</option>'
          + '<option value="28">액션</option>'
          + '<option value="35">코미디</option>'
          + '<option value="36">역사</option>'
          + '<option value="37">서부</option>'
          + '<option value="53">스릴러</option>'
          + '<option value="80">범죄</option>'
          + '<option value="99">다큐멘터리</option>'
          + '<option value="878">SF</option>'
          + '<option value="9648">미스터리</option>'
          + '<option value="10402">음악</option>'
          + '<option value="10749">로맨스</option>'
          + '<option value="10751">가족</option>'
          + '<option value="10752">전쟁</option>'
          + '<option value="10770">TV 영화</option>'
          + '</select>',
          'vote_average_gte': '<input type="number" min="0" max="10" v-model="temp_value">',
          'vote_average_lte': '<input type="number" min="0" max="10" v-model="temp_value">',
          'release_date_gte': '<input type="date" v-model="temp_value">',
          'release_date_lte': '<input type="date" v-model="temp_value">',
          'with_runtime_gte': '<input type="number" min="0" max="600" v-model="temp_value">',
          'with_runtime_lte': '<input type="number" min="0" max="600" v-model="temp_value">',
          'with_keywords': '<input type="text" v-model="temp_value">',
          'without_keywords': '<input type="text" v-model="temp_value">',
        },

        temp_key: '',
        temp_value: '',
      }
    },
  
    methods: {

      queryToQuestion() {   
        let queryData = {
          key: this.temp_key,
          value: this.temp_value
        }

        console.log(this.temp_value)
  
        this.$emit('query-to-question', queryData)
      }
    }
  }
  </script>
  
  <style>
  </style>