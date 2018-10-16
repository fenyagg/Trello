import { OPEN_CARD_POPUP, CLOSE_CARD_POPUP } from './../actions/cardPopup'

const initialStore = {
  isOpen: false,
  columnIndex: -1,
  cardIndex: -1
}

export default function cardPopup (store = initialStore, action) {
  switch (action.type) {
    case OPEN_CARD_POPUP:
      return {
        ...store,
        columnIndex: action.payload.columnIndex,
        cardIndex: action.payload.cardIndex,
        isOpen: true
      }
    case CLOSE_CARD_POPUP:
      return {
        ...store,
        isOpen: false
      }
    default:
      return store
  }
}
