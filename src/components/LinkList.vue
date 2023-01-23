<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";

const input_title = ref("");
const input_url = ref("");

const isBtnDisabled = () => {
  if (input_title.value.trim() === "" || input_url.value.trim() === "") {
    return true;
  }
  return false;
};

const addBookmark = () => {
  if (input_title.value.trim() === "" || input_url.value.trim() === "") {
    return;
  }
  store.push({
    id: store.length + 1,
    title: input_title.value,
    url: input_url.value,
    //todo: category: input_category.value,
    category: "Job",
  });

  input_title.value = "";
  input_url.value = "";
};

const deleteBookmark = (id: number) => {
  const bookmarkToDelete = store.findIndex((bookmark) => bookmark.id === id);

  if (bookmarkToDelete > -1) {
    store.splice(bookmarkToDelete, 1);
  }

  return store;
};
</script>

<template>
  <div class="form-wrapper">
    <form class="bookmark_form" @submit.prevent="addBookmark">
      <h4>Add new link</h4>
      <input type="text" placeholder="title" v-model="input_title" />
      <input type="url" placeholder="url" v-model="input_url" />
      <input type="submit" value="Add a bookmark" :disabled="isBtnDisabled()" />
      <!-- todo: category input -->
    </form>
  </div>
  <ul>
    <li v-for="bookmark in store" :key="bookmark.id">
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      <button @click="deleteBookmark(bookmark.id)">×</button>
      <!--todo: <button @click="editBookmark(bookmark.id)">edit</button> -->
    </li>
  </ul>
</template>

<style scoped>
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
}

li {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
