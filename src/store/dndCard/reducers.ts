import { fromJS } from 'immutable'
import { CARD_DRAG_END, CARD_DRAG_START, DndCardState, DndCardTypes } from "./types";

const initialStore = {
  cardId: '',
  isDragging: false
};

export default function dndCard (store = initialStore, action: DndCardTypes): DndCardState {
  const immutableStore = fromJS(store);
  switch (action.type) {
    case CARD_DRAG_START:
      return immutableStore.merge({
        cardId: action.payload.cardId,
        isDragging: action.payload.isDragging
      }).toJS();
    case CARD_DRAG_END:
      return immutableStore.merge({
        isDragging: action.payload.isDragging
      }).toJS();
    default:
      return store
  }
}
