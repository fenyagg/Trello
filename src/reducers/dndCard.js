import { SET_DRAGGING_CARD } from '../actions/dndCard'

const initialStore = {
  cardIndex: '',
  columnIndex: '',
  isDragging: false
}

export default function dndCard( store = initialStore, action) {
  switch (action.type){
    case SET_DRAGGING_CARD:
      return {
        ...action.payload
      }
    default:
      return store;
  }
}
