import { ADD_COLUMN, SAVE_CARD, SWAP_COLUMNS, UPDATE_COLUMN } from './../actions/columns'
import columnsData from '../data/columns'
import { fromJS } from 'immutable'

export default function columns (store = columnsData, action) {
  const immutableStore = fromJS(store)

  switch (action.type) {
    case SAVE_CARD:
    {
      const {columnIndex, cardIndex, nextCard} = action.payload
      if (columnIndex > -1 &&  cardIndex > -1) {
        return immutableStore.mergeIn(
          [columnIndex, 'cards', cardIndex],
          nextCard
        ).toJS()
      } else {
        return immutableStore.updateIn(
          [columnIndex, 'cards'],
          arr => arr.push(nextCard)
        ).toJS()
      }
    }
    case UPDATE_COLUMN:
    {
      const {columnIndex, nextColumn} = action.payload
      if (columnIndex > -1) {
        return immutableStore.mergeIn(
          [columnIndex], nextColumn
        ).toJS()
      } else {
        return store
      }
    }
    case ADD_COLUMN:
    {
      return immutableStore.push(action.payload).toJS()
    }
    case SWAP_COLUMNS:
    {
      const { draggedColumnId, overColumnId } = action.payload

      const draggedColumnIndex = immutableStore.findIndex(column => {
        return column.get('id') === draggedColumnId
      })
      const overColumnIndex = immutableStore.findIndex(column => {
        return column.get('id') === overColumnId
      })

      const draggedColumn = immutableStore.get(draggedColumnIndex)
      const draggedOverColumn = immutableStore.get(overColumnIndex)

      const nextStore = immutableStore
                        .delete(draggedColumnIndex)
                        .insert(draggedColumnIndex, draggedOverColumn)
                        .delete(overColumnIndex)
                        .insert(overColumnIndex, draggedColumn)

      return nextStore.toJS()
    }
    default:
      return store
  }
};
