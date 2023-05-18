<template>
  <div>
    <form @submit.prevent = "login" class="px-4 py-3">
      <div>
        <a href="/accounts/login">로그인</a>
        <a href="/accounts/signup">회원가입</a>
      </div>
    <div class="mb-3">
      <label for="username" class="form-label">이름</label>
      <input type="name" class="form-control" id="username" placeholder="이름을 입력해 주세요" v-model="username">
      <label for="Email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="Email" placeholder="이메일을 입력해 주세요" v-model="email">
    </div>
    <div class="mb-3">
      <label for="Password" class="form-label">Password</label>
      <input type="password" class="form-control" id="Password" placeholder="비밀번호를 입력해 주세요" v-model="password">
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck">
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
}
</script>

<style>

</style>