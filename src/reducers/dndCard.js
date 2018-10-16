import { CARD_DRAG_END, CARD_DRAG_START } from '../actions/dndCard'
import { fromJS } from 'immutable'

const initialStore = {
  cardId: '',
  isDragging: false
}

export default function dndCard (store = initialStore, action) {
  const immutableStore = fromJS(store)
  switch (action.type) {
    case CARD_DRAG_START:
      return immutableStore.merge({
        cardId: action.payload.cardId,
        isDragging: action.payload.isDragging
      }).toJS()
    case CARD_DRAG_END:
      return immutableStore.merge({
        isDragging: action.payload.isDragging
      }).toJS()
    default:
      return store
  }
}
