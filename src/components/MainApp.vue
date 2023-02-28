<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryCard from "./CategoryCard.vue";
import ToolsPanel from "./ToolsPanel.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import Draggable from "vuedraggable";


const showCategoryForm: Ref<boolean> = ref(false);
const closeCategoryForm = () => showCategoryForm.value = false;
</script>

<template>
  <ToolsPanel />
  <Draggable
    :empty-insert-threshold="20"
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 3 40 40" height="20" width="20"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
        </button>
      </div>
    </template>
  </Draggable>
</template>
