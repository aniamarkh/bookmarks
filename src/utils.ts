import { store } from "./store";
import { chromeHandle } from "./chromeHandle";

export const onEnd = (evt: any) => {
  const newParent = evt.to;
  const movedNode = evt.item;
  const newIndex = evt.newIndex;

  const movedNodeId = movedNode.dataset.id;
  const newParentId = newParent.dataset.id;

  chromeHandle.moveNode(newParentId, movedNodeId, newIndex);
  store.saveToLocalStore();
};

export const validateDrop = (evt: any) => {
  const draggedElement = evt.dragged;
  if (draggedElement.classList.contains("bookmarkbody")) {
    const targetNode = evt.to;
    if (targetNode.classList.contains("categories-column")) {
      return false;
    }
  }
  return true;
};

export const modifyDragItem = (dataTransfer: DataTransfer) => {
  dataTransfer.setDragImage(document.createElement('div'), 0, 0);
};