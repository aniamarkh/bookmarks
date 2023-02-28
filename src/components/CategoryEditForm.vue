<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";

const props = defineProps({
  category: { type: Object, required: true },
});

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const input_category: Ref<string> = ref(props.category.title);

const isInvalidInput = (): boolean => {
  return input_category.value.trim() === "";
};

const editCategory = () => {
  store.editCategory(props.category.id, input_category.value);
  sendCloseFormEvent();
}

</script>


<template>
  <form class="form" @submit.prevent="editCategory">
    <input type="text" placeholder="new category title" v-model="input_category" />
    <div class="form--btns">
      <button class="submit-btn" :disabled="isInvalidInput()" @click.prevent="editCategory">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 50 50" height="20" width="20"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/></svg>
      </button>
      <button class="cancel-btn" @click="sendCloseFormEvent">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 50 50" height="20" width="20"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
      </button>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: space-between;
  width: inherit;
}


.form:hover .category-btns {
  display: none;
}

input {
  width: auto;
  min-height: 30px;
  background-color: var(--background);
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

.form--btns {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  width: auto;
  justify-content: flex-end;
}

.submit-btn, .cancel-btn {
  cursor: pointer;
  background-color: inherit;
  min-width: 30px;
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