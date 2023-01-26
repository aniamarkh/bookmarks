<script setup lang="ts">
import { store } from "../store";
import Form from "./AddBookmarkForm.vue";

console.log(Form);

const getCategories = (): Set<string> => {
  return new Set(store.bookmarks.map((bookmark) => bookmark.category));
};

const filterByCategory = (category: string) => {
  return store.bookmarks.filter((bookmark) => bookmark.category === category);
};
</script>

<template>
  <div class="categories-wrapper">
    <div
      class="category"
      v-for="(category, index) in getCategories()"
      :key="index"
    >
      <h3>{{ category }}</h3>
      <ul>
        <li v-for="bookmark in filterByCategory(category)" :key="bookmark.id">
          <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
          <button class="bookmark-btn" @click="editBookmark(bookmark.id)">
            <img src="./assets/edit.svg" alt="edit" />
          </button>
          <button
            class="bookmark-btn"
            @click="store.deleteBookmark(bookmark.id)"
          >
            <img src="./assets/delete.svg" alt="delete" />
          </button>
        </li>
      </ul>
      <button class="add-bookmark-btn">
        <img src="./assets/add.svg" alt="add bookmark" />
      </button>
    </div>
    <div class="new-category">
      <button class="new-category-btn">
        <img src="./assets/add.svg" alt="add bookmark" />
      </button>
    </div>
  </div>
</template>
