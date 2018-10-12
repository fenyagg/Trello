
export const COLUMN_DRAG_START = 'COLUMN_DRAG_START';
export const startDraggingColumn = (columnIndex = -1) => {
  return {
    type: COLUMN_DRAG_START,
    payload: {
      columnIndex,
      isDragging: true
    }
  }
}

export const COLUMN_DRAG_END = 'COLUMN_DRAG_END'
export const endDraggingColumn = () => {
  return {
    type: COLUMN_DRAG_END,
    payload: {
      isDragging: false
    }
  }
}
