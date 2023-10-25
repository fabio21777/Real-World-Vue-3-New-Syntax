<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps(['event'])
const router = useRouter()

const register = () => {
  // If registered then redirect to event details
  router.push({
    name: 'EventDetails',
  })
}
</script>
<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>
