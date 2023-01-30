import { reactive } from "vue";
import type { Store, Category, Bookmark } from "./types";

// const initDataStr = JSON.stringify({
//   id: 0,
//   title: "root",
//   children: [],
// });
// const localData: Data = JSON.parse(localStorage.getItem("data") || initDataStr);

export const store: Store = reactive(
  {
    data: {
      id: 0,
      title: "root",
      children: [] as Array<Category>,
    },

    saveToLocalStore() {
      localStorage.setItem("data", JSON.stringify(this.data));
    },

    loadFromLocalStore() {
      console.log("loading");
      let localData = localStorage.getItem("data");
      if (localData) {
        this.data = JSON.parse(localData);
      };
    },

    findMaxId(node: Category | Bookmark): number {
      let maxId = node.id;
      if ("children" in node) {
        node.children.forEach((child) => {
          maxId = Math.max(maxId, this.findMaxId(child));
        });
      }
      return maxId;
    },

    findNodeById(node: Category | Bookmark, id: number): Category | Bookmark | null {
      if (node.id === id) {
        return node;
      }
      if ("children" in node && node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const foundNode = this.findNodeById(node.children[i], id);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return null;
    },

    addCategory(title: string) {
      const newId: number = this.findMaxId(this.data) + 1;

      const newCategory: Category = {
        id: newId,
        title: title,
        children: [],
      }

      this.data.children.push(newCategory);
      this.saveToLocalStore();
    },

    addBookmark(nodeId: number, title: string, url: string) {
      const newId: number = this.findMaxId(this.data) + 1;
      const newBookmark = {
        id: newId,
        title: title,
        url: url,
      };

      const bookmarkCategory = this.findNodeById(this.data, nodeId);
      if (bookmarkCategory && "children" in bookmarkCategory) {
        bookmarkCategory.children.push(newBookmark);
      };
      this.saveToLocalStore();
    },

    // deleteBookmark(bookmarkId: number) {

    // }

    //   addBookmark(title: string, url: string, categoryId: number) {
    //     const maxId = this.bookmarks.length ? Math.max(...this.bookmarks.map((el: Bookmark) => { return el.id })) : 0;
    //     const newBookmark = {
    //       id: maxId + 1,
    //       title: title,
    //       url: url,
    //     };
    //     this.bookmarks.push(newBookmark);

    //     const bookmarkCategory = this.categories.find((item: Category) => item.id === categoryId);
    //     if (bookmarkCategory) {
    //       bookmarkCategory.bookmarks.push(newBookmark.id);
    //     }
    //     localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    //     localStorage.setItem("categories", JSON.stringify(this.categories));
    //   },

    //   deleteBookmark(bookmarkId: number, categoryId: number) {
    //     const bookmarkToDelete = this.bookmarks.findIndex((bookmark: Bookmark) => bookmark.id === bookmarkId);

    //     if (bookmarkToDelete >= 0) {
    //       this.bookmarks.splice(bookmarkToDelete, 1);
    //       localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    //     }

    //     const bookmarkCategory = this.categories.find((item: Category) => item.id === categoryId);
    //     if (bookmarkCategory) {
    //       const bookmarkIndex = bookmarkCategory.bookmarks.indexOf(bookmarkId);
    //       bookmarkCategory.bookmarks.splice(bookmarkIndex, 1);
    //       localStorage.setItem("categories", JSON.stringify(this.categories));
    //     }
    //   },
  }
);

store.loadFromLocalStore();
console.log(store);