import { store } from "./store";
import { chromeHandle } from "./chromeHandle";
import type { Category, Bookmark } from "./types";

export const onEnd = (evt: any) => {
  const newParent = evt.to;
  const movedNode = evt.item;
  const newIndex = evt.newIndex;
  const oldIndex = evt.oldIndex;

  const movedNodeId = movedNode.dataset.id;
  const newParentId = newParent.dataset.id;

  if (newParentId === "2"
    && newParent.classList.contains("categories-column")) {
    let indexInRoot = getNewRootIndex(movedNodeId);
    // https://stackoverflow.com/questions/13264060/chrome-bookmarks-api-using-move-to-reorder-bookmarks-in-the-same-folder
    if (oldIndex < newIndex) indexInRoot++;
    chromeHandle.moveNode(newParentId, movedNodeId, indexInRoot);
  } else {
    chromeHandle.moveNode(newParentId, movedNodeId, newIndex);
  }
  store.saveToLocalStore();
};

export const modifyDragItem = (dataTransfer: DataTransfer) => {
  dataTransfer.setDragImage(document.createElement('div'), 0, 0);
};

const getNewRootIndex = (movedItemId: string): number => {
  const flatData = store.data.columns.flat();
  return flatData.map((item: Category | Bookmark) => { return item.id })
    .indexOf(movedItemId);
}