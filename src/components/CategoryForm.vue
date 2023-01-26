<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const input_category: Ref<string> = ref("");

const isInvalidInput = (): boolean => {
  return input_category.value.trim() === "";
};

const onSubmit = (): void => {
  input_category.value = "";
};
</script>

<template>
  <div class="form-wrapper">
    <form class="bookmark_form" @submit.prevent="addBookmark">
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
</template>

<style scoped>
.bookmark_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>