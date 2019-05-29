import { CLOSE_CARD_POPUP, OPEN_CARD_POPUP } from './types'

export const openCardPopup = (columnIndex = -1, cardIndex = -1) => {
  return {
    type: OPEN_CARD_POPUP,
    payload: { cardIndex, columnIndex }
  }
}

export const closeCardPopup = () => {
  return { type: CLOSE_CARD_POPUP }
}
