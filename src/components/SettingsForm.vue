<script setup lang="ts">
import Slider from '@vueform/slider'
import "@vueform/slider/themes/default.css";

const emit = defineEmits(["close-form"]);
const sendCloseFormEvent = () => emit("close-form");

const value = 500;
</script>

<template>
  <div class="settings-form">
    <div class="wrapper">
      <button class="close-btn" @click="sendCloseFormEvent">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 50 50"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
      </button>
      <h4>Color theme:</h4>
      <div class="theme-btns">
        <button class="theme-btn btn-dark"></button>
        <button class="theme-btn btn-light"></button>
        <button class="theme-btn btn-pink"></button>
        <button class="theme-btn btn-blue"></button>
        <button class="theme-btn btn-green"></button>
      </div>
      <div class="text-size">
        <h4>Text size:</h4>
        <button class="btn" style="font-size: 16px">S</button>
        <button class="btn" style="font-size: 18px">M</button>
        <button class="btn" style="font-size: 22px">L</button>
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
        <button class="align-btn btn">
          <img src="./assets/left.svg" />
        </button>
        <button class="align-btn btn">
          <img src="./assets/center.svg" />
        </button>
      </div>
      <div class="column-width">
        <h4>Categories width:</h4>
        <Slider v-model="value" class="slider"
          :min="300"
          :max="600"
          :step="10"
          :tooltips="false"
          :default="value"
          show-tooltip="drag" />
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
    width: 300px;
    height: 290px;
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
    background-color: #22223b;
  }

  .btn-light {
    background-color: #fffffe;
  }

  .btn-pink {
    background: linear-gradient(to left, #ff8ba7 50%, #fec7d7 50%);
  }

  .btn-blue {
    background: linear-gradient(to left, #ffd803 50%, #bae8e8 50%);
  }

  .btn-green {
    background: linear-gradient(to left, #078080 50%, #f45d48 50%);
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
--slider-bg: var(--background);
--slider-connect-bg: var(--medium);
  --slider-tooltip-bg: var(--medium);
  --slider-handle-ring-color: var(--medium);
--slider-tooltip-py: 0px;

  }




</style>