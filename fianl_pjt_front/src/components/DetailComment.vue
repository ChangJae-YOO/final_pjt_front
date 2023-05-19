<template>
  <div>
    <p>작성자 : {{Comment.user_name}} | 댓글: {{Comment.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'DetailComment',

  props: {
    Comment: Object
  },
}
</script>

<style>

</style>