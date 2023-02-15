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
      <form class="form">
        <input type="text" placeholder="category title" v-model="input_category"/>
        <button class="submit-btn" :disabled="isInvalidInput()" @click.prevent="onSubmit"></button>
        <button class="cancel-btn" @click="sendCloseFormEvent"></button>
      </form>
</template>

<style scoped>

.form {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  justify-content: center;
  align-items: center;
  width: 320px;
}
input[type="text"] {
  width: 320px;
  min-height: 30px;
  align-self: flex-end;
  background-color: var(--white);
	color: inherit;
	border: none;
  border-radius: 10px;
  padding: 0.4rem;
	font: inherit;
	outline: inherit;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
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
    background-color: var(--white);
}

.submit-btn:disabled {
  pointer-events: none;
  opacity: 0;
}
</style>