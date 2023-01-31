<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  bookmark: Object,
});

const showEditForm = ref(false);

const input_newTitle: Ref<string> = ref(props.bookmark.title);
const input_newUrl: Ref<string> = ref(props.bookmark.url);

const isInvalidInputs = (): boolean => {
  const isEmpty: boolean =
    input_newTitle.value.trim() === "" || input_newUrl.value.trim() === "";
  let invalidUrl: boolean;

  try {
    new URL(input_newUrl.value);
    invalidUrl = false;
  } catch (err) {
    invalidUrl = true;
  }

  return isEmpty || invalidUrl;
};

const onSubmit = (): void => {
  store.editBookmark(props.bookmark.id, input_newTitle.value, input_newUrl.value);
  showEditForm.value = false;
}
</script>

<template>
  <div class="bookmark-wrapper">
    <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
    <button class="bookmark-btn" @click="showEditForm = !showEditForm">
      <img src="./assets/edit.svg" alt="edit" />
    </button>
    <button class="bookmark-btn" @click="store.deleteBookmark(bookmark.id)">
      <img src="./assets/delete.svg" alt="delete" />
    </button>
  </div>
  <Transition>
    <form class="bookmark-edit_form" v-if="showEditForm" 
    @submit.prevent="onSubmit">
      <input type="text" placeholder="new title" v-model="input_newTitle"/>
      <input type="url" placeholder="new url" v-model="input_newUrl"/>
      <input
        type="submit"
        value="Edit bookmark"
        :disabled="isInvalidInputs()"
      />
    </form>
  </Transition>
</template>