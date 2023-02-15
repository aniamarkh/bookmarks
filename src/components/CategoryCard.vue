<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Form from "./BookmarkForm.vue";
import BookmarkBody from "./BookmarkBody.vue";
import CategoryTitle from "./CategoryTitle.vue";
import SubCategory from "./SubcategoryBody.vue";
import Draggable from "vuedraggable";
import { store } from "../store.ts";

const props = defineProps({
  category: Object,
});
const showBookmarkForm: Ref<boolean> = ref(false);
// https://stackoverflow.com/questions/73105353/change-ref-of-the-parent-from-child-component-using-vue-3
const closeForm = () => showBookmarkForm.value = false;

const validateDrop = (evt) => {
  const draggedElement = evt.dragged;
  if (draggedElement.classList.contains("bookmarkbody")) {
    const targetNode = evt.to;
    if (targetNode.classList.contains("categories-wrapper")) {
      return false;
    }
  }
  return true;
}
</script>

<template>
  <CategoryTitle :category="category"/>
  <Draggable 
    :list="category.children" 
    group="bookmarks"
    item-key="id"
    :move="validateDrop"
    @end="store.saveToLocalStore()">
    <template #item="{element}">
      <div :class=" element.children ? 'subcatbody' : 'bookmarkbody' ">
        <BookmarkBody v-if="!element.children" :bookmark="element" />
        <SubCategory v-if="element.children" :subcategory="element" />
      </div>
    </template>
  </Draggable>

  <button class="add-bookmark-btn" @click="showBookmarkForm = !showBookmarkForm" v-if="!showBookmarkForm">
    <img src="./assets/add.svg" alt="add bookmark" />
  </button>
  <Form v-if="showBookmarkForm" :categoryId="category.id" @close-form="closeForm"/>

</template>