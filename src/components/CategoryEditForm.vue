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
  <form class="category-edit_form" @submit.prevent="editCategory">
    <input type="text" placeholder="new category title" v-model="input_category" />
    <input type="submit" value="edit" :disabled="isInvalidInput()" />
  </form>
</template>