import { SET_DRAGGING_COLUMN } from '../actions/dndColumn'

const initialStore = {
  columnIndex: '',
  isDragging: false
}

export default function dndColumn( store = initialStore, action) {
  switch (action.type){
    case SET_DRAGGING_COLUMN:
      return {
        ...action.payload
      }
    default:
      return store;
  }
}
