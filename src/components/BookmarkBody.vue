<script setup lang="ts">
import { ref, toRef } from "vue";
import type {Bookmark} from "../types";
import { store } from "../store";

const props = defineProps({
  bookmark: { type: Object as () => Bookmark, required: true },
});

const bookmarkProp: Bookmark = toRef(props, "bookmark").value;

const showEditForm = ref(false);

const isInvalidInputs = (): boolean => {
  const isEmpty: boolean = bookmarkProp.url.trim() === "";
  let invalidUrl: boolean;

  try {
    new URL(bookmarkProp.url);
    invalidUrl = false;
  } catch (err) {
    invalidUrl = true;
  }

  return isEmpty || invalidUrl;
};

const onSubmit = (): void => {
  let title: string;
  if (bookmarkProp.title === "") {
    store.updateBookmarkTitle(bookmarkProp.url, bookmarkProp.id);
  } else {
    title = bookmarkProp.title;
  }
  store.editBookmark(bookmarkProp.id, title, bookmarkProp.url);
  showEditForm.value = false;
}
</script>

<template>
  <div class="bookmark-wrapper" v-if="!showEditForm">
    <img class="favicon" v-bind:src="bookmark.favicon" />
    <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
    <button class="bookmark-btn" @click="showEditForm = !showEditForm">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.583 15.667h.896l8.083-8.084-.895-.916-8.084 8.083Zm10.771-8.625-2.125-2.167.833-.833q.271-.271.615-.271t.635.271l.896.916q.25.25.23.636-.021.385-.271.635Zm-.542.541-8.958 8.938H3.729v-2.146l8.938-8.917Zm-1.687-.458-.458-.458.895.916Z"/></svg>
    </button>
    <button class="bookmark-btn" @click="store.deleteNode(bookmark.id)">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.042 16.042q-.459 0-.782-.323-.322-.323-.322-.802V5.542h-.98v-.604h3.063v-.792h3.958v.792h3.083v.604h-.979v9.375q0 .479-.323.802-.322.323-.802.323Zm6.437-10.5H6.542v9.375q0 .229.146.375.145.146.354.146h5.916q.188 0 .354-.157.167-.156.167-.364Zm-4.75 8.416h.604V7.021h-.604Zm1.938 0h.604V7.021h-.604ZM6.542 5.542v9.896-.521Z"/></svg>
    </button>
  </div>
  <form class="bookmark-edit_form" v-if="showEditForm" @submit.prevent="onSubmit">
    <input type="text" placeholder="new title" v-model="bookmarkProp.title"/>
    <input type="url" placeholder="new url" v-model="bookmarkProp.url"/>
    <div class="bookmark-form--btns">
      <button class="submit-btn" :disabled="isInvalidInputs()" @click.prevent="onSubmit"></button>
      <button class="cancel-btn" @click="!showEditForm"></button>
    </div>
  </form>
</template>

<style scoped> 
.favicon {
  width: 18px;
  margin-right: 5px;
}

.submit-btn, .cancel-btn {
  cursor: pointer;
  background-color: inherit;
  min-width: 40px;
  min-height: 30px;
  color: inherit;
	border: none;
  border-radius: 12px;
  padding: 0 0.8rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  transition: all 0.2s;
  align-items: center;
}

.cancel-btn {
  background-image: url("./assets/close.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.submit-btn {
  background-image: url("./assets/done.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.submit-btn:hover, .cancel-btn:hover {
    background-color: var(--light-gray);
}

.submit-btn:disabled {
  pointer-events: none;
  opacity: 0;
}

input {
  width: auto;
  min-height: 30px;
  background-color: var(--light-gray);
	color: inherit;
	border: none;
  border-radius: 10px;
  padding: 0.2rem;
	font: inherit;
	outline: inherit;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
}

.bookmark-form--btns {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  width: auto;
  justify-content: flex-end;
}
</style>