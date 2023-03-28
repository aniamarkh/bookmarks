import type { ChromeHandle, ChangeInfo, Bookmark, Category } from "./types";
import { store } from "./store";

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

  moveNode(newParentId: string, movedNodeId: string, newIndex: number): void {
    chrome.bookmarks.move(movedNodeId, { index: newIndex, parentId: newParentId });
  },

  onNodeChange(id: string, changeInfo: ChangeInfo) {
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
  }
}

chrome.bookmarks.onChanged.addListener(chromeHandle.onNodeChange);