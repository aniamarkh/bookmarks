<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import Form from "./BookmarkForm.vue";
import type { Category, Bookmark } from "../types"

const props = defineProps({
  category: Object,
});

const getCategoryBookmarks = (categoryId: number) => {
  let categoryBookmarks: Array<Bookmark> = [];
  const category: Category = store.categories.find((item: Category) => item.id === categoryId);
  category.bookmarks.forEach((id: number) => {
    const bookmarkObj = store.bookmarks.find((item: Bookmark) => item.id === id);
    categoryBookmarks.push(bookmarkObj);
  });
  return categoryBookmarks;
};
</script>

<template>
  <h3>• {{ category.title }}</h3>
  <ul>
    <li v-for="bookmark in getCategoryBookmarks(category.id)" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button class="bookmark-btn" @click="editBookmark(bookmark.id)">
        <img src="./assets/edit.svg" alt="edit" />
      </button>
      <button class="bookmark-btn" @click="store.deleteBookmark(bookmark.id, category.id)">
        <img src="./assets/delete.svg" alt="delete" />
      </button>
    </li>
  </ul>

  <Form :categoryId="category.id" />
</template>