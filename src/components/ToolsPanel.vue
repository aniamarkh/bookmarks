<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import SettingsForm from "./SettingsForm.vue";
import { settings } from "../settings";

const isSync: Ref<boolean> = ref(false);
const showSettingsForm: Ref<boolean> = ref(false);

const closeForm = () => showSettingsForm.value = false;

const toggleEditMode = () => {
  settings.edit = !settings.edit;
  settings.saveToLocalSettings();
}

</script>

<template>
  <div class="top-panel">
    <Transition>
      <SettingsForm @close-form="closeForm" v-if="showSettingsForm"/>
    </Transition>
    <div class="top-panel--settings" @click="showSettingsForm = !showSettingsForm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="30"><path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/></svg>
    </div>
    <div class="top-panel--lock" @click="toggleEditMode">
      <svg v-if="settings.edit" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M11 16.3h19.5v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6h-3q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44H11q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3ZM11 41h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-13 7V19.3 41Z"/></svg>
      <svg v-if="!settings.edit" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M11 44q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3h3.5v-4.8q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44Zm0-3h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-6.5-17.7h13v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6ZM11 41V19.3 41Z"/></svg>
    </div>
    <div class="top-panel--sync">
      <svg v-if="!isSync" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="m40.45 45.2-7.8-7.8q-1 .65-1.95 1.075-.95.425-2 .775V36.1q.45-.15.9-.375t.9-.475l-17.7-17.7q-.95 1.55-1.375 3.275Q11 22.55 11 24.15q0 2.9 1.075 5.275Q13.15 31.8 15.35 33.65l1.5 1.05v-6.2h3V40H8.35v-3h6.5l-.75-.6q-3.4-2.7-4.775-5.75Q7.95 27.6 8 24.15q.05-2.7.75-4.85.7-2.15 1.9-3.9l-7.8-7.8L4.9 5.55l37.6 37.6Zm-3.6-11.8-2.1-2.1q1.05-1.65 1.65-3.5.6-1.85.6-3.95 0-2.3-1.125-4.775Q34.75 16.6 32.75 14.6l-1.45-1.3v6.2h-3V8h11.5v3h-6.55l.75.7q3.2 3 4.6 6.2 1.4 3.2 1.4 5.95 0 2.7-.775 5.05-.775 2.35-2.375 4.5ZM16.7 13.25l-2.05-2.05q1.1-.85 2.275-1.425Q18.1 9.2 19.35 8.8v3.1q-.65.25-1.325.6-.675.35-1.325.75Z"/></svg>
      <svg v-if="isSync" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="M8.35 40v-3h6.5l-.75-.6q-3.2-2.55-4.65-5.55-1.45-3-1.45-6.7 0-5.3 3.125-9.525Q14.25 10.4 19.35 8.8v3.1q-3.75 1.45-6.05 4.825T11 24.15q0 3.15 1.175 5.475 1.175 2.325 3.175 4.025l1.5 1.05v-6.2h3V40Zm20.35-.75V36.1q3.8-1.45 6.05-4.825T37 23.85q0-2.4-1.175-4.875T32.75 14.6l-1.45-1.3v6.2h-3V8h11.5v3h-6.55l.75.7q3 2.8 4.5 6t1.5 6.15q0 5.3-3.1 9.55-3.1 4.25-8.2 5.85Z"/></svg>
    </div>
  </div>
</template>

<style scoped>
.top-panel {
  position: absolute;
  right: 10px;
  z-index: 2;
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
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