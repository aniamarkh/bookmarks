<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";
import BookmarkBody from "./BookmarkBody.vue";
import SubCategory from "./SubcategoryBody.vue";
import BookmarkForm from "./BookmarkForm.vue";
import CategoryEditForm from "./CategoryEditForm.vue";

const props = defineProps({
  subcategory: Object,
});

const isOpen: Ref<boolean> = ref(true);
const showAddBookmarkForm: Ref<boolean> = ref(false);
const showEditCategoryForm: Ref<boolean> = ref(false);

const closeAddBookmarkForm = () => showAddBookmarkForm.value = false;
const closeEditCategoryForm = () => showEditCategoryForm.value = false;
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

  <CategoryEditForm v-if="showEditCategoryForm" :category="subcategory" @close-form="closeEditCategoryForm"/>

  <ul v-if="isOpen">
    <li v-for="(child, index) in subcategory.children" :key="index">
      <BookmarkBody v-if="!child.children" :bookmark="child" />
      <SubCategory v-if="child.children" :subcategory="child" />
    </li>
  </ul>

  <BookmarkForm v-if="showAddBookmarkForm" :categoryId="subcategory.id" @close-form="closeAddBookmarkForm"/>
</template>

<style scoped>
.subcategory-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 21px;
  cursor: pointer;
  width: 250px;
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

.icon img {
  width: 19px;
  heigth: 19px;
}

ul {
  padding-left: 21px;
}
</style>