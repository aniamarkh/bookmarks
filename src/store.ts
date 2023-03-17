import { reactive } from "vue";
import type { Store, Category, Bookmark, ChromeTreeNode, DataNode } from "./types";
import { settings } from "./settings";

export const store: Store = reactive(
  {
    data: [[]] as Array<Array<DataNode>>,
    closed: [] as Array<string>,
    chromeTreeNode: {
      id: "0",
      title: "root",
      children: [] as Array<Category>,
    },

    arrangeCards(cards: Array<Category>): void {
      const columns = settings.styles.columnsCount;
      const maxCardsInColumn = Math.ceil(cards.length / columns);
      const columnsArrays: Array<Array<DataNode>> = Array.from({ length: columns }, () => []);

      cards.forEach((card: Category, index) => {
        const columnIndex = Math.floor(index / maxCardsInColumn);
        const columnByIndex = columnsArrays[columnIndex];
        const nodeChildrens: Array<DataNode> = this.mapToDataNodes(card.children)
        const node: DataNode = {
          id: card.id,
          children: nodeChildrens,
        }
        columnByIndex.push(node);
      })
      this.data = columnsArrays;
      this.saveToLocalStore();
    },

    mapToDataNodes(items: Array<Bookmark | Category>): Array<DataNode> {
      const result: Array<DataNode> = [];

      items.forEach(item => {
        if ("children" in item) {
          const children = this.mapToDataNodes(item.children);
          result.push({ id: item.id, children });
        } else {
          result.push({ id: item.id });
        }
      });

      return result;
    },

    // deleteNode(nodeId: number) {
    //   const nodeToDelete = this.findNodeById(this.data, nodeId);
    //   const parentNode = this.findParentNodeById(this.data, nodeId);

    //   if (nodeToDelete && parentNode && "columns" in parentNode) {
    //     this.data.columns.forEach((column, index) => {
    //       if (column.filter(el => el.id === nodeToDelete.id).length) {
    //         const indexInColumn = column.map(obj => obj.id).indexOf(nodeToDelete.id);
    //         this.data.columns[index].splice(indexInColumn, 1);
    //       }
    //     });
    //   } else if (nodeToDelete && parentNode && "children" in parentNode && !("columns" in nodeToDelete)) {
    //     const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
    //     parentNode.children.splice(nodeToDeleteIndex, 1);
    //   }
    //   this.saveToLocalStore();
    // },

    // addCategory(title: string): void {
    //   const newId: number = this.findMaxId(this.data) + 1;
    //   const newCategory: Category = {
    //     id: newId,
    //     title: title,
    //     children: [],
    //     chrome: false,
    //   }
    //   this.data.columns[0].push(newCategory);
    //   this.saveToLocalStore();
    // },

    editCategory(categoryObj: Category, newTitle: string): void {
      categoryObj.title = newTitle;
      chrome.bookmarks.update(categoryObj.id, { title: newTitle });
      this.saveToLocalStore();
    },

    // async addBookmark(nodeId: number, title: string, url: string): Promise<void> {
    //   const newId: number = this.findMaxId(this.data) + 1;
    //   const bookmarkCategory = this.findNodeById(this.data, nodeId);
    //   const newBookmark = {
    //     id: newId,
    //     title: title,
    //     url: url,
    //     favicon: "",
    //     chrome: false,
    //   };

    //   const isCategory = bookmarkCategory && "children" in bookmarkCategory;
    //   if (isCategory) {
    //     bookmarkCategory.children.push(newBookmark);
    //     this.updateFaviconLink(url, newBookmark);
    //     if (title === "") {
    //       this.updateBookmarkTitle(url, newBookmark.id);
    //     }
    //   }
    //   this.saveToLocalStore();
    // },

    // editBookmark(bookmarkId: number, newTitle: string, newUrl: string): void {
    //   const bookmarkNode = this.findNodeById(this.data, bookmarkId);
    //   if (bookmarkNode && "url" in bookmarkNode) {
    //     bookmarkNode.title = newTitle;
    //     bookmarkNode.url = newUrl;
    //     this.updateFaviconLink(newUrl, bookmarkNode);
    //   }
    //   this.saveToLocalStore();
    // },

    saveToLocalStore(): void {
      localStorage.setItem("data", JSON.stringify(this.data));
      localStorage.setItem("closed", JSON.stringify(this.closed));
      localStorage.setItem("tree", JSON.stringify(this.chromeTreeNode));
    },

    loadFromLocalStore(): void {
      const localData = localStorage.getItem("data");
      const localClosed = localStorage.getItem("closed");
      const localTree = localStorage.getItem("tree");

      if (localData) {
        this.data = JSON.parse(localData);
      }
      if (localClosed) {
        this.closed = JSON.parse(localClosed);
      }
      if (localTree) {
        this.chromeTreeNode = JSON.parse(localTree);
      }
    },

    // findMaxId(node: Category | Bookmark | Data): number {
    //   let maxId = node.id;
    //   if ("children" in node) {
    //     node.children.forEach((child) => {
    //       maxId = Math.max(maxId, this.findMaxId(child));
    //     });
    //   } else if (node && "columns" in node) {
    //     (node as Data).columns.forEach((column: Array<Category>) => {
    //       column.forEach((child: Category) => {
    //         maxId = Math.max(maxId, this.findMaxId(child));
    //       });
    //     });
    //   }
    //   return maxId;
    // },

    findNodeById(node: Category | Bookmark | ChromeTreeNode, id: string): Category | Bookmark | ChromeTreeNode | null {
      if (node.id === id) {
        return node;
      }
      if ("children" in node && node.children) {
        for (const child of node.children) {
          const foundNode = this.findNodeById(child, id);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return null;
    },

    // findParentNodeById(node: Category | Bookmark | Data, id: number): Category | Data | null {
    //   if ("children" in node && node.children) {
    //     for (const child of node.children) {
    //       if (child.id === id) {
    //         return node as Category;
    //       }
    //       const parent = this.findParentNodeById(child, id);
    //       if (parent) {
    //         return parent;
    //       }
    //     }
    //   } else if ("columns" in node) {
    //     for (const column of (node as Data).columns) {
    //       for (const child of column) {
    //         if (child.id === id) {
    //           return node as Data;
    //         }
    //         const parent = this.findParentNodeById(child, id);
    //         if (parent) {
    //           return parent;
    //         }
    //       }
    //     }
    //   }
    //   return null;
    // },

    updateFaviconLink(urlInput: string, bookmark: Bookmark): void {
      const url = new URL(chrome.runtime.getURL("/_favicon/"));
      url.searchParams.set("pageUrl", urlInput);
      url.searchParams.set("size", "18");
      bookmark.favicon = url.toString();
      this.saveToLocalStore();
    },

    // async updateBookmarkTitle(urlInput: string, bookmarkId: number): Promise<void> {
    //   const fetchPromise = fetch(urlInput).then(async (response) => {
    //     if (response.ok) {
    //       const html = await response.text();
    //       const parser = new DOMParser();
    //       const doc = parser.parseFromString(html, 'text/html');
    //       if (doc) {
    //         const title = doc.querySelector('title');
    //         if (title) {
    //           const titleContent = title.textContent as string;
    //           this.editBookmark(bookmarkId, titleContent, urlInput);
    //         }
    //       }
    //     } else {
    //       throw new Error("Error while fetching bookmark title");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //     this.editBookmark(bookmarkId, urlInput, urlInput);
    //   });

    //   await Promise.race([
    //     fetchPromise,
    //     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
    //   ]);
    // },

    async importChromeBookmarks(): Promise<void> {
      return new Promise((resolve, reject) => {
        chrome.bookmarks.getTree((bookmarks) => {
          if (!bookmarks) {
            reject(new Error('Failed to retrieve bookmarks tree'));
            return;
          }

          const bookmarkTree = bookmarks[0];
          if (bookmarkTree.children) {
            bookmarkTree.children.forEach(async (parent) => {
              this.addCategoriesFromChrome(parent);
            });
          }

          resolve();
        });
      });
    },

    addCategoriesFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode) {
      const newCategory: Category = {
        id: chromeCat.id,
        parentId: chromeCat.parentId,
        title: chromeCat.title,
        children: [],
      };
      this.chromeTreeNode.children.push(newCategory);

      if (chromeCat.children) {
        chromeCat.children.forEach(async (child) => {
          let childObj: Bookmark | Category;
          if (child.url) {
            childObj = {
              id: child.id,
              parentId: child.parentId,
              title: child.title,
              url: child.url,
              favicon: "",
            };
            newCategory.children.push(childObj);
            this.updateFaviconLink(child.url, childObj);
          }
          if (child.children) {
            this.addCategoriesFromChrome(child);
          }
        });
      }
    },

    // getCategoriesByIds() {
    //   let chromeNodes: Array<Array<chrome.bookmarks.BookmarkTreeNode>> = [];
    //   store.data.columns.forEach((column: Array<string>) => {
    //     chrome.bookmarks.get(toRaw(column), value => {
    //       chromeNodes.push(value);
    //     });
    //   });
    //   return chromeNodes;
    // },
  }
);

store.loadFromLocalStore();

