<template>
  <div>
    <h1>추천 영화</h1>
    <div class="card-container">
      <div class="card-row justify-content-center">
        <div class="card-col">
          <CardComponent :movie="Movie[movieIndex]"/>
        </div>
      </div>
    </div>
    
    <button type="button" @click="minusIndex">이전 영화</button>
    <button type="button" @click="addIndex">다음 영화</button>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'

export default {
  name: 'ResultMovie',

  components:{
    CardComponent
  },

  props: {
    Movie: Object
  },

  data() {
    return {
      movieIndex : 0,
    }
  },

  methods:{
    addIndex(){
      this.movieIndex += 1

      if (this.movieIndex >= this.Movie.length){
        this.movieIndex = this.Movie.length - 1
      }
    },

    minusIndex(){
      this.movieIndex -= 1

      if (this.movieIndex < 0){
        this.movieIndex = 0
      }
    }
  }
}
</script>

<style>

</style>