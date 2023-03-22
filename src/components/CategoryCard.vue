<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Form from "./BookmarkForm.vue";
import BookmarkBody from "./BookmarkBody.vue";
import CategoryTitle from "./CategoryTitle.vue";
import SubCategory from "./SubcategoryBody.vue";
import Draggable from "vuedraggable";
import { settings } from "../settings";
import { onEnd, validateDrop, modifyDragItem } from "../utils";

const props = defineProps({
  category:  { type: Object, required: true },
});
const showBookmarkForm: Ref<boolean> = ref(false);
const closeForm = () => showBookmarkForm.value = false;

</script>

<template>
  <CategoryTitle :category="category"/>
  <Draggable
    :data-id="category.id"
    class="bookmarks-list"
    :empty-insert-threshold="50"
    :list="category.children" 
    group="bookmarks"
    item-key="id"
    :move="validateDrop"
    @end="onEnd"
    :setData="modifyDragItem"
    :disabled="!settings.edit">
    <template #item="{element}" >
      <div :data-id="element.id" :class=" element.children ? 'subcatbody' : 'bookmarkbody' ">
        <BookmarkBody v-if="!element.children" :bookmark="element" />
        <SubCategory v-if="element.children" :subcategory="element" />
      </div>
    </template>
  </Draggable>

  <button class="add-bookmark-btn" @click="showBookmarkForm = !showBookmarkForm" v-if="!showBookmarkForm && settings.edit">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 5 40 40" height="20" width="20"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
  </button>
  <Form v-if="showBookmarkForm" :categoryId="category.id" @close-form="closeForm"/>

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