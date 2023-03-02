import { reactive, ref } from "vue";
import type { Store, Category, Bookmark } from "./types";
import { settings } from "./settings";

export const store: Store = reactive(
  {
    data: {
      id: 0,
      title: "root",
      children: [] as Array<Category>,
      columns: [[]] as Array<Array<Category>>,
    },

    arrangeCards(cards: Array<Category>): void {
      const columns = settings.styles.columnsCount;
      const maxCardsInColumn = Math.ceil(cards.length / columns);
      const columnsArrays: Array<Array<Category>> = Array.from({ length: columns }, () => []);

      cards.forEach((card: Category, index) => {
        const columnIndex = Math.floor(index / maxCardsInColumn);
        const columnByIndex = columnsArrays[columnIndex];
        columnByIndex.push(card);
      })
      this.data.columns = columnsArrays;
      this.saveToLocalStore();
    },

    deleteNode(nodeId: number) {
      const parentNode = this.findParentNodeById(this.data, nodeId);
      if (parentNode) {
        const nodeToDelete = this.findNodeById(this.data, nodeId);
        if (nodeToDelete) {
          const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
          parentNode.children.splice(nodeToDeleteIndex, 1);

          if ("children" in nodeToDelete) {
            this.data.columns.forEach((column, index) => {
              if (column.filter(el => el.id === nodeToDelete.id).length) {
                const indexInColumn = column.map(obj => obj.id).indexOf(nodeToDelete.id);
                this.data.columns[index].splice(indexInColumn, 1);
              }
            });
          }
        }
      }
      this.saveToLocalStore();
    },

    addCategory(title: string): void {
      const newId: number = this.findMaxId(this.data) + 1;
      const newCategory: Category = {
        id: newId,
        title: title,
        children: [],
      }
      this.data.columns[0].push(newCategory);
      this.saveToLocalStore();
    },

    editCategory(categoryId: number, newTitle: string): void {
      const categoryNode = this.findNodeById(this.data, categoryId);
      if (categoryNode) {
        categoryNode.title = newTitle;
      }
      this.saveToLocalStore();
    },

    async addBookmark(nodeId: number, title: string, url: string): Promise<void> {
      const newId: number = this.findMaxId(this.data) + 1;
      const bookmarkCategory = this.findNodeById(this.data, nodeId);
      const newBookmark = {
        id: newId,
        title: title,
        url: url,
        favicon: "",
      };

      const isCategory = bookmarkCategory && "children" in bookmarkCategory;
      if (isCategory) {
        bookmarkCategory.children.push(newBookmark);
        this.updateFaviconLink(url, newBookmark);
        if (title === "") {
          this.updateBookmarkTitle(url, newBookmark.id);
        }
      }
      this.saveToLocalStore();
    },

    editBookmark(bookmarkId: number, newTitle: string, newUrl: string): void {
      const bookmarkNode = this.findNodeById(this.data, bookmarkId);
      if (bookmarkNode && "url" in bookmarkNode) {
        bookmarkNode.title = newTitle;
        bookmarkNode.url = newUrl;
        this.updateFaviconLink(newUrl, bookmarkNode);
      }
      this.saveToLocalStore();
    },

    saveToLocalStore(): void {
      this.data.children = this.data.columns.flat();
      localStorage.setItem("data", JSON.stringify(this.data));
    },

    loadFromLocalStore(): void {
      const localData = localStorage.getItem("data");
      if (localData) {
        this.data = JSON.parse(localData);
      }
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

    updateFaviconLink(urlInput: string, bookmark: Bookmark): void {
      const url = new URL(chrome.runtime.getURL("/_favicon/"));
      url.searchParams.set("pageUrl", urlInput);
      url.searchParams.set("size", "18");
      bookmark.favicon = url.toString();
      this.saveToLocalStore();
    },

    async updateBookmarkTitle(urlInput: string, bookmarkId: number): Promise<void> {
      const fetchPromise = fetch(urlInput).then(async (response) => {
        if (response.ok) {
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          if (doc) {
            const title = doc.querySelector('title');
            if (title) {
              const titleContent = title.textContent as string;
              this.editBookmark(bookmarkId, titleContent, urlInput);
            }
          }
        } else {
          throw new Error("Error while fetching bookmark title");
        }
      }).catch((error) => {
        console.error(error);
        this.editBookmark(bookmarkId, urlInput, urlInput);
      });

      await Promise.race([
        fetchPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
      ]);
    },
  }
);

store.loadFromLocalStore();
store.data.children = store.data.columns.flat();