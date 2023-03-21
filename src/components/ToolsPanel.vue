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
      <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="m623.743 619.384-38.153-38.153q17.256-61.59-28.475-104.09T454.769 450.41l-38.153-38.153q13.539-7.307 29.461-10.884Q462 397.796 480 397.796q66.179 0 112.191 46.013Q638.204 489.821 638.204 556q0 18-3.782 34.512-3.782 16.513-10.679 28.872Zm127.641 125.948-35.487-33.793q43.283-32.385 76.295-71.757Q825.205 600.41 844.308 556q-50-105.872-146.808-167.808-96.808-61.936-212.628-61.936-35.359 0-71.077 6.026-35.718 6.026-61.898 15.256l-38.768-39.178q34.949-14.666 80.102-23.512 45.154-8.847 89.333-8.847 136.563 0 249.896 76.59Q845.793 429.18 898.46 556q-23.718 56.179-60.602 103.794-36.885 47.615-86.474 85.538Zm50.718 221.64L640.257 806.767q-30.769 12.872-72.321 21.052-41.551 8.18-87.936 8.18-138.692 0-251.717-76.59Q115.258 682.82 61.54 556q21.744-52.59 58.513-100.372 36.77-47.782 83.795-85.936L85.233 250.923l35.383-35.794 715.383 715.383-33.897 36.46ZM238.565 405.076q-35.487 25.897-70.526 67.552Q133 514.282 115.282 556q50.41 105.872 148.372 167.808 97.961 61.936 220.141 61.936 33.924 0 67.232-5.359 33.308-5.36 50.257-12.591l-64.155-64.565q-10.487 4.975-26.795 7.975t-30.334 3q-65.769 0-111.986-45.807Q321.796 622.589 321.796 556q0-14.051 3-29.757 3-15.705 7.975-27.372l-94.206-93.795Zm296.076 129.257Zm-114.588 57.512Z"/></svg>
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