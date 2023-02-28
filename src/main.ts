import { createApp } from "vue";
import App from "./App.vue";
import "./style.css"
import { cardsWidth } from "./settings";

createApp(App).mount("#app");

const scrollable: HTMLElement | null = document.querySelector(".categories-wrapper");

const scroll = (event: WheelEvent) => {
  if (event.deltaY > 0) {
    window.scrollBy({ left: (cardsWidth.value + 20), behavior: 'smooth' });
  } else {
    window.scrollBy({ left: -(cardsWidth.value + 20), behavior: 'smooth' });
  }
}

window.addEventListener("wheel", scroll);

// cards.forEach(card => {
//   card.addEventListener("mouseenter", (e) => {
//     if (card.scrollHeight > card.clientHeight) {
//       console.log("shoul remove");
//       window.removeEventListener("wheel", scroll);
//     }
//   });
//   card.addEventListener("mouseleave", (e) => {
//     window.addEventListener("wheel", scroll);
//   });
// });
