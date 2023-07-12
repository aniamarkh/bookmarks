<script setup lang="ts">
const emit = defineEmits(["hide-window"]);
</script>

<template>
  <div class="start-window__wrapper">
    <h4 class="start-window__title">Welcome to Kartotek!</h4>
    <p>Here's a quick guide on what you can do with this extension:</p>
    <br />
    <p>
      1. With this manager you can add, move, edit, and delete boomarks and
      categories in Chrome's 'Other Bookmarks' folder.
      <b>Be careful when deleting, all changes fully sync with Chrome!</b>
    </p>
    <p>2. Chrome's sync will only work while a new tab window open 😔</p>
    <p class="p--row">
      3. Click
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="30">
        <path
          d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"
        />
      </svg>
      to change color themes, font families, column counts and width.
    </p>
    <p class="p--row">
      4. Click
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 50 50"
      >
        <path
          d="M11 16.3h19.5v-4.8q0-2.7-1.9-4.6Q26.7 5 24 5q-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6h-3q0-3.95 2.775-6.725Q20.05 2 24 2q3.95 0 6.725 2.775Q33.5 7.55 33.5 11.5v4.8H37q1.25 0 2.125.875T40 19.3V41q0 1.25-.875 2.125T37 44H11q-1.25 0-2.125-.875T8 41V19.3q0-1.25.875-2.125T11 16.3ZM11 41h26V19.3H11V41Zm13-7q1.6 0 2.725-1.1t1.125-2.65q0-1.5-1.125-2.725T24 26.3q-1.6 0-2.725 1.225T20.15 30.25q0 1.55 1.125 2.65Q22.4 34 24 34Zm-13 7V19.3 41Z"
        />
      </svg>
      to disable drag-and-drop if you prefer a fixed setup.
    </p>
    <p class="p--row">
      5. Want to hide some categories from a New Tab without deleting them?
      Click
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        viewBox="0 96 960 960"
        width="20"
      >
        <path
          d="M623.922 617.922 575 569q4-40.693-24.346-66.846Q522.307 476 487 480l-48.922-48.922q9.538-3.077 20.269-4.615 10.73-1.539 21.653-1.539 63.076 0 107.076 44 44 44 44 107.076 0 10.923-1.539 22.038-1.538 11.115-5.615 19.884Zm132.231 131.462L718 712q36-28 65.5-61.5T833 576q-49-101-144.5-158.5T480 360q-26 0-51 3t-49 10l-42.614-42.614q34.923-13.077 70.961-17.731 36.038-4.654 71.653-4.654 132.615 0 246.114 71.538Q839.614 451.078 890.46 576q-21.231 51.615-55.423 94.076-34.192 42.461-78.884 79.308Zm10.308 187.383L642.616 812.152q-33.769 14.385-75.192 23.116Q526 843.999 480 843.999q-132.999 0-246.114-71.538Q120.771 700.922 69.54 576q23.154-57 62.231-104.385 39.077-47.384 88.231-83.076l-100.769-100 37.153-37.153 647.228 648.228-37.153 37.153ZM257.155 426.691q-37.692 27.231-73.654 65.155Q147.539 529.769 127 576q49 101 144.5 158.5T480 792q33.308 0 66.386-5.616 33.077-5.615 56.923-13.538l-59.616-58.847q-13.231 6.153-30.693 9.615-17.461 3.462-33 3.462-63.076 0-107.076-44-44-44-44-107.076 0-15.154 4.462-32.423 4.462-17.27 8.615-31.27l-84.846-85.616ZM528 528Zm-76.768 86.769Z"
        />
      </svg>
      next to the category title.
    </p>
    <br />
    <p><b>Need help?</b> Contact me: aniamarkh@gmail.com 👋</p>
    <button @click="emit('hide-window')" class="start-window__button">
      Let's start!
    </button>
  </div>
</template>

<style scoped>
.start-window__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  color: text;
  background-color: var(--cards);
  padding: 30px;
  border-radius: 10px;
  margin-top: 20vh;
  box-shadow: 0px 0px 17px -7px rgba(0, 0, 0, 0.4);
  width: 45vw;
}

p {
  text-align: left;
}

.p--bold {
  font-weight: 600;
}

.start-window__title {
  font-size: 28px;
}

.start-window__button {
  cursor: pointer;
  background-color: inherit;
  min-width: 40px;
  min-height: 40px;
  color: inherit;
  border: none;
  background-color: var(--background);
  border-radius: 12px;
  padding: 0 0.8rem;
  margin-top: 20px;
  font: inherit;
  transition: all 0.2s;
  align-self: center;
}

.start-window__button:hover {
  transform: scale(1.05);
}
</style>
