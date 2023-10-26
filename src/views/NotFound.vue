<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
})
</script>

<template>
  <div class="container">
    <h1 class="title">404 - Page Not Found</h1>
    <p class="subtitle">
      Oops! The {{ resource }} you are looking for does not exist.
    </p>
    <router-link to="/" class="button is-primary">Go Home</router-link>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.subtitle {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.button {
  font-size: 1.5rem;
  padding: 1rem 2rem;
}
</style>
