<script setup lang="ts">
import { onBeforeMount } from "vue";
import { settings } from "./core/settings";

import MainApp from "./components/MainApp.vue";
onBeforeMount(settings.onLoad);
</script>

<template>
  <main>
    <MainApp />
  </main>
</template>
