<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Draggable from "vuedraggable";
import { store } from "../store";
import { settings } from "../settings";
import { onDragEnd, modifyDragItem } from "../utils";
import CategoryForm from "./CategoryForm.vue";
import CategoryCard from "./CategoryCard.vue";
import ToolsPanel from "./ToolsPanel.vue";
import BookmarkBody from "./BookmarkBody.vue";

const showCategoryForm: Ref<boolean> = ref(false);
const closeCategoryForm = () => showCategoryForm.value = false;
</script>

<template>
  <ToolsPanel />
  <div class="categories-wrapper">
    <Draggable
      v-for="(column, index) in store.data.columns"
      data-id="2"
      :data-column="index" 
      :key="index"
      :empty-insert-threshold="10"
      class="categories-column"
      :list="column" 
      group="bookmarks"
      item-key="id"
      @end="onDragEnd"
      :setData="modifyDragItem"
      :disabled="!settings.edit"
      >
      <template #item="{element}">
        <div :class="element.children ? 'category' : 'rootbookmark'" 
        :data-id="element.id">
          <CategoryCard v-if="element.children" :category="element" />
          <div class="bookmarkbody">
            <BookmarkBody v-if="!element.children" :bookmark="element"/>
          </div>
        </div>
      </template>
    </Draggable>
  </div>
  <div class="new-category" v-if="settings.edit">
    <CategoryForm v-if="showCategoryForm" @close-form="closeCategoryForm"/>
    <button v-if="!showCategoryForm" class="new-category-btn" @click="showCategoryForm = !showCategoryForm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 3 40 40" height="20" width="20"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
    </button>
  </div>
</template>


<style scoped>
.sortable-ghost {
  overflow: hidden;
  height: calc(var(--title-size) + 30px);
  width: 290px;
}
.sortable-chosen {
  opacity: 0.8;
}
</style>