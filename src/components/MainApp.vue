<script setup lang="ts">
import { store } from "../store";
import CategoryForm from "./CategoryForm.vue";
import CategoryCard from "./CategoryCard.vue";
import { ref } from "vue";
import type { Ref } from "vue";

const showCategoryForm: Ref<boolean> = ref(false);
const closeCategoryForm = () => showCategoryForm.value = false;

</script>

<template>
  <div class="categories-wrapper">
    <div
      class="category"
      v-for="(category, index) in store.data.children"
      :key="index"
    >
      <CategoryCard :category="category" />
    </div>
    <div class="new-category">
        <CategoryForm v-if="showCategoryForm" @close-form="closeCategoryForm"/>
        <button v-if="!showCategoryForm" class="new-category-btn" @click="showCategoryForm = !showCategoryForm">
          <img src="./assets/add.svg" alt="add bookmark" />
        </button>
    </div>
  </div>
</template>
