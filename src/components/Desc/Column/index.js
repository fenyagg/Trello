import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from '../Card/index'
import { openCardPopup } from '../../../actions/cardPopup'
import './style.css'
import { changeColumnPosition, saveColumn } from '../../../actions/columns'
import { endDraggingColumn, setDraggingColumn, startDraggingColumn } from '../../../actions/dndColumn'

class Columns extends React.PureComponent {
  justAdded = false
  columnNameField

  constructor (props) {
    super(props)

    this.state = {
      isDragging: false,
    }
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

  // drag and drop cursor fix
  onDragEnter = e => {
    e.preventDefault()
  }

  onDragStart = e => {
    // dont fire on drag card
    // if (e.target.className === 'column')
      this.props.startDraggingColumn(this.props.columnIndex)
  }
  onDragEnter = e => {
    const { dndColumn, columnIndex } = this.props

    if (dndColumn.columnIndex === columnIndex || !dndColumn.isDragging) return
    this.props.startDraggingColumn(columnIndex)
    this.props.changeColumnPosition(dndColumn.columnIndex, columnIndex)
  }
  onDragEnd = () => {
    this.props.endDraggingColumn()
  }

  render () {
    const {
      column,
      dndColumn,

      openNewCardPopup,
      onCardDragStart,
      onCardDragEnd,
      onCardEnterColumn,
      onCardDragEnter,
      columnIndex,
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

    const isDragging = dndColumn.columnIndex === columnIndex && dndColumn.isDragging
    return (
      <div className="column-wrapper"
           onDragEnter={e => this.onDragEnter(e)} >
        <div
          className={`column ${isDragging ? '_dragging':''}`}
          onDragEnter={this.onDragEnter}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd.bind(this)}
          draggable="true"
        >
          <header
            onDragEnter={onCardEnterColumn.bind(this, columnIndex, 0)}
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
                  onDragEnter={onCardEnterColumn.bind(this, columnIndex, column.cards.length)}>
            <a href="#0"
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
    dndColumn: state.dndColumn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openNewCardPopup: () => dispatch(openCardPopup(ownProps.columnIndex, -1)),
    saveColumn: (column) => dispatch(saveColumn(ownProps.columnIndex, column)),
    startDraggingColumn: (columnIndex) => dispatch(startDraggingColumn(columnIndex)),
    endDraggingColumn: () => dispatch(endDraggingColumn()),
    changeColumnPosition: (columnIndex, overColumnIndex) => dispatch(changeColumnPosition(columnIndex, overColumnIndex))
  }
}

Columns.proptypes = {
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired,
  saveColumn: PropTypes.func.isRequired,
  openNewCardPopup: PropTypes.func.isRequired,
  justAdded: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)
