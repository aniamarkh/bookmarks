<script setup lang="ts">
import { ref, toRef } from "vue";
import type { Bookmark } from "../types";
import { store } from "../store";
import { settings } from "../settings";
import { chromeHandle } from "../chromeHandle";

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
  if (bookmarkProp.title === "") {
    store.updateBookmarkTitle(bookmarkProp.url, bookmarkProp.id);
  }
  chromeHandle.editBookmarkInChrome(
    bookmarkProp.id,
    bookmarkProp.title,
    bookmarkProp.url
  );
  showEditForm.value = false;
};

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
};
</script>

<template>
  <div class="bookmark-wrapper" v-if="!showEditForm">
    <div class="bookmark-title">
      <img class="favicon" v-bind:src="bookmark.favicon" />
      <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
    </div>
    <div v-if="settings.edit" class="bookmark-btns">
      <button class="bookmark-btn" @click="showEditForm = !showEditForm">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
          <path
            d="M4.583 15.667h.896l8.083-8.084-.895-.916-8.084 8.083Zm10.771-8.625-2.125-2.167.833-.833q.271-.271.615-.271t.635.271l.896.916q.25.25.23.636-.021.385-.271.635Zm-.542.541-8.958 8.938H3.729v-2.146l8.938-8.917Zm-1.687-.458-.458-.458.895.916Z"
          />
        </svg>
      </button>
      <button
        class="bookmark-btn"
        @click="chromeHandle.deleteNodeFromChrome(bookmark.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
          <path
            d="M7.042 16.042q-.459 0-.782-.323-.322-.323-.322-.802V5.542h-.98v-.604h3.063v-.792h3.958v.792h3.083v.604h-.979v9.375q0 .479-.323.802-.322.323-.802.323Zm6.437-10.5H6.542v9.375q0 .229.146.375.145.146.354.146h5.916q.188 0 .354-.157.167-.156.167-.364Zm-4.75 8.416h.604V7.021h-.604Zm1.938 0h.604V7.021h-.604ZM6.542 5.542v9.896-.521Z"
          />
        </svg>
      </button>
    </div>
  </div>
  <form
    class="bookmark-edit_form"
    v-if="showEditForm"
    @submit.prevent="onSubmit"
  >
    <input
      v-focus
      type="text"
      placeholder="new title"
      v-model="bookmarkProp.title"
    />
    <input type="url" placeholder="new url" v-model="bookmarkProp.url" />
    <div class="bookmark-form--btns">
      <button
        class="submit-btn"
        :disabled="isInvalidInputs()"
        @click.prevent="onSubmit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 50 50"
          height="20"
          width="20"
        >
          <path
            d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"
          />
        </svg>
      </button>
      <button class="cancel-btn" @click="!showEditForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 50 50"
          height="20"
          width="20"
        >
          <path
            d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<style scoped>
.favicon {
  margin-right: 5px;
  height: 18px;
}

.submit-btn,
.cancel-btn {
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

.submit-btn svg,
.cancel-btn svg {
  fill: var(--text);
  transition: all 0.2s;
}

.submit-btn:hover,
.cancel-btn:hover {
  background-color: var(--background);
}

.submit-btn:hover svg,
.cancel-btn:hover svg {
  transform: scale(1.2);
}

.submit-btn:disabled {
  pointer-events: none;
  opacity: 0;
}

input {
  width: auto;
  min-height: 30px;
  background-color: var(--background);
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
  gap: 0.5rem;
  width: auto;
  justify-content: flex-end;
}
</style>
