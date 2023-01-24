import { reactive } from "vue";
import type { Bookmark } from "./types";

export const store: Array<Bookmark> = reactive([
  {
    id: 1,
    title: "Gmail",
    url: "https://mail.google.com/",
    category: "Job",
  },
  {
    id: 2,
    title: "GitHub",
    url: "https://github.com/",
    category: "Travel",
  },
  {
    id: 3,
    title: "YandexMail",
    url: "https://mail.yandex.ru/",
    category: "Personal",
  },
  {
    id: 4,
    title: "GoogleMaps",
    url: "https://www.google.com/maps",
    category: "Travel",
  },
  {
    id: 5,
    title: "Airbnb",
    url: "https://www.airbnb.com",
    category: "Travel",
  },
]);