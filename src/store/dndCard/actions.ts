import { CARD_DRAG_END, CARD_DRAG_START, DndCardTypes } from "./types";

export const startDraggingCard = (cardId = ''): DndCardTypes => {
  return {
    type: CARD_DRAG_START,
    payload: {
      cardId,
      isDragging: true
    }
  }
};

export const endDraggingCard = (): DndCardTypes => {
  return {
    type: CARD_DRAG_END,
    payload: {
      isDragging: false
    }
  }
};
