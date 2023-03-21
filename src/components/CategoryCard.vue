<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Draggable from "vuedraggable";
import Form from "./BookmarkForm.vue";
import BookmarkBody from "./BookmarkBody.vue";
import CategoryTitle from "./CategoryTitle.vue";
import SubCategory from "./SubcategoryBody.vue";
import { store } from "../store";
import { settings } from "../settings";

const props = defineProps({
  category:  { type: Object, required: true },
});
const showBookmarkForm: Ref<boolean> = ref(false);
// https://stackoverflow.com/questions/73105353/change-ref-of-the-parent-from-child-component-using-vue-3
const closeForm = () => showBookmarkForm.value = false;

const validateDrop = (evt: any) => {
  const draggedElement = evt.dragged;
  if (draggedElement.classList.contains("bookmarkbody")) {
    const targetNode = evt.to;
    if (targetNode.classList.contains("categories-column")) {
      return false;
    }
  }
  return true;
};

const modifyDragItem = (dataTransfer: DataTransfer) => {
  dataTransfer.setDragImage(document.createElement('div'), 0, 0);
};

const findNode = (id: string) => {
  const node = store.findNodeById(store.chromeTreeNode, id);
  return node;
};

const checkIfChildren = (id: string): boolean => {
  const node = findNode(id);
  if (node) {
    if ("children" in node) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
</script>

<template>
  <CategoryTitle :category="category"/>
  <Draggable
    class="bookmarks-list"
    :empty-insert-threshold="50"
    :list="category.children" 
    group="bookmarks"
    item-key="id"
    :move="validateDrop"
    @end="store.saveToLocalStore()"
    :setData="modifyDragItem"
    :disabled="!settings.edit">
    <template #item="{element}">
      <div :class=" checkIfChildren(element.id) ? 'subcatbody' : 'bookmarkbody' ">
        <BookmarkBody v-if="!checkIfChildren(element.id)" :bookmarkId="element.id" />
        <SubCategory v-if="checkIfChildren(element.id)" :subcategory="element" />
      </div>
    </template>
  </Draggable>

  <button class="add-bookmark-btn" @click="showBookmarkForm = !showBookmarkForm" v-if="!showBookmarkForm && settings.edit">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 5 40 40" height="20" width="20"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
  </button>
  <Form v-if="showBookmarkForm" :category="category" @close-form="closeForm"/>

</template>

<style scoped>
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