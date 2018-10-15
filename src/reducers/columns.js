import { ADD_COLUMN, SAVE_CARD, SWAP_COLUMNS, UPDATE_COLUMN } from './../actions/columns'
import columnsData from '../data/columns'
import update from 'immutability-helper'
import { List, fromJS } from 'immutable'

export default function columns (store = columnsData, action) {
  switch (action.type) {
    case SAVE_CARD:
    {
      const {columnIndex, cardIndex, nextCard} = action.payload

      if (columnIndex > -1 &&  cardIndex > -1) {
        return update(store, {
          [columnIndex]: {
            'cards': {
              [cardIndex]: {
                $merge: nextCard
              }
            }
          }
        })
      } else {
        return update(store, {
          [columnIndex]: {
            'cards': {
              $push: [nextCard]
            }
          }
        })
      }
    }
    case UPDATE_COLUMN:
    {
      const {columnIndex, nextColumn} = action.payload
      if (columnIndex > -1) {
        return update(store, {
          [columnIndex]: {
            $merge: nextColumn
          }
        })
      } else {
        return store
      }
    }
    case ADD_COLUMN:
    {
      return update(store, {
        $push: [action.payload]
      })
    }
    case SWAP_COLUMNS:
    {
      const { draggedColumnId, overColumnId } = action.payload
      const immutableStore = fromJS(store)

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
