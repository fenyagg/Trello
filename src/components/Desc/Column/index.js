import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from '../Card/index'
import { openCardPopup } from '../../../store/cardPopup/actions'
import './style.css'
import {
  swapColumns,
  saveColumn,
  moveCardToColumnEnd,
  moveCardToColumnStart
} from '../../../store/column/actions'
import { endDraggingColumn, startDraggingColumn } from '../../../store/dndColumn/actions'
import { endDraggingCard } from '../../../store/dndCard/actions'

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
    if (['Enter', 'Escape'].includes(e.key)) {
      e.target.blur()
    }
  }
  onBlur = e => {
    if (!e.target.value) { e.target.value = this.props.column.name }
    this.props.saveColumn({ name: e.target.value })
  }

  prevent = e => {
    e.preventDefault()
  }

  onDragStart = e => {
    // disable dnd when name in focus
    if (this.columnNameField === document.activeElement) {
      e.preventDefault()
      return
    }

    // check if dragStart fired by child items (cards)
    if (e.target === this.columnNode) {
      this.props.startDraggingColumn(this.props.column.id)
    }
  }
  onDragEnter = e => {
    const { dndColumn, column } = this.props
    if (dndColumn.columnId === column.id || !dndColumn.isDragging) { return }
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
      moveCardToColumnStartFn,
      moveCardToColumnEndFn,
      endDraggingCardFn
    } = this.props

    const cardsList = column.cards.map((card, index) => {
      return <Card columnIndex={columnIndex} cardIndex={index} key={card.id}/>
    })

    const isDragging = dndColumn.columnId === column.id && dndColumn.isDragging
    return (
      <div className="column-wrapper"
        onDrop={endDraggingCardFn}
        onDragEnter={this.onDragEnter}>
        <div
          className={`column ${isDragging ? '_dragging' : ''}`}
          onDragEnter={this.prevent}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd.bind(this)}
          draggable="true"
          ref={columnNode => {
            this.columnNode = columnNode
          }}>
          <header
            onDragEnter={() => dndCard.isDragging && moveCardToColumnStartFn(dndCard.cardId, column.id)}
            onDrop={endDraggingCardFn}
            className="column-header">
            <input className="column-title"
              type="text"
              defaultValue={column.name}
              onKeyDown={this.keyDownColumnName}
              ref={field => {
                this.columnNameField = field
              }}
              onBlur={this.onBlur}/>
          </header>
          <main className="column-cards">
            <div className="card-list">
              {cardsList}
            </div>
          </main>
          <footer className="column-footer"
            onDragEnter={() => dndCard.isDragging && moveCardToColumnEndFn(dndCard.cardId, column.id)}
            onDrop={endDraggingCardFn}
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
    column: state.reducers[ownProps.columnIndex],
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
    moveCardToColumnStartFn: (cardId, columnId) => dispatch(moveCardToColumnStart(cardId, columnId)),
    moveCardToColumnEndFn: (cardId, columnId) => dispatch(moveCardToColumnEnd(cardId, columnId)),
    endDraggingCardFn: () => dispatch(endDraggingCard())
  }
}

Columns.propTypes = {
  column: PropTypes.object.isRequired,
  dndColumn: PropTypes.object.isRequired,
  dndCard: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  openNewCardPopup: PropTypes.func.isRequired,
  saveColumn: PropTypes.func.isRequired,
  startDraggingColumn: PropTypes.func.isRequired,
  endDraggingColumn: PropTypes.func.isRequired,
  swapColumns: PropTypes.func.isRequired,
  justAdded: PropTypes.bool.isRequired,
  moveCardToColumnStartFn: PropTypes.func.isRequired,
  moveCardToColumnEndFn: PropTypes.func.isRequired,
  endDraggingCardFn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
