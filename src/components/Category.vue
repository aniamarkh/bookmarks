<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import Form from "./BookmarkForm.vue";

const props = defineProps({
  category: String,
});

const showForm = ref(false);

const filterByCategory = (category: string) => {
  return store.bookmarks.filter((bookmark) => bookmark.category === category);
};
</script>

<template>
  <h3>{{ category }}</h3>
  <ul>
    <li v-for="bookmark in filterByCategory(category)" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button class="bookmark-btn" @click="editBookmark(bookmark.id)">
        <img src="./assets/edit.svg" alt="edit" />
      </button>
      <button class="bookmark-btn" @click="store.deleteBookmark(bookmark.id)">
        <img src="./assets/delete.svg" alt="delete" />
      </button>
    </li>
  </ul>

  <Form v-if="showForm" />
    <button
    class="add-bookmark-btn"
    @click="showForm = !showForm"
    v-if="!showForm"
  >
    <img src="./assets/add.svg" alt="add bookmark" />
  </button>
</template>