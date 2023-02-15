<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryCard from "./CategoryCard.vue";
import BookmarkBody from "./BookmarkBody.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import Draggable from "vuedraggable";


const showCategoryForm: Ref<boolean> = ref(false);
const closeCategoryForm = () => showCategoryForm.value = false;
</script>

<template>
  <Draggable 
    class="categories-wrapper"
    :list="store.data.children" 
    group="bookmarks"
    item-key="id"
    @end="store.saveToLocalStore()">
    <template #item="{element}">
      <div class="category">
        <CategoryCard v-if="element.children" :category="element" />
      </div>
    </template>
    
    <template #footer>
      <div class="new-category">
        <CategoryForm v-if="showCategoryForm" @close-form="closeCategoryForm"/>
        <button v-if="!showCategoryForm" class="new-category-btn" @click="showCategoryForm = !showCategoryForm">
          <img src="./assets/add.svg" alt="add bookmark" />
        </button>
      </div>
    </template>
  </Draggable>
</template>
