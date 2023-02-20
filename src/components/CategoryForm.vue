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
        <button class="submit-btn" :disabled="isInvalidInput()" @click.prevent="onSubmit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 -5 50 50" height="20" width="20"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/></svg>
        </button>
        <button class="cancel-btn" @click="sendCloseFormEvent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 -5 50 50" height="20" width="20"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
        </button>
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
  background-color: var(--cards);
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

.submit-btn svg, .cancel-btn svg {
  fill: var(--text);
  transition: all .2s;
}

.submit-btn:hover, .cancel-btn:hover {
  background-color: var(--background);
}

.submit-btn:hover svg, .cancel-btn:hover svg{
  transform: scale(1.2);
}

.submit-btn:disabled {
  pointer-events: none;
  opacity: 0;
}
</style>