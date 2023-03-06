import type { Settings, fontSize } from "./types";
import { reactive, ref } from "vue";
import { store } from "./store";


export const themes = {
  light: ["#f0f0f0", "#181818", "#8d8d8d", "#f7f7f7"],
  dark: ["#121212", "#b4b4b4", "#FFFFFF", "#1D1D1D"],
  pink: ["#ffc6c7", "#33272a", "#fff", "#fff2f2"],
  blue: ["#e3f6f5", "#272343", "#bae8e8", "#fffffe"],
  coffee: ["#eaddcf", "#020826", "#8c7851", "#f9f4ef"],
};
export const cssVarColors = ["--background", "--text", "--medium", "--cards"];

export const fontSizes = [
  { title: "S", mainSize: 16, titleSize: 22, margin: 3 },
  { title: "M", mainSize: 18, titleSize: 24, margin: 5 },
  { title: "L", mainSize: 22, titleSize: 28, margin: 8 },
];

export const fontOptions = ref([
  { title: "Roboto Slab", css: "'Roboto Slab', sans-serif" },
  { title: "Monserrat", css: "'Montserrat', sans-serif" },
  { title: "Playfair Display", css: "'Playfair Display', serif" },
]);

export const cardsAlign = ref("flex-start");

export const cardsWidth = ref(320);

export const columnsCount = ref(1);

export const settings: Settings = reactive(
  {
    styles: {
      colorTheme: themes.light,
      fontSize: fontSizes[0],
      fontFamily: fontOptions.value[0].css,
      columnsCount: columnsCount.value,
    },

    edit: true,

    saveToLocalSettings(): void {
      localStorage.setItem("settings", JSON.stringify(this.styles));
      localStorage.setItem("edit", JSON.stringify(this.edit));
    },

    loadFromLocalStore(): void {
      const localSettings = localStorage.getItem("settings");
      const localEdit = localStorage.getItem("edit");
      if (localSettings && localEdit) {
        this.styles = JSON.parse(localSettings);
        this.edit = JSON.parse(localEdit);
      }
    },

    onLoad(): void {
      settings.loadFromLocalStore();
      const local = settings.styles;
      cssVarColors.forEach((el, index) => {
        document.documentElement.style.setProperty(el, local.colorTheme[index]);
      });
      document.documentElement.style.setProperty("--text-size", `${local.fontSize.mainSize + "px"}`);
      document.documentElement.style.setProperty("--title-size", `${(local.fontSize.titleSize) + "px"}`);
      document.documentElement.style.setProperty("--bkmrk-margin", `${(local.fontSize.margin) + "px"}`);
      document.documentElement.style.setProperty("--font-family", local.fontFamily);
      columnsCount.value = local.columnsCount;
    },

    setTheme(themeColors: Array<string>): void {
      cssVarColors.forEach((el, index) => {
        document.documentElement.style.setProperty(el, themeColors[index]);
      });
      this.styles.colorTheme = themeColors;
      this.saveToLocalSettings();
    },

    setFontSize(fontSize: fontSize): void {
      document.documentElement.style.setProperty("--text-size", `${fontSize.mainSize + "px"}`);
      document.documentElement.style.setProperty("--title-size", `${(fontSize.titleSize) + "px"}`);
      document.documentElement.style.setProperty("--bkmrk-margin", `${(fontSize.margin) + "px"}`);

      this.styles.fontSize = fontSize;
      this.saveToLocalSettings();
    },

    setFont(event: Event): void {
      if (event.target) {
        document.documentElement.style.setProperty("--font-family", (event.target as HTMLOptionElement).value);
      }

      this.styles.fontFamily = (event.target as HTMLOptionElement).value;
      this.saveToLocalSettings();
    },

    setColumnsCount(): void {
      this.styles.columnsCount = columnsCount.value;
      store.arrangeCards(store.data.columns.flat());
      this.saveToLocalSettings();
      store.saveToLocalStore();
    }
  }
)