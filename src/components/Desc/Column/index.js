import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from '../Card/index'
import { openCardPopup } from '../../../actions/cardPopup'
import './style.css'
import {
  swapColumns,
  saveColumn,
  moveCardToColumnEnd,
  moveCardToColumnStart
} from '../../../actions/columns'
import { endDraggingColumn, startDraggingColumn } from '../../../actions/dndColumn'
import { endDraggingCard } from '../../../actions/dndCard'

class Columns extends React.Component {
  justAdded = false
  columnNameField

  constructor (props) {
    super(props)
    this.justAdded = props.justAdded
  }

  componentDidMount () {
    if (this.justAdded && this.columnNameField) {
      this.columnNameField.focus()
      this.justAdded = false
    }
  }

  keyDownColumnName = e => {
    if (['Enter', 'Escape'].includes(e.key))
      e.target.blur()
  }
  onBlur = e => {
    if (!e.target.value) e.target.value = this.props.column.name
    this.props.saveColumn({name: e.target.value})
  }

  prevent = e => {
    e.preventDefault()
  }

  onDragStart = e => {
    // disable dnd when name in focus
    if (this.columnNameField === document.activeElement){
      e.preventDefault()
      return
    }

    // check if dragStart fired by child items (cards)
    if (e.target === this.columnNode)
      this.props.startDraggingColumn(this.props.column.id)
  }
  onDragEnter = e => {
    const { dndColumn, column } = this.props
    if (dndColumn.columnId === column.id || !dndColumn.isDragging) return
    this.props.swapColumns(dndColumn.columnId, column.id)
  }
  onDragEnd = () => {
    this.props.endDraggingColumn()
  }

  render () {
    const {
      columnIndex,
      column,
      dndColumn,
      dndCard,

      openNewCardPopup,
      onCardDragStart,
      onCardDragEnd,
      onCardDragEnter,
      moveCardToColumnStart,
      moveCardToColumnEnd,
      endDraggingCard
    } = this.props

    const cardsList = column.cards.map((card, index) => {
      return <Card
        onCardDragStart={onCardDragStart.bind(this, index)}
        onDragEnd={onCardDragEnd.bind(this, index)}
        onDragEnter={onCardDragEnter.bind(this, index)}
        columnIndex={columnIndex}
        cardIndex={index}
        key={card.id}/>
    })

    const isDragging = dndColumn.columnId === column.id && dndColumn.isDragging
    return (
      <div className="column-wrapper"
           onDrop={endDraggingCard}
           onDragEnter={this.onDragEnter} >
        <div
          className={`column ${isDragging ? '_dragging':''}`}
          onDragEnter={this.prevent}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd.bind(this)}
          draggable="true"
          ref={columnNode => {this.columnNode = columnNode}} >
          <header
            onDragEnter={() => dndCard.isDragging && moveCardToColumnStart(dndCard.cardId, column.id)}
            onDrop={endDraggingCard}
            className="column-header">
            <input className="column-title"
                   type="text"
                   defaultValue={column.name}
                   onKeyDown={this.keyDownColumnName}
                   ref={ field => {this.columnNameField = field}}
                   onBlur={this.onBlur}/>
          </header>
          <main className="column-cards">
            <div className="card-list">
              {cardsList}
            </div>
          </main>
          <footer className="column-footer"
                  onDragEnter={() => dndCard.isDragging && moveCardToColumnEnd(dndCard.cardId, column.id)}
                  onDrop={endDraggingCard}
          >
            <a href="#0"
               draggable="false"
               onClick={e => {
                 e.preventDefault()
                 openNewCardPopup()
               }}
               className="add-task-link">+ Добавить еще 1 карточку</a>
          </footer>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    column: state.columns[ownProps.columnIndex],
    dndColumn: state.dndColumn,
    dndCard: state.dndCard
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openNewCardPopup: () => dispatch(openCardPopup(ownProps.columnIndex, -1)),
    saveColumn: (column) => dispatch(saveColumn(ownProps.columnIndex, column)),
    startDraggingColumn: (columnId) => dispatch(startDraggingColumn(columnId)),
    endDraggingColumn: () => dispatch(endDraggingColumn()),
    swapColumns: (draggedColumnId, overColumnId) => dispatch(swapColumns(draggedColumnId, overColumnId)),
    moveCardToColumnStart: (cardId, columnId) => dispatch(moveCardToColumnStart(cardId, columnId)),
    moveCardToColumnEnd: (cardId, columnId) => dispatch(moveCardToColumnEnd(cardId, columnId)),
    endDraggingCard: () => dispatch(endDraggingCard())
  }
}

Columns.proptypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  saveColumn: PropTypes.func.isRequired,
  openNewCardPopup: PropTypes.func.isRequired,
  justAdded: PropTypes.bool.isRequired,
  moveCardToColumnStart: PropTypes.func.isRequired,
  moveCardToColumnEnd: PropTypes.func.isRequired,
  endDraggingCard: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
