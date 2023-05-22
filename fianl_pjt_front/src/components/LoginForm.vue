<template>
  <div>
    <form @submit.prevent="login" class="px-4 py-3">
      <div>
        <a href="/accounts/login">로그인</a>
        <a href="/accounts/signup">회원가입</a>
      </div>

    <div class="mb-3">
      <label for="username" class="form-label">아이디</label>
      <input type="username" class="form-control" id="username" placeholder="아이디를 입력해 주세요" v-model="username">
    </div>

    <div class="mb-3">
      <label for="Password" class="form-label">비밀번호</label>
      <input type="password" class="form-control" id="Password" placeholder="비밀번호를 입력해 주세요" v-model="password">
    </div>

    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',

  data () {
    return {
      username: null,
      password: null,
    }
  },

  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      
      this.$store.dispatch('login', payload)
      this.username = null,
      this.password = null
    }
  }
}
</script>

<style>

</style>