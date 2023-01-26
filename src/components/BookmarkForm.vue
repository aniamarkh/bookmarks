<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const input_title: Ref<string> = ref("");
const input_url: Ref<string> = ref("");
const input_category: Ref<string> = ref("");

const isInvalidInputs = (): boolean => {
  const isEmpty: boolean =
    input_title.value.trim() === "" || input_url.value.trim() === "";
  let invalidUrl: boolean;

  try {
    new URL(input_url.value);
    invalidUrl = false;
  } catch (err) {
    invalidUrl = true;
  }

  return isEmpty || invalidUrl;
};

const onSubmit = (): void => {
  store.addBookmark(input_title.value, input_url.value, input_category.value);

  input_title.value = "";
  input_url.value = "";
};
</script>

<template>
  <div class="form-wrapper">
    <form class="bookmark_form" @submit.prevent="addBookmark">
      <input type="text" placeholder="title" v-model="input_title" />
      <input type="url" placeholder="url" v-model="input_url" />
      <input
        type="submit"
        value="Add a bookmark"
        :disabled="isInvalidInputs()"
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