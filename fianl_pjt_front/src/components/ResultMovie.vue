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


    <div class="buttons">
    <button class ="button1" type="button" @click="minusIndex">이전 영화</button>
    <button class = "button2" type="button" @click="addIndex">다음 영화</button>
    </div> 
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

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
}
.button1 {
  margin-right: 20px;
}
.button2 {
  margin-left: 20px;
}

.button1 {
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
.button1:hover{
  background:#fff;
  color:#1AAB8A;
}
.button1:before,.button1:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #1AAB8A;
  transition:400ms ease all;
}
.button1:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.button1:hover:before,.button1:hover:after{
  width:100%;
  transition:800ms ease all;
}
.button2 {
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
.button2:hover{
  background:#fff;
  color:#1AAB8A;
}
.button2:before,.button2:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #1AAB8A;
  transition:400ms ease all;
}
.button2:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.button2:hover:before,.button2:hover:after{
  width:100%;
  transition:800ms ease all;
}
</style>