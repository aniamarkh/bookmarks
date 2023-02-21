<script setup lang="ts">
import Slider from '@vueform/slider'
import "@vueform/slider/themes/default.css";
import type Theme from "../types";
import { ref } from "vue";
import type { Ref } from "vue";

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const themeColors = {
  light: ["#f0f0f0", "#181818", "#8d8d8d", "#f7f7f7"],
  dark: ["#202020", "#e0e0e0", "#8d8d8d", "#303030"],
  pink: ["#ffc6c7", "#33272a", "#fff", "#fff2f2"],
  blue: ["#e3f6f5", "#272343", "#bae8e8", "#fffffe"],
  coffee: ["#eaddcf", "#020826", "#8c7851", "#f9f4ef"],
};
const cssVarColors = ["--background", "--text", "--medium", "--cards"];
const changeTheme = (theme: Theme) => {
  cssVarColors.forEach((el, index) => {
    document.documentElement.style.setProperty(el, themeColors[theme][index]);
  });
};

const changeFontSize = (fontSize: number) => {
  document.documentElement.style.setProperty("--text-size", `${fontSize + "px"}`);
  document.documentElement.style.setProperty("--title-size", `${(fontSize + 6) + "px"}`);
};

const alignCards = (align: "flex-start" | "center") => {
  document.documentElement.style.setProperty("--align", align);
};

const columnWidth: Ref<number> = ref(320);
const changeColumnWidth = () => {
  console.log(`${columnWidth.value + "px"}`);
  document.documentElement.style.setProperty("--column-width", `${columnWidth.value + "px"}` );
}
</script>

<template>
  <div class="settings-form">
    <div class="wrapper">
      <button class="close-btn" @click="sendCloseFormEvent">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
      </button>
      <h4>Color theme:</h4>
      <div class="theme-btns">
        <button class="theme-btn btn-dark" @click="changeTheme('dark')"></button>
        <button class="theme-btn btn-light" @click="changeTheme('light')"></button>
        <button class="theme-btn btn-pink" @click="changeTheme('pink')"></button>
        <button class="theme-btn btn-blue" @click="changeTheme('blue')"></button>
        <button class="theme-btn btn-coffee" @click="changeTheme('coffee')"></button>
      </div>
      <div class="text-size">
        <h4>Text size:</h4>
        <button class="btn" style="font-size: 16px" @click="changeFontSize(16)">S</button>
        <button class="btn" style="font-size: 18px" @click="changeFontSize(18)">M</button>
        <button class="btn" style="font-size: 22px" @click="changeFontSize(22)">L</button>
      </div>
      <div class="font-select">
        <h4>Font Family:</h4>
        <select>
          <option value="'Roboto Slab', serif" style="font-family: 'Roboto Slab', serif">Roboto Slab</option>
          <option value="'Montserrat', sans-serif" style="font-family: 'Montserrat', sans-serif">Montserrat</option>
          <option value="'Roboto Condensed', sans-serif" style="'Roboto Condensed', sans-serif">Roboto Condensed</option>
          <option value="'Playfair Display', serif" style="'Playfair Display', serif">Playfair Display</option>
        </select>
      </div>
      <div class="cards-align">
        <h4>Card align:</h4>
        <button class="align-btn btn" @click="alignCards('flex-start')">
          <img src="./assets/left.svg" />
        </button>
        <button class="align-btn btn" @click="alignCards('center')">
          <img src="./assets/center.svg" />
        </button>
      </div>
      <div class="column-width">
        <h4>Categories width:</h4>
        <Slider v-model="columnWidth" class="slider"
          :min="300"
          :max="600"
          :step="10"
          :default="columnWidth"
          @update="changeColumnWidth()"
          tooltip-position="bottom"
          />
      </div>
    </div>
  </div>
</template>

<style scoped>

  .settings-form {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 90px;
    background-color: var(--cards);
    width: auto;
    height: auto;
    border-radius: 15px;
    box-shadow: 0px 0px 17px -7px rgba(0,0,0,0.4);
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

  .wrapper {
    margin: 20px 20px;
  }

  h4 {
    margin: 10px 10px 10px 0;
  }

  .theme-btns {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .theme-btn {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    cursor: pointer;
    background-color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0px 0px 12px -7px rgba(0,0,0,0.4);
    transition: all .2s;
  }

  .theme-btn:hover {
    transform: scale(1.1);
  }

  .btn-dark {
    background: linear-gradient(to left, #202020 50%, #181818 50%);
  }

  .btn-light {
    background: linear-gradient(to left, #f0f0f0 50%, #f7f7f7 50%);
  }

  .btn-pink {
    background: linear-gradient(to left, #ffc6c7 50%, #faeee7 50%);
  }

  .btn-blue {
    background: linear-gradient(to left, #bae8e8 50%, #e3f6f5 50%);
  }

  .btn-coffee {
    background: linear-gradient(to left, #8c7851 50%, #eaddcf 50%);
  }

  .text-size {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }


  .btn {
    width: 40px;
    height: 30px;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
    background-color: var(--background);
    border: none;
    cursor: pointer;
    transition: all .2s;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .font-select, .cards-align, .column-width {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }

  select {
    width: 140px;
    height: 30px;
    font: inherit;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
    background-color: var(--background);
    border: none;
  }

  .align-btn {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider {
    width: 100px;
    --slider-handle-width: 16px;
    --slider-bg: #c2c2c2;
    --slider-connect-bg: var(--medium);
    --slider-tooltip-bg: var(--medium);
    --slider-handle-ring-color: var(--medium);
    --slider-tooltip-py: 0px;
  }




</style>