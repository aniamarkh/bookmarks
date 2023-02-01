<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Form from "./BookmarkForm.vue";
import BookmarkBody from "./BookmarkBody.vue";
import CategoryTitle from "./CategoryTitle.vue";
import SubCategory from "./SubcategoryBody.vue";

const props = defineProps({
  category: Object,
});
const showBookmarkForm: Ref<boolean> = ref(false);
// https://stackoverflow.com/questions/73105353/change-ref-of-the-parent-from-child-component-using-vue-3
const closeForm = () => showBookmarkForm.value = false;


</script>

<template>
  <CategoryTitle :category="category"/>
  <ul>
    <li v-for="(child, index) in category.children" :key="index">
      <BookmarkBody v-if="!child.children" :bookmark="child" />
      <SubCategory v-if="child.children" :subcategory="child" />
    </li>
  </ul>

  <button class="add-bookmark-btn" @click="showBookmarkForm = !showBookmarkForm" v-if="!showBookmarkForm">
    <img src="./assets/add.svg" alt="add bookmark" />
  </button>
  <Form v-if="showBookmarkForm" :categoryId="category.id" @close-form="closeForm"/>

</template>