import type { Settings, fontSize } from "./types";
import { reactive, ref } from "vue";



export const themeColors = {
  light: ["#f0f0f0", "#181818", "#8d8d8d", "#f7f7f7"],
  dark: ["#303030", "#e0e0e0", "#8d8d8d", "#1a1a1a"],
  pink: ["#ffc6c7", "#33272a", "#fff", "#fff2f2"],
  blue: ["#e3f6f5", "#272343", "#bae8e8", "#fffffe"],
  coffee: ["#eaddcf", "#020826", "#8c7851", "#f9f4ef"],
};

export const cssVarColors = ["--background", "--text", "--medium", "--cards"];

export const fontSizes = [
  { title: "S", mainSize: 16, titleSize: 22, margin: 3 },
  { title: "M", mainSize: 18, titleSize: 24, margin: 6 },
  { title: "L", mainSize: 22, titleSize: 28, margin: 9 },
];

export const fontOptions = ref([
  { title: "Roboto Slab", css: "'Roboto Slab', sans-serif" },
  { title: "Monserrat", css: "'Montserrat', sans-serif" },
  { title: "Playfair Display", css: "'Playfair Display', serif" },
]);
export const cardsAlign = ref("flex-start");
export const cardsWidth = ref(320);


export const settings: Settings = reactive(
  {
    styles: {
      colorTheme: themeColors.light,
      fontSize: fontSizes[0],
      fontFamily: fontOptions.value[0].css,
      align: cardsAlign.value,
      cardsWidth: cardsWidth.value,
    },

    saveToLocalSettings(): void {
      localStorage.setItem("settings", JSON.stringify(this.styles));
    },

    loadFromLocalStore(): void {
      const localSettings = localStorage.getItem("settings");
      if (localSettings) {
        this.styles = JSON.parse(localSettings);
      }
    },

    setTheme(theme: string): void {
      if (themeColors[theme as keyof Object]) {
        cssVarColors.forEach((el, index) => {
          document.documentElement.style.setProperty(el, themeColors[theme as keyof typeof themeColors][index]);
        });
      }
    },

    setFontSize(fontSize: fontSize): void {
      document.documentElement.style.setProperty("--text-size", `${fontSize.mainSize + "px"}`);
      document.documentElement.style.setProperty("--title-size", `${(fontSize.titleSize) + "px"}`);
      document.documentElement.style.setProperty("--bkmrk-margin", `${(fontSize.margin) + "px"}`);
    },

    setFont(event: Event): void {
      if (event.target) {
        document.documentElement.style.setProperty("--font-family", (event.target as HTMLOptionElement).value);
      }
    },

    setCardsAlign(alignCss: string): void {
      document.documentElement.style.setProperty("--align", alignCss);
    },

    setCardWidth(): void {
      document.documentElement.style.setProperty("--column-width", `${cardsWidth.value + "px"}`);
    }
  }
)