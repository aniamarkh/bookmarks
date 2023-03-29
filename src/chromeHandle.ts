import type { ChromeHandle, ChangeInfo, Bookmark, Category, MoveInfo } from "./types";
import { store } from "./store";
import { getColumnAndIndex } from "./utils";

export const chromeHandle: ChromeHandle = {
  importChromeBookmarks() {
    chrome.bookmarks.getTree((bkmrkTree) => {
      if (bkmrkTree[0].children) {
        bkmrkTree[0].children.forEach(folder => {
          if (folder.title.toLowerCase() === "other bookmarks" && folder.children) {
            folder.children.forEach(child => {
              this.addCategoriesFromChrome(child, store.data.columns[0]);
            })
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
    chrome.bookmarks.remove(nodeId, () => {
      store.deleteNode(nodeId);
    })
  },

  addCategoryToChrome(categoryTitle: string): void {
    chrome.bookmarks.create({ title: categoryTitle }, (category) => {
      store.addCategory(category);
    });
  },

  editCategoryInChrome(categoryId: string, newTitle: string): void {
    chrome.bookmarks.update(categoryId, { title: newTitle }, (category) => {
      store.editCategory(category);
    });
  },

  addBookmarkToChrome(parentNodeId: string, bookmarkTitle: string, bookmarkUrl: string): void {
    chrome.bookmarks.create(
      {
        title: bookmarkTitle,
        parentId: parentNodeId,
        url: bookmarkUrl
      }, (bookmark) => {
        store.addBookmark(bookmark);
      });
  },

  editBookmarkInChrome(bookmarkId: string, newTitle: string, newUrl: string): void {
    chrome.bookmarks.update(bookmarkId, { title: newTitle, url: newUrl, }, (bookmark) => {
      store.editBookmark(bookmark.id, bookmark.title, newUrl);
    });
  },

  onNodeChange(id: string, changeInfo: ChangeInfo): void {
    const node = store.findNodeById(store.data, id) || store.findNodeById(store.hidden, id);
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
    const node = JSON.stringify(
      store.findNodeById(store.data, id) ||
      store.findNodeById(store.hidden, id));
    const newParent = store.findNodeById(store.data, moveInfo.parentId) || store.findNodeById(store.hidden, moveInfo.parentId);

    if (node && newParent && ("children" in newParent || "columns" in newParent)) {
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
        store.data.columns[columnIndex].splice(indexInColumn, 0, JSON.parse(node));
      }
      const newNode = store.findNodeById(store.data, id) || store.findNodeById(store.hidden, id)
      if (newNode && "url" in newNode) {
        store.updateFaviconLink(newNode.url, newNode);
      }
    }
  }
}

chrome.bookmarks.onChanged.addListener(chromeHandle.onNodeChange);
chrome.bookmarks.onMoved.addListener(chromeHandle.changeParent);
