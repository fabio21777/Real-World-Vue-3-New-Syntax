<script setup>
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
</script>

<template>
  <div class="todo-app">
    <todo-form />
    <todo-list />
  </div>
</template>

<style scoped>
.todo-app {
  padding: 5vh;
  min-height: 100vh;
  width: 100%;
  background-color: #f7f9fc;
}
</style>
