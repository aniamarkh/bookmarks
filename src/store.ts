import { reactive } from "vue";
import type { Bookmark, Store } from "./types";

const localBookmarks: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks") || '[]');

export const store: Store = reactive(
  {
    bookmarks: localBookmarks,
    addBookmark(titleValue, urlValue, categoryValue) {
      let maxIdValue = this.bookmarks.reduce((acc, value: Bookmark) => {
        return (acc = acc > value.id ? acc : value.id);
      }, 0);

      let newBookmark: Bookmark = {
        id: maxIdValue + 1,
        title: titleValue,
        url: urlValue,
        category: categoryValue,
      }
      this.bookmarks.push(newBookmark);
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
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
