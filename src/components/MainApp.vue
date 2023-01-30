<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryCard from "./CategoryCard.vue";
import type {Category} from "../types";

const getCategories = (): Array<Category> => {
  return store.data.children;
};
</script>

<template>
  <div class="categories-wrapper">
    <div
      class="category"
      v-for="(category, index) in getCategories()"
      :key="index"
    >
      <CategoryCard :category="category" />
    </div>
    <div class="new-category">
        <CategoryForm />
    </div>
  </div>
</template>
