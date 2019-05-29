import {
  ADD_COLUMN,
  Card,
  ColumnActionTypes, ColumnState,
  MOVE_CARD_TO_COLUMN_END,
  MOVE_CARD_TO_COLUMN_START,
  REMOVE_CARD,
  REMOVE_COLUMN,
  SAVE_CARD,
  SWAP_CARDS,
  SWAP_COLUMNS,
  UPDATE_COLUMN
} from './types'

export const saveCard = (
    columnIndex: number,
    cardIndex: number,
    nextCard: Card): ColumnActionTypes => {
  return {
    type: SAVE_CARD,
    payload: {
      columnIndex,
      cardIndex,
      nextCard
    }
  }
};

export const saveColumn = (columnIndex = -1, nextColumn = {}): ColumnActionTypes => {
  return {
    type: UPDATE_COLUMN,
    payload: {
      columnIndex,
      nextColumn
    }
  }
};

export const addColumn = (nextColumn:ColumnState): ColumnActionTypes => {
  return {
    type: ADD_COLUMN,
    payload: nextColumn
  }
};

export const swapColumns = (draggedColumnId: string, overColumnId: string): ColumnActionTypes => {
  return {
    type: SWAP_COLUMNS,
    payload: {
      draggedColumnId,
      overColumnId
    }
  }
};

export const swapCards = (draggingCardId: Card['id'], overCardId: Card['id']): ColumnActionTypes => {
  return {
    type: SWAP_CARDS,
    payload: {
      draggingCardId,
      overCardId
    }
  }
};

export const moveCardToColumnStart = (cardId: Card['id'], columnId: ColumnState['id']): ColumnActionTypes => {
  return {
    type: MOVE_CARD_TO_COLUMN_START,
    payload: {
      cardId,
      columnId
    }
  }
};

export const moveCardToColumnEnd = (cardId:Card['id'], columnId: ColumnState['id']): ColumnActionTypes => {
  return {
    type: MOVE_CARD_TO_COLUMN_END,
    payload: {
      cardId,
      columnId
    }
  }
};

export const removeCard = (cardId: Card['id']): ColumnActionTypes => {
  return {
    type: REMOVE_CARD,
    payload: {
      cardId
    }
  }
};

export const removeColumn = (columnId: ColumnState['id']): ColumnActionTypes => {
  return {
    type: REMOVE_COLUMN,
    payload: {
      columnId
    }
  }
};
