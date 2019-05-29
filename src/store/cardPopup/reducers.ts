import { CardPopupState, CardPopupTypes, CLOSE_CARD_POPUP, OPEN_CARD_POPUP } from './types'

const initialStore: CardPopupState = {
  isOpen: false,
  columnIndex: -1,
  cardIndex: -1
};

export default function cardPopup (store = initialStore, action: CardPopupTypes): CardPopupState {
  switch (action.type) {
    case OPEN_CARD_POPUP:
      return {
        ...store,
        columnIndex: action.payload.columnIndex,
        cardIndex: action.payload.cardIndex,
        isOpen: true
      };
    case CLOSE_CARD_POPUP:
      return {
        ...store,
        isOpen: false
      };
    default:
      return store
  }
}
