import { reactive } from "vue";
import type { Store, Category, Bookmark, Data } from "./types";
import { settings } from "./settings";
import { getColumnAndIndex } from "./utils";

export const store: Store = reactive({
  data: {
    id: "2",
    title: "root",
    columns: [[]] as Array<Array<Category | Bookmark>>,
  },

  closed: [] as Array<string>,
  hidden: {
    id: "hidden",
    title: "hidden",
    children: [],
  } as Category,

  arrangeCards(cards: Array<Category | Bookmark>): void {
    const columns = settings.styles.columnsCount;
    const maxCardsInColumn = Math.ceil(cards.length / columns);
    const columnsArrays: Array<Array<Category | Bookmark>> = Array.from(
      { length: columns },
      () => []
    );

    cards.forEach((card: Category | Bookmark, index) => {
      const columnIndex = Math.floor(index / maxCardsInColumn);
      const columnByIndex = columnsArrays[columnIndex];
      columnByIndex.push(card);
    });
    this.data.columns = columnsArrays;
    this.saveToLocalStore();
  },

  deleteNode(nodeId: string) {
    const nodeToDelete =
      this.findNodeById(this.data, nodeId) ||
      this.findNodeById(this.hidden, nodeId);
    const parentNode =
      this.findParentNodeById(this.data, nodeId) ||
      this.findParentNodeById(this.hidden, nodeId);

    if (nodeToDelete && parentNode && "columns" in parentNode) {
      this.data.columns.forEach((column, index) => {
        if (column.filter((el) => el.id === nodeToDelete.id).length) {
          const indexInColumn = column.map((obj) => obj.id).indexOf(nodeId);
          this.data.columns[index].splice(indexInColumn, 1);
        }
      });
    } else if (
      nodeToDelete &&
      parentNode &&
      "children" in parentNode &&
      !("columns" in nodeToDelete)
    ) {
      const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
      parentNode.children.splice(nodeToDeleteIndex, 1);
    }
    this.saveToLocalStore();
  },

  hideCategory(nodeToDelete: Category): void {
    const parentNode = this.findParentNodeById(this.data, nodeToDelete.id);

    if (nodeToDelete && parentNode && "columns" in parentNode) {
      this.data.columns.forEach((column, index) => {
        if (column.filter((el) => el.id === nodeToDelete.id).length) {
          const indexInColumn = column
            .map((obj) => obj.id)
            .indexOf(nodeToDelete.id);
          this.data.columns[index].splice(indexInColumn, 1);
        }
      });
    } else if (
      nodeToDelete &&
      parentNode &&
      "children" in parentNode &&
      !("columns" in nodeToDelete)
    ) {
      const nodeToDeleteIndex = parentNode.children.indexOf(nodeToDelete);
      parentNode.children.splice(nodeToDeleteIndex, 1);
    }
    this.saveToLocalStore();
  },

  addCategory(category: chrome.bookmarks.BookmarkTreeNode): void {
    const newCategory: Category = {
      id: category.id,
      title: category.title,
      children: [],
    };
    if (category.parentId === "2") {
      this.data.columns[this.data.columns.length - 1].push(newCategory);
    } else if (category.parentId) {
      const parentNode =
        store.findNodeById(this.data, category.parentId) ||
        store.findNodeById(this.hidden, category.parentId);
      if (parentNode && "children" in parentNode) {
        parentNode.children.push(newCategory);
      }
    }
    this.saveToLocalStore();
  },

  editCategory(category: chrome.bookmarks.BookmarkTreeNode): void {
    const categoryNode = this.findNodeById(this.data, category.id) as Category;
    if (categoryNode) {
      categoryNode.title = category.title;
    }
    this.saveToLocalStore();
  },

  async addBookmark(
    bookmark: chrome.bookmarks.BookmarkTreeNode
  ): Promise<void> {
    if (bookmark.url && bookmark.parentId) {
      const bookmarkCategory = this.findNodeById(this.data, bookmark.parentId);
      const newBookmark: Bookmark = {
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        favicon: "",
      };

      if (bookmarkCategory && "children" in bookmarkCategory) {
        bookmarkCategory.children.push(newBookmark);
      } else if (
        bookmarkCategory &&
        "columns" in bookmarkCategory &&
        bookmark.index
      ) {
        let columnIndex = store.data.columns.length - 1;
        let indexInColumn = store.data.columns[columnIndex].length;
        const returns = getColumnAndIndex(bookmark.index);
        if (returns) {
          columnIndex = returns[0];
          indexInColumn = returns[1];
        }
        store.data.columns[columnIndex].splice(indexInColumn, 0, newBookmark);
      }
      this.updateFaviconLink(bookmark.url, newBookmark);
      if (bookmark.title === "") {
        this.updateBookmarkTitle(bookmark.url, bookmark.id);
      }
      this.saveToLocalStore();
    }
  },

  editBookmark(id: string, newTitle: string, newUrl: string): void {
    const bookmarkNode = this.findNodeById(this.data, id);
    if (bookmarkNode && "url" in bookmarkNode) {
      bookmarkNode.title = newTitle;
      this.updateFaviconLink(newUrl, bookmarkNode);
      if (newUrl !== bookmarkNode.url && newTitle === "") {
        this.updateBookmarkTitle(newUrl, id);
      }
      bookmarkNode.url = newUrl;
    }
    this.saveToLocalStore();
  },

  saveToLocalStore(): void {
    localStorage.setItem("data", JSON.stringify(this.data));
    localStorage.setItem("closed", JSON.stringify(this.closed));
    localStorage.setItem("hidden", JSON.stringify(this.hidden));
  },

  loadFromLocalStore(): void {
    const localData = localStorage.getItem("data");
    const localClosed = localStorage.getItem("closed");
    const localHidden = localStorage.getItem("hidden");

    if (localData) {
      this.data = JSON.parse(localData);
    }
    if (localClosed) {
      this.closed = JSON.parse(localClosed);
    }
    if (localHidden) {
      this.hidden = JSON.parse(localHidden);
    }
  },

  findNodeById(
    node: Category | Bookmark | Data,
    id: string
  ): Category | Bookmark | Data | null {
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

  findParentNodeById(
    node: Category | Bookmark | Data,
    id: string
  ): Category | Data | null {
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

  async updateBookmarkTitle(
    urlInput: string,
    bookmarkId: string
  ): Promise<void> {
    const fetchPromise = fetch(urlInput)
      .then(async (response) => {
        if (response.ok) {
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          if (doc) {
            const title = doc.querySelector("title");
            if (title) {
              const titleContent = title.textContent as string;
              chrome.bookmarks.update(bookmarkId, { title: titleContent });
              this.editBookmark(bookmarkId, titleContent, urlInput);
            }
          }
        } else {
          this.editBookmark(bookmarkId, urlInput, urlInput);
          chrome.bookmarks.update(bookmarkId, { title: urlInput });
          throw new Error("Error while fetching bookmark title");
        }
      })
      .catch((error) => {
        console.error(error);
        chrome.bookmarks.update(bookmarkId, { title: urlInput });
        this.editBookmark(bookmarkId, urlInput, urlInput);
      });

    await Promise.race([
      fetchPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
      ),
    ]);
  },

  moveNode(newParentId: string, movedNodeId: string, newIndex: number): void {
    chrome.bookmarks.move(movedNodeId, {
      index: newIndex,
      parentId: newParentId,
    });
  },
});
