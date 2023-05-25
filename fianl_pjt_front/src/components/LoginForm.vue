<template>
<div>
<div class="login-wrap">
  <div class="login-html">

 <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
      <router-link :to="{name: 'login'}" id="tab-1-link" class="tab" @click.native="setActiveTab('sign-in')">로그인</router-link>

      <input id="tab-2" type="radio" name="tab" class="sign-up">
      <router-link :to="{name: 'signup'}" id="tab-2-link" class="tab" @click.native="setActiveTab('sign-up')">회원가입</router-link>



    <div class="login-form">
      <div class="sign-in-htm">
        <form @submit.prevent="login">
          <div class="group">
            <label for="user" class="label">아이디</label>
            <input id="user" type="text" class="input" v-model="username">
          </div>
          <div class="group">
            <label for="pass" class="label">비밀번호</label>
            <input id="pass" type="password" class="input" data-type="password" v-model="password">
          </div>
          <div class="group">
            <button type="submit" class="button">로그인</button>
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
  name: 'LoginForm',

  data () {
    return {

      activeTab: 'sign-in',
      username: null,
      password: null,
      error: null,
    }
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
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
body{
  font:600 16px/18px 'Open Sans',sans-serif;
  background-color: black;
}
*,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}

.login-wrap{
  width:100%;
  margin:auto;
  max-width:525px;
  min-height:670px;
  position:relative;

}
.login-html{
  width:100%;
  height:100%;
  position:absolute;
  padding:90px 70px 50px 70px;
  background:black;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
  top:0;
  left:0;
  right:0;
  bottom:0;
  position:absolute;
  transform:rotateY(180deg);
  backface-visibility:hidden;
  transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
  display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
  text-transform:uppercase;
}
.login-html .tab{
  font-size:22px;
  margin-right:15px;
  padding-bottom:5px;
  margin:0 15px 10px 0;
  display:inline-block;
  border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
  color:#fff;
  border-color:#1161ee;
}
.login-form{
  min-height:345px;
  position:relative;
  perspective:1000px;
  transform-style:preserve-3d;
}
.login-form .group{
  margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
  width:100%;
  color:#fff;
  display:block;
}
.login-form .group .input,
.login-form .group .button{
  border:none;
  padding:15px 20px;
  border-radius:25px;
  background:rgba(255,255,255,.1);
}
.login-form .group input[data-type="password"]{
  -webkit-text-security:circle;
}
.login-form .group .label{
  color:#aaa;
  font-size:12px;
}
.login-form .group .button{
  background:#1161ee;
}
.login-form .group label .icon{
  width:15px;
  height:15px;
  border-radius:2px;
  position:relative;
  display:inline-block;
  background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
  content:'';
  width:10px;
  height:2px;
  background:#fff;
  position:absolute;
  transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
  left:3px;
  width:5px;
  bottom:6px;
  transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
  top:6px;
  right:0;
  transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
  color:#fff;
}
.login-form .group .check:checked + label .icon{
  background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
  transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
  transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
  transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
  transform:rotate(0);
}

.hr{
  height:2px;
  margin:60px 0 50px 0;
  background:rgba(255,255,255,.2);
}
.foot-lnk{
  text-align:center;
}
a.tab {
  display: inline-block;
  padding: 10px 15px;
  margin: -10px -15px;
}
.login-html .tab:not(:checked) {
  color: rgba(255, 255, 255, 0.3);
}
.container {
  display: flex;
}

.left-section {
  flex: 1;
}

.right-section {
  flex: 1;
}
</style>