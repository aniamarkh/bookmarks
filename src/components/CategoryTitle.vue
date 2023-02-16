<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";
import CategoryEditForm from "./CategoryEditForm.vue"

const props = defineProps({
  category: { type: Object, required: true },
});

const input_category: Ref<string> = ref(props.category.title);
const input_subcategory: Ref<string> = ref("");

const isInvalidInput = (formType: "subcategory" | "editcategory"): boolean => {
  if (formType === "subcategory") {
    return input_subcategory.value.trim() === "";
  }
  if (formType === "editcategory") {
    return input_category.value.trim() === "";
  }
  return false;
};

const showCatEditForm = ref(false);

const closeEditCategoryForm = () => showCatEditForm.value = false;

</script>

<template>
  <div class="category-title">
      <h3 v-if="!showCatEditForm">{{ category.title }}</h3>
      <div v-if="!showCatEditForm" class="category-btns">
        <button class="category-btn" @click="showCatEditForm = !showCatEditForm">
          <img src="./assets/edit.svg" alt="edit" />
        </button>
        <button class="category-btn" @click="store.deleteNode(category.id)">
          <img src="./assets/delete.svg" alt="delete" />
        </button>
      </div>
  </div>
  <div class="category-forms">
    <CategoryEditForm v-if="showCatEditForm" :category="category" @close-form="closeEditCategoryForm"/>
  </div>
</template>