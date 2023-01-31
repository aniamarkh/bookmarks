<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const showCategoryForm = ref(false);
const input_category: Ref<string> = ref("");

const isInvalidInput = (): boolean => {
  return input_category.value.trim() === "";
};

const onSubmit = (): void => {
  showCategoryForm.value = !showCategoryForm.value;
  store.addCategory(0, input_category.value);
  input_category.value = "";
};
</script>

<template>
    <div class="form-wrapper" v-if="showCategoryForm">
      <form class="bookmark_form" @submit.prevent="onSubmit">
        <input type="text" placeholder="category title" v-model="input_category"/>
        <input type="submit" value="Add a new category" :disabled="isInvalidInput()"/>
      </form>
    </div>
    <button v-if="!showCategoryForm" class="new-category-btn" @click="showCategoryForm = !showCategoryForm">
      <img src="./assets/add.svg" alt="add bookmark" />
    </button>
</template>