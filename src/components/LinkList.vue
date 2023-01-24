<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";

const input_title: Ref<string> = ref("");
const input_url: Ref<string> = ref("");
const input_category: Ref<string> = ref("");

const isInvalidInputs = (): boolean => {
  const isEmpty: boolean =
    input_title.value.trim() === "" ||
    input_url.value.trim() === "" ||
    input_category.value.trim() === "";
  let invalidUrl: boolean;

  try {
    new URL(input_url.value);
    invalidUrl = false;
  } catch (err) {
    invalidUrl = true;
  }

  return isEmpty || invalidUrl;
};

const addBookmark = (): void => {
  let maxIdValue = store.reduce((acc, value) => {
    return (acc = acc > value.id ? acc : value.id);
  }, 0);

  store.push({
    id: maxIdValue + 1,
    title: input_title.value,
    url: input_url.value,
    category: input_category.value,
  });

  input_title.value = "";
  input_url.value = "";
  input_category.value = "";
};

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
  <div class="form-wrapper">
    <form class="bookmark_form" @submit.prevent="addBookmark">
      <h4>Add new link</h4>
      <input type="text" placeholder="title" v-model="input_title" />
      <input type="url" placeholder="url" v-model="input_url" />
      <input type="text" placeholder="category" v-model="input_category" />
      <input
        type="submit"
        value="Add a bookmark"
        :disabled="isInvalidInputs()"
      />
    </form>
  </div>
  <div
    class="categories-wrapper"
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
</template>

<style scoped>
.categories-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: antiquewhite;
  padding: 15px;
  border-radius: 10px;
  gap: 20px;
  width: 200px;
  justify-content: space-between;
  text-align: center;
}
.bookmark_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
