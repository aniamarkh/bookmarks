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
  store.addCategory(input_category.value.toLowerCase());
  input_category.value = "";
};
</script>

<template>
  <Transition>
    <div class="form-wrapper" v-if="showCategoryForm">
      <form class="bookmark_form" @submit="addBookmark">
        <input
          type="text"
          placeholder="category title"
          v-model="input_category"
        />
        <input
          type="submit"
          value="Add a new category"
          :disabled="isInvalidInput()"
          @click="onSubmit"
        />
      </form>
    </div>
  </Transition>
    <button
      v-if="!showCategoryForm"
      class="new-category-btn"
      @click="showCategoryForm = !showCategoryForm"
    >
      <img src="./assets/add.svg" alt="add bookmark" />
    </button>
</template>

<style scoped>
.bookmark_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>