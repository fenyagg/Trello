import { COLUMN_DRAG_END, COLUMN_DRAG_START, DndColumnState, DndColumnTypes } from "./types";

const initialStore = {
  columnId: '',
  isDragging: false
};

export default function dndColumn (store = initialStore, action: DndColumnTypes): DndColumnState {
  switch (action.type) {
    case COLUMN_DRAG_START:
      return {
        ...store,
        ...action.payload
      };
    case COLUMN_DRAG_END:
      return {
        ...store,
        ...action.payload
      };
    default:
      return store
  }
}
