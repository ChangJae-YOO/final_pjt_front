<template>
<div>

<div class="login-wrap">
  <div class="login-html">

      <input id="tab-1" type="radio" name="tab" class="sign-in">
      <router-link :to="{name: 'login'}" id="tab-1-link" class="tab" @click.native="setActiveTab('sign-in')">로그인</router-link>

      <input id="tab-2" type="radio" name="tab" class="sign-up" checked>
      <router-link :to="{name: 'signup'}" id="tab-2-link" class="tab" @click.native="setActiveTab('sign-up')">회원가입</router-link>

    <div class="login-form">
      <div class="sign-up-htm">
        <form @submit.prevent="signUp">
          <div class="group">
            <label for="user" class="label">아이디</label>
            <input id="user" type="text" class="input" v-model="username">
          </div>
          <div class="group">
            <label for="pass" class="label">이메일</label>
            <input id="pass" type="text" class="input" v-model="useremail">
          </div>
          <div class="group">
            <label for="pass" class="label">비밀번호</label>
            <input id="pass" type="password" class="input" data-type="password" v-model="password1">
          </div>
          <div class="group">
            <label for="pass" class="label">비밀번호 확인</label>
            <input id="pass" type="password" class="input" data-type="password" v-model="password2">
          </div>
          <div class="group">
            <button type="submit" class="button">회원가입</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SignUpForm',

    data () {
    return {
      activeTab: 'sign-up',
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