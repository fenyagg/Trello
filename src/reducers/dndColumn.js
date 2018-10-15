import { COLUMN_DRAG_START, COLUMN_DRAG_END } from '../actions/dndColumn'

const initialStore = {
  columnId: '',
  isDragging: false
}

export default function dndColumn( store = initialStore, action) {
  switch (action.type){
    case COLUMN_DRAG_START:
      return {
        ...store,
        ...action.payload
      }
    case COLUMN_DRAG_END:
      return {
        ...store,
        ...action.payload
      }
    default:
      return store;
  }
}
