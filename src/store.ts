import { reactive } from "vue";
import type { Store, Category, Bookmark } from "./types";

export const store: Store = reactive(
  {
    data: {
      id: 0,
      title: "root",
      children: [] as Array<Category>,
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

    deleteBookmark(bookmarkId: number) {
      const bookmarkParent = this.findParentNodeById(this.data, bookmarkId);
      if (bookmarkParent) {
        const bookmark = this.findNodeById(bookmarkParent, bookmarkId);
        if (bookmark) {
          const bookmarkIndex = bookmarkParent.children.indexOf(bookmark);
          bookmarkParent.children.splice(bookmarkIndex, 1);
        };
      };
      this.saveToLocalStore();
    },

    saveToLocalStore() {
      localStorage.setItem("data", JSON.stringify(this.data));
    },

    loadFromLocalStore() {
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

    findParentNodeById(node: Category | Bookmark, id: number): Category | null {
      if ("children" in node) {
        for (const child of node.children) {
          if (child.id === id) {
            return node;
          }
          const parent = this.findParentNodeById(child, id);
          if (parent) {
            return parent;
          }
        }
      }
      return null;
    },
  }
);

store.loadFromLocalStore();