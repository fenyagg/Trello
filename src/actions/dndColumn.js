export const SET_DRAGGING_COLUMN = 'SET_DRAGGING_COLUMN';

export const setDraggingColumn = (columnIndex) => {
  return {
    type: SET_DRAGGING_COLUMN,
    payload: {
      columnIndex,
      isDragging: columnIndex > 0
    }
  }
}
