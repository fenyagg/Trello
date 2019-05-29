import { COLUMN_DRAG_END, COLUMN_DRAG_START } from "./types";

export const startDraggingColumn = (columnId = '') => {
  return {
    type: COLUMN_DRAG_START,
    payload: {
      columnId,
      isDragging: true
    }
  }
};

export const endDraggingColumn = () => {
  return {
    type: COLUMN_DRAG_END,
    payload: {
      isDragging: false
    }
  }
};
