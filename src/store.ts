import { reactive } from "vue";
import type { Store, Category, Bookmark, Data } from "./types";
import { settings } from "./settings";

export const store: Store = reactive(
  {
    data: {
      id: 0,
      title: "root",
      columns: [[]] as Array<Array<Category>>,
    },

    closed: [] as Array<number>,

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
      const nodeToDelete = this.findNodeById(this.data, nodeId);
      const parentNode = this.findParentNodeById(this.data, nodeId);

      if (nodeToDelete && parentNode && "columns" in parentNode) {
        this.data.columns.forEach((column, index) => {
          if (column.filter(el => el.id === nodeToDelete.id).length) {
            const indexInColumn = column.map(obj => obj.id).indexOf(nodeToDelete.id);
            this.data.columns[index].splice(indexInColumn, 1);
          }
        });
      } else if (nodeToDelete && parentNode && "children" in parentNode && !("columns" in nodeToDelete)) {
        const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
        parentNode.children.splice(nodeToDeleteIndex, 1);
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
      localStorage.setItem("data", JSON.stringify(this.data));
      localStorage.setItem("closed", JSON.stringify(this.closed));
    },

    loadFromLocalStore(): void {
      const localData = localStorage.getItem("data");
      const localClosed = localStorage.getItem("closed");

      if (localData) {
        this.data = JSON.parse(localData);
      }
      if (localClosed) {
        this.closed = JSON.parse(localClosed);
      }
    },

    findMaxId(node: Category | Bookmark | Data): number {
      let maxId = node.id;
      if ("children" in node) {
        node.children.forEach((child) => {
          maxId = Math.max(maxId, this.findMaxId(child));
        });
      } else if (node && "columns" in node) {
        (node as Data).columns.forEach((column: Array<Category>) => {
          column.forEach((child: Category) => {
            maxId = Math.max(maxId, this.findMaxId(child));
          });
        });
      }
      return maxId;
    },

    findNodeById(node: Category | Bookmark | Data, id: number): Category | Bookmark | Data | null {
      if (node.id === id) {
        return node;
      }
      if ("children" in node) {
        for (const child of node.children) {
          const foundNode = this.findNodeById(child, id);
          if (foundNode) {
            return foundNode;
          }
        }
      } else if ("columns" in node) {
        for (const column of node.columns) {
          for (const child of column) {
            const foundNode = this.findNodeById(child, id);
            if (foundNode) {
              return foundNode;
            }
          }
        }
      }
      return null;
    },

    findParentNodeById(node: Category | Bookmark | Data, id: number): Category | Data | null {
      if ("children" in node && node.children) {
        for (const child of node.children) {
          if (child.id === id) {
            return node as Category;
          }
          const parent = this.findParentNodeById(child, id);
          if (parent) {
            return parent;
          }
        }
      } else if ("columns" in node) {
        for (const column of (node as Data).columns) {
          for (const child of column) {
            if (child.id === id) {
              return node as Data;
            }
            const parent = this.findParentNodeById(child, id);
            if (parent) {
              return parent;
            }
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

    // async addCategoryFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode) {
    // const newId: number = this.findMaxId(this.data) + 1;
    // const newCategory: Category = {
    //   id: newId,
    //   title: chromeCat.title,
    //   children: [],
    // };
    //   if (chromeCat.children) {
    //     chromeCat.children.forEach(async (child, index) => {
    //       let childObj: Bookmark | Category;
    //       if (child.url && child.dateAdded) {
    // childObj = {
    //   id: newId + index + 1,
    //   title: child.title,
    //   url: child.url,
    //   favicon: "",
    // };
    //         newCategory.children.push(childObj);
    //         this.updateFaviconLink(child.url, childObj);
    //       }
    //       if (child.children) {
    //         this.addCategoryFromChrome(child);
    //       }
    //     });
    //   }
    // },

    // pushChild(category: Category, child: Category | Bookmark) {
    //   category.children.push(child);
    // },

    mapChromeBkmrks(parentNode: chrome.bookmarks.BookmarkTreeNode, parentId: number): Array<(Bookmark | Category)> {
      let parentNodeData: Array<(Bookmark | Category)> = [];
      if (parentNode.children) {
        parentNode.children.forEach((child, index) => {
          if (child.url) {
            const newBookmark = {
              id: parentId + index + 1,
              title: child.title,
              url: child.url,
              favicon: "",
            };
            parentNodeData.push(newBookmark);
            this.updateFaviconLink(newBookmark.url, newBookmark);
          }
          if (child.children) {
            const newSubcategory = {
              id: parentId + index + 1,
              title: child.title,
              children: this.mapChromeBkmrks(child, (parentId + index + 1)),
            };
            parentNodeData.push(newSubcategory);
          }
        });
      }
      return parentNodeData;
    },

    importChromeBookmarks() {
      chrome.bookmarks.getTree((bkmrkTree) => {
        console.log(bkmrkTree);
        if (bkmrkTree[0].children) {
          bkmrkTree[0].children.forEach((parent) => {
            const parentId: number = this.findMaxId(this.data) + 1;
            const newCategory: Category = {
              id: parentId,
              title: parent.title,
              children: this.mapChromeBkmrks(parent, parentId),
            };
            this.data.columns[0].push(newCategory);
            this.arrangeCards(this.data.columns.flat());
          });
          console.log(this.data);
        }
      });
    },
  }
);

store.loadFromLocalStore();