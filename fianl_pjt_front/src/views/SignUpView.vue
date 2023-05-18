<template>
  <div>
    <h3>반가워요, 여러분의 영화를 추천해주는~</h3>
    <h4>여기는 회원가입 ㅋㅋ</h4>
    <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from '@/components/SignUpForm'
export default {
  name: 'SignUpView',
  components: {
    SignUpForm,
  }
}
</script>