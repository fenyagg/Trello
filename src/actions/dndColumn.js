
export const COLUMN_DRAG_START = 'COLUMN_DRAG_START'
export const startDraggingColumn = (columnId = '') => {
  return {
    type: COLUMN_DRAG_START,
    payload: {
      columnId,
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
