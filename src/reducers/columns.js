import { SAVE_CARD, UPDATE_COLUMN } from './../actions/columns'
import columnsData from '../data/columns'
import update from 'immutability-helper'

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
      console.log('action.payload', action.payload)
      const {columnIndex, nextColumn} = action.payload
      if (columnIndex > -1) {
        return update(store, {
          [columnIndex]: {
            $merge: nextColumn
          }
        })
      } else {
        return update(store, {
          [columnIndex]: {
            $push: [nextColumn]
          }
        })
      }
    }
    default:
      return store
  }
};
