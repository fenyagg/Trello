
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
