<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";
import { settings } from "../settings";
import BookmarkBody from "./BookmarkBody.vue";
import SubCategory from "./SubcategoryBody.vue";
import BookmarkForm from "./BookmarkForm.vue";
import CategoryEditForm from "./CategoryEditForm.vue";
import Draggable from "vuedraggable";
import type { Category } from "../types";
import { onEnd, modifyDragItem } from "../utils";

const props = defineProps({
  subcategory:  { type: Object, required: true },
});

const showAddBookmarkForm: Ref<boolean> = ref(false);
const showEditCategoryForm: Ref<boolean> = ref(false);

const closeAddBookmarkForm = () => showAddBookmarkForm.value = false;
const closeEditCategoryForm = () => showEditCategoryForm.value = false;

const toggleSubcat = (id: string) => {
  const idIndex = store.closed.indexOf(id);
  if (idIndex >= 0) {
    store.closed.splice(idIndex, 1);
  } else {
    store.closed.push(id);
  }
  store.saveToLocalStore();
};

const isClosed = (id: string) => {
  const idIndex = store.closed.indexOf(id);
  if (idIndex >= 0) {
    return false;
  } else {
    return true;
  }
};

const isHidden = (subcategory: Category) => {
  return store.hidden.indexOf(subcategory) === -1 ? true : false;
};

const hideCategory = (nodeToHide: Category) => {
  store.hidden.push(nodeToHide);
  if (store.closed.indexOf(nodeToHide.id) === -1) {
    store.closed.push(nodeToHide.id);
  }
  store.hideCategory(nodeToHide);
  store.saveToLocalStore();
};
</script>

<template>
  <div class="subcategory-wrapper" v-if="!showEditCategoryForm">
    <h4 class="subcategory-title" @click="toggleSubcat(subcategory.id)">
      <div v-if="!isClosed(subcategory.id)" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 2 40 40"><path d="M17.167 27.167V12.833L24.333 20Z"/></svg>
      </div>
      <div v-if="isClosed(subcategory.id)" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 2 40 40"><path d="m20 24.333-7.167-7.166h14.334Z"/></svg>
      </div>
      {{ subcategory.title }}
    </h4>
    <div class="subcategory-btns" v-if="settings.edit">
      <button class="category-btn" @click="showAddBookmarkForm=!showAddBookmarkForm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 40 40" height="20" width="20"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
      </button>
      <button class="category-btn" @click="showEditCategoryForm=!showEditCategoryForm">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.583 15.667h.896l8.083-8.084-.895-.916-8.084 8.083Zm10.771-8.625-2.125-2.167.833-.833q.271-.271.615-.271t.635.271l.896.916q.25.25.23.636-.021.385-.271.635Zm-.542.541-8.958 8.938H3.729v-2.146l8.938-8.917Zm-1.687-.458-.458-.458.895.916Z"/></svg>
      </button>
      <button class="category-btn" @click="store.deleteNode(subcategory.id)">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.042 16.042q-.459 0-.782-.323-.322-.323-.322-.802V5.542h-.98v-.604h3.063v-.792h3.958v.792h3.083v.604h-.979v9.375q0 .479-.323.802-.322.323-.802.323Zm6.437-10.5H6.542v9.375q0 .229.146.375.145.146.354.146h5.916q.188 0 .354-.157.167-.156.167-.364Zm-4.75 8.416h.604V7.021h-.604Zm1.938 0h.604V7.021h-.604ZM6.542 5.542v9.896-.521Z"/></svg>
      </button>
        <button class="category-btn" v-if="isHidden(subcategory as Category)" @click="hideCategory(subcategory as Category)">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M623.922 617.922 575 569q4-40.693-24.346-66.846Q522.307 476 487 480l-48.922-48.922q9.538-3.077 20.269-4.615 10.73-1.539 21.653-1.539 63.076 0 107.076 44 44 44 44 107.076 0 10.923-1.539 22.038-1.538 11.115-5.615 19.884Zm132.231 131.462L718 712q36-28 65.5-61.5T833 576q-49-101-144.5-158.5T480 360q-26 0-51 3t-49 10l-42.614-42.614q34.923-13.077 70.961-17.731 36.038-4.654 71.653-4.654 132.615 0 246.114 71.538Q839.614 451.078 890.46 576q-21.231 51.615-55.423 94.076-34.192 42.461-78.884 79.308Zm10.308 187.383L642.616 812.152q-33.769 14.385-75.192 23.116Q526 843.999 480 843.999q-132.999 0-246.114-71.538Q120.771 700.922 69.54 576q23.154-57 62.231-104.385 39.077-47.384 88.231-83.076l-100.769-100 37.153-37.153 647.228 648.228-37.153 37.153ZM257.155 426.691q-37.692 27.231-73.654 65.155Q147.539 529.769 127 576q49 101 144.5 158.5T480 792q33.308 0 66.386-5.616 33.077-5.615 56.923-13.538l-59.616-58.847q-13.231 6.153-30.693 9.615-17.461 3.462-33 3.462-63.076 0-107.076-44-44-44-44-107.076 0-15.154 4.462-32.423 4.462-17.27 8.615-31.27l-84.846-85.616ZM528 528Zm-76.768 86.769Z"/></svg>
        </button>
    </div>
  </div>
  
  <BookmarkForm v-if="showAddBookmarkForm" :categoryId="subcategory.id" @close-form="closeAddBookmarkForm"/>
  <CategoryEditForm v-if="showEditCategoryForm" :category="subcategory" @close-form="closeEditCategoryForm"/>

  <Draggable
    :data-id="subcategory.id"
    :empty-insert-threshold="20"
    class="subcat-items"
    :list="subcategory.children" 
    group="bookmarks"
    item-key="id"
    @end="onEnd"
    :setData="modifyDragItem"
    :disabled="!settings.edit">
    <template #item="{element}">
      <div :data-id="element.id" :class=" element.children ? 'subcatbody' : 'bookmarkbody' " v-if="isClosed(subcategory.id)">
        <BookmarkBody v-if="!element.children" :bookmark="element" />
        <SubCategory v-if="element.children" :subcategory="element" />
      </div>
    </template>
  </Draggable>
</template>

<style scoped>
.subcategory-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}

.subcategory-title {
  display: flex;
  flex-direction: row;
  margin-bottom: var(--bkmrk-margin);
}

.subcategory-btns {
  display: none;
  flex-direction: row;
  gap: 4px;
}

.subcategory-wrapper:hover .subcategory-btns {
  display: flex;
}

.subcategory-title {
  text-decoration: none;
  overflow:hidden;
  white-space: nowrap; 
  text-align: start;
  width: calc(var(--column-width) - 30px);
  -webkit-mask-image: linear-gradient(90deg, var(--text) 80%, transparent);
}

.subcat-items {
  padding-left: 1rem;
  margin-top: -.5rem;
}

.icon svg {
  fill: var(--text);
}

ul {
  padding-left: 21px;
}

.sortable-ghost {
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--background);
  height: calc(var(--text-size) + 10px);
  padding: 4px 10px;
  width: 280px;
}
.sortable-chosen {
  opacity: 0.8;
}
</style>