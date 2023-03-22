import type { ChromeHandle } from "./types";

export const chromeHandle: ChromeHandle = {
  moveNode(newParentId: string, movedNodeId: string, newIndex: number): void {
    chrome.bookmarks.move(movedNodeId, { index: newIndex, parentId: newParentId });
  },
}