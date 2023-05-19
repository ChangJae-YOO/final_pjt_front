<template>
  <div>
    <form @submit.prevent="signUp" class="px-4 py-3">
      <div>
        <a href="/accounts/login">로그인</a>
        <a href="/accounts/signup">회원가입</a>
      </div>

    <div class="mb-3">
      <label for="username" class="form-label">아이디</label>
      <input type="username" class="form-control" id="username" placeholder="아이디를 입력해 주세요" v-model="username">
    </div>

    <div class="mb-3">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="Email" placeholder="이메일을 입력해 주세요" v-model="useremail">
    </div>

    <div class="mb-3">
      <label for="Password1" class="form-label">Password</label>
      <input type="password" class="form-control" id="Password1" placeholder="비밀번호를 입력해 주세요" v-model="password1">
    </div>

    <div class="mb-3">
      <label for="Password2" class="form-label">Password Check</label>
      <input type="password" class="form-control" id="Password2" placeholder="비번 한번더 입력하셈 ㅋㅋ" v-model="password2">
    </div>

    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpForm',

    data () {
    return {
      username: null,
      useremail: null,
      password1: null,
      password2: null,
    }
  },

  methods: {
    //회원가입 완료 후 home으로 이동
    signUp() {
      const username = this.username
      const useremail = this.useremail
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, useremail, password1, password2
      }
      this.$store.dispatch('signUp', payload)
      .then (() => {
        this.$router.push({name: 'home'})
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>