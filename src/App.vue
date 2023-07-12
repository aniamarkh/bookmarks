<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { settings } from "./core/settings";
import MainApp from "./components/MainApp.vue";
import StartWindow from "./components/StartWindow.vue";
import ToolsPanel from "./components/ToolsPanel.vue";

const showStartWindow = ref(true);

onBeforeMount(() => {
  if (localStorage.getItem("data")) {
    showStartWindow.value = false;
  }
  settings.onLoad();
});

const hideStartWindow = () => (showStartWindow.value = false);
</script>

<template>
  <main>
    <ToolsPanel />
    <StartWindow @hide-window="hideStartWindow" v-if="showStartWindow" />
    <MainApp v-else-if="!showStartWindow" />
  </main>
</template>
