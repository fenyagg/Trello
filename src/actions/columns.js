
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
export const saveColumn = (columnIndex, nextColumn) => {
  return {
    type: UPDATE_COLUMN,
    payload: {
      columnIndex,
      nextColumn
    }
  }
}
