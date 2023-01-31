<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";

const props = defineProps({
  category: Object,
});

const input_category: Ref<string> = ref(props.category.title);
const isInvalidInput = (): boolean => {
  return input_category.value.trim() === "";
};

const showCatEditForm = ref(false);

const onSubmit = () => {
  store.editCategory(props.category.id, input_category.value);
  showCatEditForm.value = false;
}

</script>

<template>
  <div class="category-title">
      <h3 v-if="!showCatEditForm">{{ category.title }}</h3>
      <form v-if="showCatEditForm" class="bookmark-edit_form" @submit.prevent="onSubmit">
        <input type="text" placeholder="new category title" v-model="input_category" />
        <input type="submit" value="edit" :disabled="isInvalidInput()" />
      </form>
      <div v-if="!showCatEditForm" class="category-btns">
        <button class="category-btn" @click="showCatEditForm = !showCatEditForm">
          <img src="./assets/edit.svg" alt="edit" />
        </button>
        <button class="category-btn" @click="store.deleteNode(category.id)">
          <img src="./assets/delete.svg" alt="delete" />
        </button>
      </div>
  </div>
</template>