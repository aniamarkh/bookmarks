<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  categoryId:  { type: Number, required: true },
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
      <form class="form">
        <input type="text" placeholder="title" v-model="input_title" />
        <input type="url" placeholder="url" v-model="input_url" />
        <div class="bookmark-form--btns">
          <button class="submit-btn" :disabled="isInvalidInputs()" @click.prevent="onSubmit"></button>
          <button class="cancel-btn" @click="sendCloseFormEvent"></button>
        </div>

      </form>
    </div>
</template>

<style scoped>
.form-wrapper {
  width:auto;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 280px;
}

.bookmark-form--btns {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  width: 280px;
  justify-content: flex-end;
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
</style>