<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  categoryId: Number,
});

const showBookmarkForm = ref(false);
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
  showBookmarkForm.value = !showBookmarkForm.value;
  store.addBookmark(props.categoryId, input_title.value, input_url.value);
  input_title.value = "";
  input_url.value = "";
};
</script>

<template>
  <Transition>
    <div class="form-wrapper" v-if="showBookmarkForm">
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
  </Transition>
    <button
      class="add-bookmark-btn"
      @click="showBookmarkForm = !showBookmarkForm"
      v-if="!showBookmarkForm"
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