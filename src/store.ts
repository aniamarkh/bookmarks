import { reactive } from "vue";
import type { Bookmark, Store, Category } from "./types";

const localBookmarks: Array<Bookmark> = JSON.parse(localStorage.getItem("bookmarks") || '[]');
const localCategories: Array<Category> = JSON.parse(localStorage.getItem("categories") || '[]');

export const store: Store = reactive(
  {
    bookmarks: localBookmarks,
    categories: localCategories,

    addCategory(title: string) {
      const maxId = this.categories.length ? Math.max(...this.categories.map((el: Category) => { return el.id })) : 0;
      const newCategory = {
        id: maxId + 1,
        title: title,
        bookmarks: [],
      };
      this.categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },

    addBookmark(title: string, url: string, categoryId: number) {
      let maxId = this.bookmarks.length ? Math.max(...this.bookmarks.map((el: Bookmark) => { return el.id })) : 0;
      let newBookmark = {
        id: maxId + 1,
        title: title,
        url: url,
      };
      this.bookmarks.push(newBookmark);

      const bookmarkCategory = this.categories.find((item: Category) => item.id === categoryId);
      if (bookmarkCategory) {
        bookmarkCategory.bookmarks.push(newBookmark.id);
      };
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
      localStorage.setItem("categories", JSON.stringify(this.categories));
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
