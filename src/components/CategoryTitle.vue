<script setup lang="ts">
import { store } from "../store";
import { ref } from "vue";
import type { Ref } from "vue";
import CategoryEditForm from "./CategoryEditForm.vue";
import { settings } from "../settings";
import type { Category } from "../types";

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

const getCategory = (id: string) => {
  const category = store.findNodeById(store.chromeTreeNode, id);
  return category as Category;
};

</script>

<template>
  <div class="category-title">
      <h3 v-if="!showCatEditForm">{{ getCategory(category.id).title }}</h3>
      <div v-if="!showCatEditForm && settings.edit" class="category-btns">
        <button class="category-btn" @click="showCatEditForm = !showCatEditForm">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.583 15.667h.896l8.083-8.084-.895-.916-8.084 8.083Zm10.771-8.625-2.125-2.167.833-.833q.271-.271.615-.271t.635.271l.896.916q.25.25.23.636-.021.385-.271.635Zm-.542.541-8.958 8.938H3.729v-2.146l8.938-8.917Zm-1.687-.458-.458-.458.895.916Z"/></svg>
        </button>
        <button class="category-btn" @click="store.deleteNode(category.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.042 16.042q-.459 0-.782-.323-.322-.323-.322-.802V5.542h-.98v-.604h3.063v-.792h3.958v.792h3.083v.604h-.979v9.375q0 .479-.323.802-.322.323-.802.323Zm6.437-10.5H6.542v9.375q0 .229.146.375.145.146.354.146h5.916q.188 0 .354-.157.167-.156.167-.364Zm-4.75 8.416h.604V7.021h-.604Zm1.938 0h.604V7.021h-.604ZM6.542 5.542v9.896-.521Z"/></svg>
        </button>
      </div>
  </div>
  <div class="category-forms">
    <CategoryEditForm v-if="showCatEditForm" :category="category" @close-form="closeEditCategoryForm"/>
  </div>
</template>