import {
  ADD_COLUMN, MOVE_CARD_TO_COLUMN_END,
  MOVE_CARD_TO_COLUMN_START, REMOVE_CARD, REMOVE_COLUMN,
  SAVE_CARD,
  SWAP_CARDS,
  SWAP_COLUMNS,
  UPDATE_COLUMN
} from './../actions/columns'
import columnsData from '../data/columns'
import { fromJS } from 'immutable'

export default function columns (store = columnsData, action) {
  const immutableStore = fromJS(store)

  switch (action.type) {
    case SAVE_CARD:
    {
      const { columnIndex, cardIndex, nextCard } = action.payload
      if (columnIndex > -1 && cardIndex > -1) {
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
      const { columnIndex, nextColumn } = action.payload
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
    case SWAP_CARDS:
    {
      const { draggingCardId, overCardId } = action.payload

      let draggingCardIndex = -1
      let overCardIndex = -1

      const draggingCardColumnIndex = immutableStore.findIndex(column => {
        let tempCardIndex = column.get('cards').findIndex(card => {
          return card.get('id') === draggingCardId
        })
        if (tempCardIndex > -1) draggingCardIndex = tempCardIndex
        return tempCardIndex > -1
      })

      const overCardColumnIndex = immutableStore.findIndex(column => {
        let tempCardIndex = column.get('cards').findIndex(card => {
          return card.get('id') === overCardId
        })
        if (tempCardIndex > -1) overCardIndex = tempCardIndex
        return tempCardIndex > -1
      })

      const draggingCard = immutableStore.getIn([draggingCardColumnIndex, 'cards', draggingCardIndex])

      const nextStore = immutableStore
        .deleteIn([draggingCardColumnIndex, 'cards', draggingCardIndex])
        .updateIn([overCardColumnIndex, 'cards'], cardsList => {
          return cardsList.splice(overCardIndex, 0, draggingCard)
        })

      return nextStore.toJS()
    }
    case MOVE_CARD_TO_COLUMN_START:
    {
      const { cardId, columnId } = action.payload
      const pushColumnIndex = immutableStore.findIndex(column => column.get('id') === columnId)

      let cardIndex = -1
      const cardColumnIndex = immutableStore.findIndex(column => {
        let tempCardIndex = column.get('cards').findIndex(card => card.get('id') === cardId)
        if (tempCardIndex > -1) cardIndex = tempCardIndex
        return tempCardIndex > -1
      })

      const draggingCard = immutableStore.getIn([cardColumnIndex, 'cards', cardIndex])

      return immutableStore
        .deleteIn([cardColumnIndex, 'cards', cardIndex])
        .updateIn([pushColumnIndex, 'cards'], cardsList => cardsList.unshift(draggingCard))
        .toJS()
    }
    case MOVE_CARD_TO_COLUMN_END:
    {
      const { cardId, columnId } = action.payload
      const pushColumnIndex = immutableStore.findIndex(column => column.get('id') === columnId)

      let cardIndex = -1
      const cardColumnIndex = immutableStore.findIndex(column => {
        let tempCardIndex = column.get('cards').findIndex(card => card.get('id') === cardId)
        if (tempCardIndex > -1) cardIndex = tempCardIndex
        return tempCardIndex > -1
      })

      const draggingCard = immutableStore.getIn([cardColumnIndex, 'cards', cardIndex])

      return immutableStore
        .deleteIn([cardColumnIndex, 'cards', cardIndex])
        .updateIn([pushColumnIndex, 'cards'], cardsList => cardsList.push(draggingCard))
        .toJS()
    }
    case REMOVE_CARD:
    {
      const { cardId } = action.payload

      let cardIndex = -1
      const cardColumnIndex = immutableStore.findIndex(column => {
        let tempCardIndex = column.get('cards').findIndex(card => card.get('id') === cardId)
        if (tempCardIndex > -1) cardIndex = tempCardIndex
        return tempCardIndex > -1
      })

      return immutableStore.deleteIn([cardColumnIndex, 'cards', cardIndex]).toJS()
    }
    case REMOVE_COLUMN:
    {
      const { columnId } = action.payload
      const columnIndex = immutableStore.findIndex(column => column.get('id') === columnId)
      return immutableStore.delete(columnIndex).toJS()
    }
    default:
      return store
  }
};
