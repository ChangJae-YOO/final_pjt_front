<template>
  <div @click="goToTheme" class="card">
    <p>{{ this.theme.title }}</p>
    <p>{{ this.theme.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardTheme',

  props: {
    theme: Object,
  },

  methods: {
    goToTheme() {
      this.$router.push({ name: 'theme', params: { id: this.theme.id } });
    },
  },
}
</script>

<style>
</style>
