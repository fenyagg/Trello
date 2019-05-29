export interface Card {
    title: string,
    id: string,
    text: string,
}
export interface ColumnState {
    id: string,
    name: string,
    cards: Card[],
}

export const SAVE_CARD = 'SAVE_CARD';
export const UPDATE_COLUMN = 'UPDATE_COLUMN';
export const ADD_COLUMN = 'ADD_COLUMN';
export const SWAP_COLUMNS = 'SWAP_COLUMNS';
export const SWAP_CARDS = 'SWAP_CARDS';
export const MOVE_CARD_TO_COLUMN_START = 'MOVE_CARD_TO_COLUMN_START';
export const MOVE_CARD_TO_COLUMN_END = 'MOVE_CARD_TO_COLUMN_END';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

interface SaveCardAction {
    type: typeof SAVE_CARD,
    payload: {
        columnIndex: number,
        cardIndex: number,
        nextCard: Card,
    }
}
export interface SaveColumnAction {
    type: typeof UPDATE_COLUMN,
    payload: {
        columnIndex: number,
        nextColumn: ColumnState|{},
    }
}
interface AddColumnAction {
    type: typeof ADD_COLUMN,
    payload: ColumnState
}
interface SwapColumnsAction {
    type: typeof SWAP_COLUMNS,
    payload: {
        draggedColumnId: string,
        overColumnId: string,
    }
}
interface SwapCardsAction {
    type: typeof SWAP_CARDS,
    payload: {
        draggingCardId: string,
        overCardId: string,
    }
}
interface MoveCardToColumnStartAction {
    type: typeof MOVE_CARD_TO_COLUMN_START,
    payload: {
        cardId: Card['id'],
        columnId: ColumnState['id'],
    }
}
interface MoveCardToColumnEndAction {
    type: typeof MOVE_CARD_TO_COLUMN_END,
    payload: {
        cardId: Card['id'],
        columnId: ColumnState['id'],
    }
}
interface RemoveCardAction {
    type: typeof REMOVE_CARD,
    payload: {
        cardId: Card['id']
    }
}
interface RemoveColumnAction {
    type: typeof REMOVE_COLUMN,
    payload: {
        columnId: Card['id']
    }
}

export type ColumnActionTypes = SaveCardAction |
    SaveColumnAction |
    AddColumnAction |
    SwapColumnsAction |
    SwapCardsAction |
    MoveCardToColumnStartAction |
    MoveCardToColumnEndAction |
    RemoveCardAction |
    RemoveColumnAction
