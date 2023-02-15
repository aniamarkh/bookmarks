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
  <div class="bookmark-wrapper" v-if="!showEditForm">
    <img class="favicon" v-bind:src="bookmark.favicon" />
    <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
    <button class="bookmark-btn" @click="showEditForm = !showEditForm">
      <img src="./assets/edit.svg" alt="edit" />
    </button>
    <button class="bookmark-btn" @click="store.deleteNode(bookmark.id)">
      <img src="./assets/delete.svg" alt="delete" />
    </button>
  </div>
  <form class="bookmark-edit_form" v-if="showEditForm" @submit.prevent="onSubmit">
    <input type="text" placeholder="new title" v-model="input_newTitle"/>
    <input type="url" placeholder="new url" v-model="input_newUrl"/>
    <div class="bookmark-form--btns">
      <button class="submit-btn" :disabled="isInvalidInputs()" @click.prevent="onSubmit"></button>
      <button class="cancel-btn" @click="sendCloseFormEvent"></button>
    </div>
  </form>
</template>

<style scoped> 
.favicon {
  width: 18px;
  margin-right: 5px;
}

.submit-btn, .cancel-btn {
  cursor: pointer;
  background-color: inherit;
  min-width: 40px;
  min-height: 30px;
  color: inherit;
	border: none;
  border-radius: 12px;
  padding: 0 0.8rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  transition: all 0.2s;
  align-items: center;
}

.cancel-btn {
  background-image: url("./assets/close.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.submit-btn {
  background-image: url("./assets/done.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.submit-btn:hover, .cancel-btn:hover {
    background-color: var(--light-gray);
}

.submit-btn:disabled {
  pointer-events: none;
  opacity: 0;
}

input {
  width: auto;
  min-height: 30px;
  background-color: var(--light-gray);
	color: inherit;
	border: none;
  border-radius: 10px;
  padding: 0.2rem;
	font: inherit;
	outline: inherit;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
}

.bookmark-form--btns {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  width: auto;
  justify-content: flex-end;
}

</style>