<script setup lang="ts">
import { store } from "../store";
import { settings } from "../settings";
import Draggable from "vuedraggable";
import { modifyDragItem, onEnd } from "../utils";
import SubCategory from "./SubcategoryBody.vue";

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const wrapper = document.querySelector(".categories-wrapper");
if (wrapper) {
  wrapper.addEventListener("click", sendCloseFormEvent);
}

const isEmptyList = (evt: any) => {
  if (store.hidden.length === 0) {
    sendCloseFormEvent();
  }
  onEnd(evt);
};
</script>

<template>
  <div class="hidden-form">
    <div class="wrapper">
      <button class="close-btn" @click="sendCloseFormEvent">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
      </button>
      <h3>Hidden categories:</h3>
    </div>
    <Draggable
      class="bookmarks-list"
      :empty-insert-threshold="50"
      :list="store.hidden" 
      group="bookmarks"
      item-key="id"
      @end="isEmptyList"
      :setData="modifyDragItem"
      :disabled="!settings.edit">
      <template #item="{element}">
        <div class="subcatbody" :data-id="element.id">
          <SubCategory :subcategory="element" />
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style scoped>

  .hidden-form {
    position: absolute;
    z-index: 1;
    top: 5px;
    right: 0px;
    background-color: var(--cards);
    width: 320px;
    height: auto;
    border-radius: 15px;
    box-shadow: 0px 0px 17px -7px rgba(0,0,0,0.4);
    padding: 10px;
  }

  .close-btn {
    position: absolute;
    z-index: 1;
    top: 5px;
    right: 5px;
    background-color: inherit;
    color: inherit;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    outline: inherit;
    transition: all 0.2s;
  }

  .close-btn svg {
    fill: var(--medium);
  }

  .close-btn:hover {
    transform: scale(1.1);
  }

  .close-btn:hover svg {
    fill: var(--text);
  }

  h3 {
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: var(--title-size);
  text-transform: none;
  margin-left: 5px;
  overflow:hidden;
  white-space: nowrap;
  width: calc(var(--column-width) - 20px);
  -webkit-mask-image: linear-gradient(90deg, var(--text) 85%, transparent);
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
