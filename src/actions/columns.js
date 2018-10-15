
export const SAVE_CARD = 'SAVE_CARD'
export const saveCard = (columnIndex, cardIndex, nextCard) => {
  return {
    type: SAVE_CARD,
    payload: {
      columnIndex,
      cardIndex,
      nextCard
    }
  }
}

export const UPDATE_COLUMN = 'UPDATE_COLUMN'
export const saveColumn = (columnIndex = -1, nextColumn = {}) => {
  return {
    type: UPDATE_COLUMN,
    payload: {
      columnIndex,
      nextColumn
    }
  }
}

export const ADD_COLUMN = 'ADD_COLUMN'
export const addColumn = (nextColumn = {}) => {
  return {
    type: ADD_COLUMN,
    payload: nextColumn
  }
}

export const SWAP_COLUMNS = 'SWAP_COLUMNS'
export const swapColumns = ( draggedColumnId, overColumnId ) => {
 return {
   type: SWAP_COLUMNS,
   payload: {
     draggedColumnId,
     overColumnId
   }
 }
}

export const SWAP_CARDS = 'SWAP_CARDS'
export const swapCards = ( draggingCardId, overCardId ) => {
  return {
    type: SWAP_CARDS,
    payload: {
      draggingCardId,
      overCardId
    }
  }
}

export const MOVE_CARD_TO_COLUMN_START = 'MOVE_CARD_TO_COLUMN_START'
export const moveCardToColumnStart = ( cardId, columnId ) => {
  return {
    type: MOVE_CARD_TO_COLUMN_START,
    payload: {
      cardId,
      columnId
    }
  }
}

export const MOVE_CARD_TO_COLUMN_END = 'MOVE_CARD_TO_COLUMN_END'
export const moveCardToColumnEnd = ( cardId, columnId ) => {
  return {
    type: MOVE_CARD_TO_COLUMN_END,
    payload: {
      cardId,
      columnId
    }
  }
}

export const REMOVE_CARD = 'REMOVE_CARD'
export const removeCard = ( cardId ) => {
  return {
    type: REMOVE_CARD,
    payload: {
      cardId
    }
  }
}

export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const removeColumn = ( columnId ) => {
  return {
    type: REMOVE_COLUMN,
    payload: {
      columnId
    }
  }
}
