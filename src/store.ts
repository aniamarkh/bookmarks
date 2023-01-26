import { reactive } from "vue";
import type { Bookmark, Store, Category } from "./types";

const localBookmarks: Array<Bookmark> = JSON.parse(localStorage.getItem("bookmarks") || '[]');
const localCategories: Array<Category> = JSON.parse(localStorage.getItem("categories") || '[]');

export const store: Store = reactive(
  {
    bookmarks: localBookmarks,
    categories: localCategories,

    addCategory(title: string) {
      let maxKey = this.categories.length ? Math.max(...this.categories.map((el: Category) => { return el.id })) : 0;
      let newCategory = {
        id: maxKey + 1,
        title: title,
        bookmarks: [],
      };
      this.categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },

    addBookmark(title, url, categoryKey) {
      // let maxIdValue = this.bookmarks.reduce((acc, value: Bookmark) => {
      //   return (acc = acc > value.id ? acc : value.id);
      // }, 0);

      // let newBookmark: Bookmark = {
      //   id: maxIdValue + 1,
      //   title: titleValue,
      //   url: urlValue,
      //   category: categoryValue,
      // }
      // this.bookmarks.push(newBookmark);
      // localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    },

    deleteBookmark(id) {
      const bookmarkToDelete = this.bookmarks.findIndex((bookmark: Bookmark) => bookmark.id === id);

      if (bookmarkToDelete >= 0) {
        this.bookmarks.splice(bookmarkToDelete, 1);
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
      }
    },
  }
);
