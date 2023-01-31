<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  categoryId: Number,
});

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const input_title: Ref<string> = ref("");
const input_url: Ref<string> = ref("");

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
  store.addBookmark(props.categoryId, input_title.value, input_url.value);
  input_title.value = "";
  input_url.value = "";
    sendCloseFormEvent();

};
</script>

<template>
    <div class="form-wrapper">
      <form class="bookmark_form" @submit.prevent="onSubmit">
        <input type="text" placeholder="title" v-model="input_title" />
        <input type="url" placeholder="url" v-model="input_url" />
        <input
          type="submit"
          value="Add a bookmark"
          :disabled="isInvalidInputs()"
        />
      </form>
    </div>
</template>