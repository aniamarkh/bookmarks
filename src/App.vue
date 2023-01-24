<script setup lang="ts">
import LinkList from "./components/LinkList.vue";
import Form from "./components/Form.vue";
</script>

<template>
  <main>
    <Form />
    <LinkList />
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
