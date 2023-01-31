<script setup lang="ts">
import Form from "./BookmarkForm.vue";
import BookmarkBody from "./BookmarkBody.vue";
import CategoryTitle from "./CategoryTitle.vue";

const props = defineProps({
  category: Object,
});
</script>

<template>
  <CategoryTitle :category="category"/>
  <ul>
    <li v-for="(bookmark, index) in category.children" :key="index">
      <BookmarkBody :bookmark="bookmark"/>
    </li>
  </ul>

  <Form :categoryId="category.id"/>
</template>