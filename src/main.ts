import { createApp } from "vue";
import App from "./App.vue";
import "./style.css"

createApp(App).mount("#app");

const scrollable = document.querySelector(".categories-wrapper")
if (scrollable) {
  window.addEventListener("wheel", event => {
    if (event.deltaY > 0) {
      console.log("scroll");
      scrollable.scrollLeft += 50;
    } else {
      scrollable.scrollLeft -= 50;
      console.log("scroll");

    }
  });
}