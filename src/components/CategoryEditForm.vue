<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";

const props = defineProps({
  category: Object,
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
      <button class="submit-btn" :disabled="isInvalidInput()" @click.prevent="editCategory"></button>
      <button class="cancel-btn" @click="sendCloseFormEvent"></button>
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
</style>