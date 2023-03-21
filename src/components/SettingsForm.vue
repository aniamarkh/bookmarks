<script setup lang="ts">
import Slider from '@vueform/slider'
import "@vueform/slider/themes/default.css";
import { settings, fontSizes, fontOptions, themes, columnsCount } from "../settings";
import { store } from "../store";

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const wrapper = document.querySelector(".categories-wrapper");
if (wrapper) {
  wrapper.addEventListener("click", sendCloseFormEvent);
}
</script>

<template>
  <div class="settings-form" :style="store.hidden.length === 0 ? 'right: 40px' : 'right: 80px'">
    <div class="wrapper">
      <button class="close-btn" @click="sendCloseFormEvent">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
      </button>
      <h4>Color theme:</h4>
      <div class="theme-btns">
        <button class="theme-btn btn-light" @click="settings.setTheme(themes.light)"></button>
        <button class="theme-btn btn-dark" @click="settings.setTheme(themes.dark)"></button>
        <button class="theme-btn btn-pink" @click="settings.setTheme(themes.pink)"></button>
        <button class="theme-btn btn-blue" @click="settings.setTheme(themes.blue)"></button>
        <button class="theme-btn btn-coffee" @click="settings.setTheme(themes.coffee)"></button>
      </div>
      <div class="font-size">
        <h4>Text size:</h4>
        <button v-for="(size, index) in fontSizes" :key="index" 
          :style="{ fontSize: size.mainSize + 'px' }"
          class="btn"
          @click="settings.setFontSize(size)">
          {{ size.title }}
        </button>
      </div>
      <div class="font-select">
        <h4>Font Family:</h4>
        <select name="FontFamily" v-model="settings.styles.fontFamily" @change="settings.setFont">
          <option v-for="(option, index) in fontOptions" :key="index" :value="option.css" :style="{'font-family': option.css}">
            {{ option.title }}
          </option>
        </select>
      </div>
      <div class="columns-count">
        <h4>Columns count:</h4>
        <Slider v-model="columnsCount" class="slider"
          :min="1"
          :max="5"
          :step="1"
          :default="columnsCount"
          @update="settings.setColumnsCount()"
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
    top: 5px;
    right: 80px;
    background-color: var(--cards);
    width: auto;
    height: auto;
    border-radius: 15px;
    box-shadow: 0px 0px 17px -7px rgba(0,0,0,0.4);
    padding: 10px;
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

  .font-size {
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

  .font-select, .cards-align, .cards-width, .columns-count {
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

  .align-btn svg {
    fill: var(--text);
  }

  .slider {
    width: 100px;
    --slider-handle-width: 16px;
    --slider-bg: #c2c2c2;
    --slider-connect-bg: var(--background);
    --slider-handle-ring-color: var(--background);
    --slider-tooltip-py: 0px;
    --slider-tooltip-bg: #c2c2c2;
  }
</style>