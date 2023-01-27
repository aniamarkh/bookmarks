<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryTemplate from "./Category.vue";

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
        <CategoryForm />
    </div>
  </div>
</template>
