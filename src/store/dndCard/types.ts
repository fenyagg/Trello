import { Card } from "../column/types";

export interface DndCardState {
    cardId: Card['id'],
    isDragging: boolean,
}

export const CARD_DRAG_END = 'CARD_DRAG_END';
export const CARD_DRAG_START = 'CARD_DRAG_START';

interface CardDragStartAction {
    type: typeof CARD_DRAG_START,
    payload: {
        cardId: Card['id'],
        isDragging: boolean,
    }
}

interface CardDragEndAction {
    type: typeof CARD_DRAG_END,
    payload: {
        isDragging: boolean,
    }
}

export type DndCardTypes = CardDragStartAction | CardDragEndAction
