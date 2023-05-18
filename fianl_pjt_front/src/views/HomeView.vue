<template>
  <div>
    <h1>홈입니다 ㅋㅋ</h1>
    <router-link :to="{name: 'login'}">로그인 화면</router-link> |
    <router-link :to="{name: 'signup'}">회원가입 화면</router-link> |
    <router-link :to="{name: 'detail'}">디테일화면</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>