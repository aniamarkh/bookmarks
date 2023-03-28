import { createApp } from "vue";
import App from "./App.vue";
import "./style.css"
import { store } from "./store";
import { chromeHandle } from "./chromeHandle";

createApp(App).mount("#app");

store.loadFromLocalStore();
if (!localStorage.getItem("data")) {
  chromeHandle.importChromeBookmarks();
}