export const SET_DRAGGING_CARD = 'SET_DRAGGING_CARD';

export const setDraggingCard = (cardIndex, columnIndex) => {
  return {
    type: SET_DRAGGING_CARD,
    payload: {
      cardIndex,
      columnIndex,
      isDragging: cardIndex > 0 && columnIndex > 0
    }
  }
};
