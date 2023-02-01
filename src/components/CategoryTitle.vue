<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";
import CategoryEditForm from "./CategoryEditForm.vue"

const props = defineProps({
  category: Object,
});

const input_category: Ref<string> = ref(props.category.title);
const input_subcategory: Ref<string> = ref("");

const isInvalidInput = (formType: string): boolean => {
  if (formType === "subcategory") {
    return input_subcategory.value.trim() === "";
  }
  if (formType === "editcategory") {
    return input_category.value.trim() === "";
  }
};

const showCatEditForm = ref(false);
const showSubCategoryForm = ref(false);

const closeEditCategoryForm = () => showCatEditForm.value = false;

const addSubCategory = () => {
  store.addCategory(props.category.id, input_subcategory.value);
  input_subcategory.value = "";
  showSubCategoryForm.value = false;
}

</script>

<template>
  <div class="category-title">
      <h3 v-if="!showCatEditForm">{{ category.title }}</h3>
      <div v-if="!showCatEditForm" class="category-btns">
        <button class="category-btn" @click="showSubCategoryForm = !showSubCategoryForm">
          <img src="./assets/add.svg" alt="edit" />
        </button>
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
    <form v-if="showSubCategoryForm" class="sub-category_form" @submit.prevent="addSubCategory">
      <input type="text" placeholder="category title" v-model="input_subcategory" />
      <input type="submit" value="add category" :disabled="isInvalidInput('subcategory')" />
    </form>
  </div>
</template>