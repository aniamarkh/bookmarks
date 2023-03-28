import type { ChromeHandle, ChangeInfo } from "./types";
import { store } from "./store";

export const chromeHandle: ChromeHandle = {
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