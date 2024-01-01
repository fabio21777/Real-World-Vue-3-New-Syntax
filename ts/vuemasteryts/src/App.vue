<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import fetchCount from './fetchCount' // a mock fetch function

interface AppInfo {
  name: string
  slogan: string
}

const appInfo: AppInfo = reactive({
  name: 'Counter',
  slogan: 'an app you can count on'
})

const count = ref<number | null>(null)

onMounted(() => {
  fetchCount((initialCount) => {
    count.value = initialCount
  })
})

</script>

<template>
  <div>
    <h1>{{ appInfo.name }}</h1>
    <h2>{{ appInfo.slogan }}</h2>
  </div>
  <p>{{ count }}</p>
</template>
