<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryTemplate from "./Category.vue";
import { ref } from "vue";

const showCategoryForm = ref(false);

const getCategories = (): Set<string> => {
  return store.categories;
};
</script>

<template>
  <div class="categories-wrapper">
    <div
      class="category"
      v-for="(category, index) in getCategories()"
      :key="index"
    >
      <CategoryTemplate :category="category" />
    </div>
    <div class="new-category">
      <Transition>
        <CategoryForm v-if="showCategoryForm" />
      </Transition>
      <button
        v-if="!showCategoryForm"
        class="new-category-btn"
        @click="showCategoryForm = !showCategoryForm"
      >
        <img src="./assets/add.svg" alt="add bookmark" />
      </button>
    </div>
  </div>
</template>
