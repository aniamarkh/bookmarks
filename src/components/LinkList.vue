<script setup lang="ts">
import { store } from "../store";

const deleteBookmark = (id: number): void => {
  const bookmarkToDelete = store.findIndex((bookmark) => bookmark.id === id);

  if (bookmarkToDelete) {
    store.splice(bookmarkToDelete, 1);
  }
};

const formCategories = (): Set<string> => {
  return new Set(store.map((bookmark) => bookmark.category));
};

const filterByCategory = (category: string) => {
  return store.filter((bookmark) => bookmark.category === category);
};
</script>

<template>
  <div class="categories-wrapper">
    <div
      class="category"
      v-for="(category, index) in formCategories()"
      :key="index"
    >
      <h4>{{ category }}</h4>
      <ul>
        <li v-for="bookmark in filterByCategory(category)" :key="bookmark.id">
          <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
          <button @click="deleteBookmark(bookmark.id)">×</button>
          <!--todo: <button @click="editBookmark(bookmark.id)">edit</button> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.categories-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
}
.category {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: antiquewhite;
  padding: 15px;
  border-radius: 10px;
  gap: 20px;
  width: 200px;
  text-align: center;
}

ul {
  margin-block-start: 0;
  margin-block-end: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  padding: 0;
}

li {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

h4 {
  margin: 0;
}
</style>
