<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const input_category: Ref<string> = ref("");

const isInvalidInput = (): boolean => {
  return input_category.value.trim() === "";
};

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const onSubmit = (): void => {
  store.addCategory(0, input_category.value);
  input_category.value = "";
  sendCloseFormEvent();
};
</script>

<template>
      <form class="bookmark_form" @submit.prevent="onSubmit">
        <input type="text" placeholder="category title" v-model="input_category"/>
        <input type="submit" value="Add a new category" :disabled="isInvalidInput()"/>
      </form>
</template>