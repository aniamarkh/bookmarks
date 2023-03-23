import { store } from "./store";
import { chromeHandle } from "./chromeHandle";
import type { Category, Bookmark } from "./types";

export const onDragEnd = (evt: any) => {
  const oldParent = evt.from;
  const newParent = evt.to;
  const movedNode = evt.item;

  const oldIndex = evt.oldIndex;
  const movedNodeId = movedNode.dataset.id;
  const newParentId = newParent.dataset.id;
  const oldParentId = oldParent.dataset.id;
  if (newParentId === "2"
    && newParent.classList.contains("categories-column")) {
    let newIndexInRoot = getNewRootIndex(movedNodeId);
    if (oldParentId === newParentId) {
      const oldIndexInRoot = getOldIndexInRoot(oldIndex, oldParent.dataset.column);
      // https://stackoverflow.com/questions/13264060/chrome-bookmarks-api-using-move-to-reorder-bookmarks-in-the-same-folder
      if (oldIndexInRoot < newIndexInRoot) newIndexInRoot++;
    }
    chromeHandle.moveNode(newParentId, movedNodeId, newIndexInRoot);
  } else {
    let newIndex = evt.newIndex;
    if (oldParentId === newParentId) {
      if (oldIndex < newIndex) newIndex++;
    }
    chromeHandle.moveNode(newParentId, movedNodeId, newIndex);
  }
  store.saveToLocalStore();
};

export const modifyDragItem = (dataTransfer: DataTransfer) => {
  dataTransfer.setDragImage(document.createElement('div'), 0, 0);
};

const getOldIndexInRoot = (oldIndex: number, columnIndex: number): number => {
  let oldRootIndex = 0;
  for (let column = 0; column < columnIndex; column++) {
    oldRootIndex += store.data.columns[column].length;
  }
  return (oldRootIndex + oldIndex);
}

const getNewRootIndex = (movedItemId: string): number => {
  const flatData = store.data.columns.flat();
  return flatData.map((item: Category | Bookmark) => { return item.id })
    .indexOf(movedItemId);
}