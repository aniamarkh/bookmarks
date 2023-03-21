import { reactive } from "vue";
import type { Store, Category, Bookmark, ChromeTreeNode, DataNode } from "./types";
import { settings } from "./settings";

export const store: Store = reactive(
  {
    data: [[]] as Array<Array<DataNode>>,
    closed: [] as Array<string>,
    hidden: [] as Array<DataNode>,
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

        const isHidden = (): boolean => {
          for (let i = 0; i < this.hidden.length; i++) {
            if (this.hidden[i].id === node.id) {
              return true;
            }
          }
          return false;
        };
        if (!isHidden()) {
          columnByIndex.push(node);
        }
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

    deleteNode(nodeId: string): void {
      const nodeToDelete = this.findNodeById(this.chromeTreeNode, nodeId) as (Category | Bookmark);

      this.data.forEach((column: Array<DataNode>) => {
        this.deleteDataNode(column, nodeId);
      });
      this.saveToLocalStore();

      if (nodeToDelete.id !== "1" && nodeToDelete.id !== "2") {
        if ("children" in nodeToDelete) {
          chrome.bookmarks.removeTree(nodeToDelete.id);
        } else {
          chrome.bookmarks.remove(nodeToDelete.id);
        }
      }

      this.importChromeBookmarks().then(() => {
        localStorage.setItem("tree", JSON.stringify(store.chromeTreeNode));
      });
    },

    deleteDataNode(data: Array<DataNode>, id: string) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (node.id === id) {
          data.splice(i, 1);
          return;
        }
        if (node.children) {
          this.deleteDataNode(node.children, id);
        }
      }
    },

    addCategory(categoryTitle: string): void {
      chrome.bookmarks.create({ title: categoryTitle }, (category) => {
        const newCategory: Category = {
          id: category.id,
          parentId: "0",
          title: category.title,
          children: [],
        };
        this.chromeTreeNode.children.push(newCategory);
        this.data[0].push({ id: category.id });
        this.saveToLocalStore();
      });
    },

    editCategory(categoryObj: Category, newTitle: string): void {
      categoryObj.title = newTitle;
      chrome.bookmarks.update(categoryObj.id, { title: newTitle });
      this.saveToLocalStore();
    },

    addBookmark(parentDataNode: DataNode, bookmarkTitle: string, bookmarkUrl: string): void {
      chrome.bookmarks.create({ title: bookmarkTitle, parentId: parentDataNode.id, url: bookmarkUrl }, async (bookmark) => {
        const newBookmark: Bookmark = {
          id: bookmark.id,
          parentId: bookmark.parentId,
          title: bookmark.title,
          url: bookmarkUrl,
          favicon: "",
        };
        this.updateFaviconLink(bookmarkUrl, newBookmark);

        if (bookmarkTitle === "") {
          await this.updateBookmarkTitle(bookmarkUrl, newBookmark);
        }

        const parentTreeNode = this.findNodeById(this.chromeTreeNode, bookmark.parentId) as Category;
        parentTreeNode.children.push(newBookmark);
        parentDataNode.children?.push({ id: bookmark.id });
        this.saveToLocalStore();
      });
    },

    editBookmark(bookmarkObj: Bookmark, newTitle: string, newUrl: string): void {
      bookmarkObj.title = newTitle;
      bookmarkObj.url = newUrl;
      this.updateFaviconLink(newUrl, bookmarkObj);
      chrome.bookmarks.update(bookmarkObj.id, { title: newTitle, url: newUrl, });
      this.saveToLocalStore();
    },

    saveToLocalStore(): void {
      localStorage.setItem("data", JSON.stringify(this.data));
      localStorage.setItem("closed", JSON.stringify(this.closed));
      localStorage.setItem("hidden", JSON.stringify(this.hidden));
      localStorage.setItem("tree", JSON.stringify(this.chromeTreeNode));
    },

    loadFromLocalStore(): void {
      const localData = localStorage.getItem("data");
      const localClosed = localStorage.getItem("closed");
      const localTree = localStorage.getItem("tree");
      const localHidden = localStorage.getItem("hidden");

      if (localData) {
        this.data = JSON.parse(localData);
      }
      if (localClosed) {
        this.closed = JSON.parse(localClosed);
      }
      if (localTree) {
        this.chromeTreeNode = JSON.parse(localTree);
      }
      if (localHidden) {
        this.hidden = JSON.parse(localHidden);
      }
    },

    findNodeById(node: Category | Bookmark | ChromeTreeNode, id: string | undefined): Category | Bookmark | ChromeTreeNode | null {
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

    updateFaviconLink(urlInput: string, bookmark: Bookmark): void {
      const url = new URL(chrome.runtime.getURL("/_favicon/"));
      url.searchParams.set("pageUrl", urlInput);
      url.searchParams.set("size", "18");
      bookmark.favicon = url.toString();
      this.saveToLocalStore();
    },

    async updateBookmarkTitle(urlInput: string, bookmarkObj: Bookmark): Promise<void> {
      const fetchPromise = fetch(urlInput).then(async (response) => {
        if (response.ok) {
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          if (doc) {
            const title = doc.querySelector('title');
            if (title) {
              const titleContent = title.textContent as string;
              this.editBookmark(bookmarkObj, titleContent, urlInput);
              chrome.bookmarks.update(bookmarkObj.id, { title: titleContent, url: urlInput });
            }
          }
        } else {
          throw new Error("Error while fetching bookmark title");
        }
      }).catch((error) => {
        console.error(error);
        this.editBookmark(bookmarkObj, urlInput, urlInput);
        chrome.bookmarks.update(bookmarkObj.id, { title: urlInput, url: urlInput });
      });

      await Promise.race([
        fetchPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
      ]);
    },

    async importChromeBookmarks(): Promise<void> {

      return new Promise((resolve, reject) => {
        chrome.bookmarks.getTree((bookmarks) => {
          if (!bookmarks) {
            reject(new Error('Failed to retrieve bookmarks tree'));
            return;
          }

          const bookmarkTree = bookmarks[0];
          if (bookmarkTree.children) {
            this.chromeTreeNode.children = [];
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
  }
);

store.loadFromLocalStore();

