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
    title: "YandexMail",
    url: "https://mail.yandex.ru/",
    category: "Personal",
  },
]);