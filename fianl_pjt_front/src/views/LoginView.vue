<template>
  <div>
    <h3>반가워요, 여러분의 영화를 추천해주는~</h3>
    <LoginForm />
  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm'

export default {
  name: 'LoginView',
  
  components: {
    LoginForm,
  }
}
</script>
