<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";
import BookmarkBody from "./BookmarkBody.vue";
import SubCategory from "./SubcategoryBody.vue";
import BookmarkForm from "./BookmarkForm.vue";
import CategoryEditForm from "./CategoryEditForm.vue";
import Draggable from "vuedraggable";


const props = defineProps({
  subcategory: Object,
});

const isOpen: Ref<boolean> = ref(true);
const showAddBookmarkForm: Ref<boolean> = ref(false);
const showEditCategoryForm: Ref<boolean> = ref(false);

const closeAddBookmarkForm = () => showAddBookmarkForm.value = false;
const closeEditCategoryForm = () => showEditCategoryForm.value = false;

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
  <div class="subcategory-wrapper" v-if="!showEditCategoryForm">
    <h4 class="subcategory-title" @click="isOpen=!isOpen">
      <div v-if="!isOpen" class="icon">
        <img src="./assets/arrow-right.svg" alt="close"/>
      </div>
      <div v-if="isOpen" class="icon">
        <img src="./assets/arrow-down.svg" alt="open"/>
      </div>
      {{ subcategory.title }}
    </h4>
    <div class="subcategory-btns">
      <button class="category-btn" @click="showAddBookmarkForm=!showAddBookmarkForm">
        <img src="./assets/add.svg" alt="add"/>
      </button>
      <button class="category-btn" @click="showEditCategoryForm=!showEditCategoryForm">
        <img src="./assets/edit.svg" alt="edit" />
      </button>
      <button class="category-btn" @click="store.deleteNode(subcategory.id)">
        <img src="./assets/delete.svg" alt="delete" />
      </button>
    </div>
  </div>
  
  <BookmarkForm v-if="showAddBookmarkForm" :categoryId="subcategory.id" @close-form="closeAddBookmarkForm"/>
  <CategoryEditForm v-if="showEditCategoryForm" :category="subcategory" @close-form="closeEditCategoryForm"/>

  <Draggable
    class="subcat-items"
    :list="subcategory.children" 
    group="bookmarks"
    item-key="id"
    :move="validateDrop"
    @end="store.saveToLocalStore()">
    <template #item="{element}">
      <div :class=" element.children ? 'subcatbody' : 'bookmarkbody' " v-if="isOpen">
        <BookmarkBody v-if="!element.children" :bookmark="element" />
        <SubCategory v-if="element.children" :subcategory="element" />
      </div>
    </template>
  </Draggable>
</template>

<style scoped>
.subcategory-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 21px;
  cursor: pointer;
}

.subcategory-title {
  display: flex;
  flex-direction: row;
}

.subcategory-btns {
  display: none;
  flex-direction: row;
  gap: 4px;
}

.subcategory-wrapper:hover .subcategory-btns {
  display: flex;
}

.subcategory-title {
  text-decoration: none;
  overflow:hidden;
  white-space: nowrap; 
  text-align: start;
  width: 250px;
  -webkit-mask-image: linear-gradient(90deg, var(--dark-gray) 60%, transparent);
}

.subcat-items {
  padding-left: 1.5rem;
  margin-bottom: .5rem;
}

.icon img {
  width: 19px;
  heigth: 19px;
}

ul {
  padding-left: 21px;
}
</style>