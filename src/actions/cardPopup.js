export const OPEN_CARD_POPUP = 'OPEN_CARD_POPUP'
export const CLOSE_CARD_POPUP = 'CLOSE_CARD_POPUP'

export const openCardPopup = (columnIndex = -1, cardIndex = -1) => {
  return {
    type: OPEN_CARD_POPUP,
    payload: { columnIndex, cardIndex }
  }
}

export const closeCardPopup = () => {
  return { type: 'CLOSE_CARD_POPUP' }
}
