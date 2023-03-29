import { createApp } from "vue";
import App from "./App.vue";
import "./style.css"
import { store } from "./core/store";
import { chromeHandle } from "./core/chromeHandle";

createApp(App).mount("#app");

store.loadFromLocalStore();
if (!localStorage.getItem("data")) {
  chromeHandle.importChromeBookmarks();
}