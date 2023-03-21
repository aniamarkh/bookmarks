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

    deleteNode(nodeId: string) {
      chrome.bookmarks.remove(nodeId, () => {
        const nodeToDelete = this.findNodeById(this.data, nodeId);
        const parentNode = this.findParentNodeById(this.data, nodeId);

        if (nodeToDelete && parentNode && "columns" in parentNode) {
          this.data.columns.forEach((column, index) => {
            if (column.filter(el => el.id === nodeToDelete.id).length) {
              const indexInColumn = column.map(obj => obj.id).indexOf(nodeId);
              this.data.columns[index].splice(indexInColumn, 1);
            }
          });
        } else if (nodeToDelete && parentNode && "children" in parentNode && !("columns" in nodeToDelete)) {
          const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
          parentNode.children.splice(nodeToDeleteIndex, 1);
        }
        this.saveToLocalStore();

      })
    },

    addCategory(categoryTitle: string): void {
      chrome.bookmarks.create({ title: categoryTitle }, (category) => {
        const newCategory: Category = {
          id: category.id,
          title: category.title,
          children: [],
        };
        this.data.columns[0].push(newCategory);
        this.saveToLocalStore();
      });
    },

    editCategory(categoryId: string, newTitle: string): void {
      chrome.bookmarks.update(categoryId, { title: newTitle }, () => {
        const categoryNode = this.findNodeById(this.data, categoryId) as Category;
        if (categoryNode) {
          categoryNode.title = newTitle;
        }
        this.saveToLocalStore();
      })
    },

    async addBookmark(parentNodeId: string, bookmarkTitle: string, bookmarkUrl: string): Promise<void> {
      chrome.bookmarks.create(
        {
          title: bookmarkTitle,
          parentId: parentNodeId,
          url: bookmarkUrl
        }, (bookmark) => {
          const bookmarkCategory = this.findNodeById(this.data, parentNodeId);
          const newBookmark: Bookmark = {
            id: bookmark.id,
            title: bookmark.title,
            url: bookmarkUrl,
            favicon: "",
          };

          const isCategory = bookmarkCategory && "children" in bookmarkCategory;
          if (isCategory) {
            bookmarkCategory.children.push(newBookmark);
            this.updateFaviconLink(bookmarkUrl, newBookmark);
            if (bookmarkTitle === "") {
              this.updateBookmarkTitle(bookmarkUrl, bookmark.id);
            }
          }
          this.saveToLocalStore();

        });
    },

    editBookmark(bookmarkId: string, newTitle: string, newUrl: string): void {
      chrome.bookmarks.update(bookmarkId, { title: newTitle, url: newUrl, }, (bookmark) => {
        const bookmarkNode = this.findNodeById(this.data, bookmarkId);
        if (bookmarkNode && "url" in bookmarkNode) {
          bookmarkNode.title = newTitle;
          this.updateFaviconLink(newUrl, bookmarkNode);
          if (newUrl !== bookmarkNode.url && newTitle === "") {
            this.updateBookmarkTitle(newUrl, bookmarkId);
          }
          bookmarkNode.url = newUrl;
        }
        this.saveToLocalStore();
      });
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

    findNodeById(node: Category | Bookmark | Data, id: string): Category | Bookmark | Data | null {
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

    findParentNodeById(node: Category | Bookmark | Data, id: string): Category | Data | null {
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

    async updateBookmarkTitle(urlInput: string, bookmarkId: string): Promise<void> {
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

    importChromeBookmarks() {
      chrome.bookmarks.getTree((bkmrkTree) => {
        if (bkmrkTree[0].children) {
          bkmrkTree[0].children.forEach((parent) => {
            this.addCategoriesFromChrome(parent);
          });
          this.arrangeCards(this.data.columns.flat());
        }
      });
    },

    async addCategoriesFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode) {
      const newCategory: Category = {
        id: chromeCat.id,
        title: chromeCat.title,
        children: [],
      };
      this.data.columns[0].push(newCategory);

      if (chromeCat.children) {
        chromeCat.children.forEach((child) => {
          let childObj: Bookmark | Category;
          if (child.url && child.dateAdded) {
            childObj = {
              id: child.id,
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
  }
);

store.loadFromLocalStore();

if (!localStorage.getItem("data")) {
  store.importChromeBookmarks();
}
