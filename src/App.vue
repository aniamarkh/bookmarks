<script setup lang="ts">
import { onBeforeMount } from "vue";
import { store } from "./store";
import { settings } from "./settings";

import MainApp from "./components/MainApp.vue";
const onLoad = () => {
  settings.onLoad();
  if (!localStorage.getItem("tree")) {
    store.importChromeBookmarks().then(() => {
      localStorage.setItem("tree", JSON.stringify(store.chromeTreeNode));
    }).then(() => {
      if (Array.isArray(store.data) && store.data.length === 1 && Array.isArray(store.data[0]) && store.data[0].length === 0) {
        store.arrangeCards(store.chromeTreeNode.children);
      }
    });
  }
}

onBeforeMount(onLoad);

</script>

<template>
  <main>
    <MainApp />
  </main>
</template>