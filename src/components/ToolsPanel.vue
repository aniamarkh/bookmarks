<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import SettingsForm from "./SettingsForm.vue";
import HiddenCatForm from "./HiddenForm.vue";
import { settings } from "../settings";
import { store } from "../store";

const showSettingsForm: Ref<boolean> = ref(false);
const showHiddenCategories: Ref<boolean> = ref(false);

const closeSettingsForm = () => showSettingsForm.value = false;
const closeHiddenForm = () => showHiddenCategories.value = false;

const toggleEditMode = () => {
  settings.edit = !settings.edit;
  settings.saveToLocalSettings();
};
</script>

<template>
  <div class="top-panel">
    <Transition>
      <SettingsForm @close-form="closeSettingsForm" v-if="showSettingsForm"/>
    </Transition>
    <Transition>
      <HiddenCatForm @close-form="closeHiddenForm" v-if="showHiddenCategories"/>
    </Transition>
    <div class="top-panel--settings" @click="showSettingsForm = !showSettingsForm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="30"><path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/></svg>
    </div>
    <div class="top-panel--lock" @click="toggleEditMode">
      <svg v-if="settings.edit" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M11 16.3h19.5v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6h-3q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44H11q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3ZM11 41h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-13 7V19.3 41Z"/></svg>
      <svg v-if="!settings.edit" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M11 44q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3h3.5v-4.8q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44Zm0-3h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-6.5-17.7h13v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6ZM11 41V19.3 41Z"/></svg>
    </div>
    <div class="top-panel--hidden" v-if="store.hidden.length" @click="showHiddenCategories = !showHiddenCategories">
      <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M480.169 714.204q65.754 0 111.894-46.31 46.141-46.309 46.141-112.063t-46.31-111.894q-46.309-46.141-112.063-46.141t-111.894 46.31q-46.141 46.309-46.141 112.063t46.31 111.894q46.309 46.141 112.063 46.141Zm-.371-48.307q-45.875 0-77.785-32.112-31.91-32.112-31.91-77.987 0-45.875 32.112-77.785 32.112-31.91 77.987-31.91 45.875 0 77.785 32.112 31.91 32.112 31.91 77.987 0 45.875-32.112 77.785-32.112 31.91-77.987 31.91Zm.257 170.102q-137.721 0-250.362-76.731Q117.053 682.538 61.54 556q55.513-126.538 168.098-203.268 112.586-76.731 250.307-76.731t250.362 76.731Q842.947 429.462 898.46 556q-55.513 126.538-168.098 203.268-112.586 76.731-250.307 76.731ZM480 556Zm-.112 229.744q117.163 0 215.048-62.347Q792.821 661.051 844.308 556q-51.487-105.051-149.26-167.397-97.772-62.347-214.936-62.347-117.163 0-215.048 62.347Q167.179 450.949 115.282 556q51.897 105.051 149.67 167.397 97.772 62.347 214.936 62.347Z"/></svg>
    </div>
  </div>
</template>

<style scoped>
.top-panel {
  position: absolute;
  right: 10px;
  z-index: 2;
  width: 100vw;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}

svg {
  fill: var(--medium);
  cursor: pointer;
  margin: 0 5px;
  transition: all .2s;
}

svg:hover {
  fill: var(--text);
  transform: scale(1.1);
}
</style>