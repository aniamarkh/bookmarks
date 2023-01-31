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
    <li v-for="(child, index) in category.children" :key="index">
      <BookmarkBody v-if="!child.children" :bookmark="child" />
      <!-- <SubCategory v-if="child.children.length" :subcategory="child" /> -->
    </li>
  </ul>

  <Form :categoryId="category.id"/>
</template>