import { ADD_COLUMN, CHANGE_COLUMN_POSITION, SAVE_CARD, UPDATE_COLUMN } from './../actions/columns'
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
    case CHANGE_COLUMN_POSITION:
    {
      const { columnIndex, overColumnIndex } = action.payload
      const immutableStore = fromJS(store)

      const draggedColumn = immutableStore.get(columnIndex)
      const draggedOverColumn = immutableStore.get(overColumnIndex)

      const nextStore = immutableStore
                        .delete(columnIndex)
                        .insert(columnIndex, draggedOverColumn)
                        .delete(overColumnIndex)
                        .insert(overColumnIndex, draggedColumn)

      console.log('nextStore.toJS()', nextStore.toJS())
      return nextStore.toJS()
    }
    default:
      return store
  }
};
