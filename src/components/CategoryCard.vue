<script setup lang="ts">
import { store } from "../store";
import Form from "./BookmarkForm.vue";

const props = defineProps({
  category: Object,
});



</script>

<template>
  <h3>• {{ category.title }}</h3>
  <ul>
    <li v-for="(bookmark, index) in category.children" :key="index">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button class="bookmark-btn" @click="editBookmark(bookmark.id)">
        <img src="./assets/edit.svg" alt="edit" />
      </button>
      <button class="bookmark-btn" @click="store.deleteBookmark(bookmark.id)">
        <img src="./assets/delete.svg" alt="delete" />
      </button>
    </li>
  </ul>

  <Form :categoryId="category.id" />
</template>