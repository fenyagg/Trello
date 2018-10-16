
export const CARD_DRAG_START = 'CARD_DRAG_START'
export const startDraggingCard = (cardId = '') => {
  return {
    type: CARD_DRAG_START,
    payload: {
      cardId,
      isDragging: true
    }
  }
}

export const CARD_DRAG_END = 'CARD_DRAG_END'
export const endDraggingCard = () => {
  return {
    type: CARD_DRAG_END,
    payload: {
      isDragging: false
    }
  }
}
