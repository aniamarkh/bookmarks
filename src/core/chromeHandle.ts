import type {
  ChromeHandle,
  ChangeInfo,
  Bookmark,
  Category,
  MoveInfo,
  RemoveInfo,
} from "./types";
import { store } from "./store";
import { getColumnAndIndex } from "./utils";

export const chromeHandle: ChromeHandle = {
  fromUI: false,

  importChromeBookmarks() {
    chrome.bookmarks.getTree((bkmrkTree) => {
      if (bkmrkTree[0].children) {
        bkmrkTree[0].children.forEach((folder) => {
          if (folder.id === "2" && folder.children) {
            folder.children.forEach((child) => {
              this.addCategoriesFromChrome(child, store.data.columns[0]);
            });
          }
        });
        store.arrangeCards(store.data.columns.flat());
      }
    });
  },

  addCategoriesFromChrome(
    chromeChild: chrome.bookmarks.BookmarkTreeNode,
    parentNode: Array<Category | Bookmark>
  ): void {
    if (chromeChild.url) {
      const newBookmark = {
        id: chromeChild.id,
        title: chromeChild.title,
        url: chromeChild.url,
        favicon: "",
      };
      store.data.columns[0].push(newBookmark);
      store.updateFaviconLink(chromeChild.url, newBookmark);
    } else {
      const newCategory: Category = {
        id: chromeChild.id,
        title: chromeChild.title,
        children: [],
      };
      parentNode.push(newCategory);

      if (chromeChild.children) {
        chromeChild.children.forEach((child) => {
          let childObj: Bookmark | Category;
          if (child.url) {
            childObj = {
              id: child.id,
              title: child.title,
              url: child.url,
              favicon: "",
            };
            newCategory.children.push(childObj);
            store.updateFaviconLink(child.url, childObj);
          }
          if (child.children) {
            this.addCategoriesFromChrome(child, newCategory.children);
          }
        });
      }
    }
  },

  deleteNodeFromChrome(nodeId: string): void {
    this.fromUI = true;
    chrome.bookmarks.remove(nodeId, () => {
      this.fromUI = false;
      store.deleteNode(nodeId);
    });
  },

  addCategoryToChrome(categoryTitle: string): void {
    this.fromUI = true;
    chrome.bookmarks.create({ title: categoryTitle }, (category) => {
      this.fromUI = false;
      store.addCategory(category);
    });
  },

  editCategoryInChrome(categoryId: string, newTitle: string): void {
    this.fromUI = true;
    chrome.bookmarks.update(categoryId, { title: newTitle }, (category) => {
      this.fromUI = false;
      store.editCategory(category);
    });
  },

  addBookmarkToChrome(
    parentNodeId: string,
    bookmarkTitle: string,
    bookmarkUrl: string
  ): void {
    this.fromUI = true;
    chrome.bookmarks.create(
      {
        title: bookmarkTitle,
        parentId: parentNodeId,
        url: bookmarkUrl,
      },
      (bookmark) => {
        this.fromUI = false;
        store.addBookmark(bookmark);
      }
    );
  },

  editBookmarkInChrome(
    bookmarkId: string,
    newTitle: string,
    newUrl: string
  ): void {
    this.fromUI = true;
    chrome.bookmarks.update(
      bookmarkId,
      { title: newTitle, url: newUrl },
      (bookmark) => {
        this.fromUI = false;
        store.editBookmark(bookmark.id, bookmark.title, newUrl);
      }
    );
  },

  onNodeChange(id: string, changeInfo: ChangeInfo): void {
    const node =
      store.findNodeById(store.data, id) ||
      store.findNodeById(store.hidden, id);
    if (node) {
      if (changeInfo.url && "url" in node) {
        node.title = changeInfo.title;
        node.url = changeInfo.url;
        store.updateFaviconLink(changeInfo.url, node);
      } else {
        node.title = changeInfo.title;
      }
    }
  },

  changeParent(id: string, moveInfo: MoveInfo): void {
    if (moveInfo.parentId !== moveInfo.oldParentId) {
      const node = JSON.stringify(
        store.findNodeById(store.data, id) ||
          store.findNodeById(store.hidden, id)
      );
      const newParent =
        store.findNodeById(store.data, moveInfo.parentId) ||
        store.findNodeById(store.hidden, moveInfo.parentId);
      if (
        node &&
        newParent &&
        ("children" in newParent || "columns" in newParent)
      ) {
        store.deleteNode(id);
        if ("children" in newParent) {
          newParent.children.splice(moveInfo.index, 0, JSON.parse(node));
        } else if ("columns" in newParent) {
          let columnIndex = store.data.columns.length - 1;
          let indexInColumn = store.data.columns[columnIndex].length;
          const returns = getColumnAndIndex(moveInfo.index);
          if (returns) {
            columnIndex = returns[0];
            indexInColumn = returns[1];
          }
          store.data.columns[columnIndex].splice(
            indexInColumn,
            0,
            JSON.parse(node)
          );
        }
        const newNode =
          store.findNodeById(store.data, id) ||
          store.findNodeById(store.hidden, id);
        if (newNode && "url" in newNode) {
          store.updateFaviconLink(newNode.url, newNode);
        }
      }
      store.saveToLocalStore();
    }
  },

  onCreated(id: string, node: chrome.bookmarks.BookmarkTreeNode): void {
    node.url ? store.addBookmark(node) : store.addCategory(node);
  },

  onRemoved(id: string, removeInfo: RemoveInfo): void {
    store.deleteNode(id);
  },

  listen():void {
    chrome.bookmarks.onChanged.addListener(chromeHandle.onNodeChange);

    chrome.bookmarks.onMoved.addListener(
      (id: string, moveInfo: chrome.bookmarks.BookmarkMoveInfo) => {
        if (moveInfo.oldParentId === "1") {
          chrome.bookmarks.get(
            id,
            (result: chrome.bookmarks.BookmarkTreeNode[]) => {
              store.addBookmark(result[0]);
            }
          );
        } else if (moveInfo.parentId === "1") {
          store.deleteNode(id);
        } else {
          chromeHandle.changeParent(id, moveInfo);
        }
      }
    );

    chrome.bookmarks.onCreated.addListener((id, node) => {
      if (!chromeHandle.fromUI) {
        chromeHandle.onCreated(id, node);
      }
    });

    chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
      if (!chromeHandle.fromUI) {
        chromeHandle.onRemoved(id, removeInfo);
      }
    });

    chrome.bookmarks.onImportEnded.addListener(chromeHandle.importChromeBookmarks);
  }
};
