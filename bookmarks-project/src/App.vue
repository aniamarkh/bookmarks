<script setup lang="ts">
import ToDoList from "./components/ToDoList.vue";
</script>

<template>
  <main>
    <ToDoList />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
}
</style>
