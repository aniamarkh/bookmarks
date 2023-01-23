<script setup lang="ts">
import { store } from "../store";

const addNew = () => {
  const newItem = {
    id: store.length + 1,
    title: "VueDoc",
    link: "https://vuejs.org/",
    category: "Job",
  };
  store.push(newItem);
};

const deleteLast = () => {
  store.pop();
};

const isBtnDisabled = () => {
  return store.length ? false : true;
};
</script>

<template>
  <div class="form-wrapper">
    <h4>Add new link</h4>
    <form id="link-form"></form>
  </div>
  <div class="btns-wrapper">
    <button @click="addNew">Add new</button>
    <button :disabled="isBtnDisabled()" @click="deleteLast">Delete last</button>
  </div>
  <ol>
    <li v-for="bookmark in store" :key="bookmark.id">
      {{ bookmark.title }}
    </li>
  </ol>
</template>

<style scoped>
.btns-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

ol {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
