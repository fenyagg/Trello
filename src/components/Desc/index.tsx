import { clone } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from "../../store";
import { addColumn } from '../../store/column/actions'
import AnimateComponent from '../AnimateComponent'
import CardDetail from './CardDetail'
import Column from './Column'

interface Props {
  cardPopup: AppState['cardPopup'],
  columns: AppState['columns'],
  addColumn: typeof addColumn,
}
interface State {
  openCardColumnIndex: number,
  openCardIndex: number,
  cardPopup: boolean,
  draggedCardColumnIndex: number,
  draggedCardIndex: number,
  draggedColumn: number,
}

class Desc extends Component<Props, State> {
  private lastAddedId: number|string = 0;

  constructor (props: Props) {
    super(props);

    this.state = {
      openCardColumnIndex: -1,
      openCardIndex: -1,
      cardPopup: false,
      draggedCardColumnIndex: -1,
      draggedCardIndex: -1,
      draggedColumn: -1
    }
  }

  cardDragAndDrop = {
    onDragEnd: () => {
      this.setState({
        'draggedCardColumnIndex': -1,
        'draggedCardIndex': -1,
        'draggedColumn': -1
      })
    },

    onDragEnter: (overColumnIndex: number, overCardIndex: number): void => {
      if (this.state.draggedCardColumnIndex === -1 ||
        this.state.draggedCardIndex === -1 ||
        (this.state.draggedCardColumnIndex === overColumnIndex &&
          this.state.draggedCardIndex === overCardIndex)) { return true }

      this.cardDragAndDrop.changeCardPosition.call(this, overColumnIndex, overCardIndex)
    },
    onDragStart: (columnIndex: number, cardIndex: number) => {
      this.setState({
        'draggedCardColumnIndex': columnIndex,
        'draggedCardIndex': cardIndex
      })
    },
    onEnterColumn: (columnIndex: number, position: number) => {
      this.cardDragAndDrop.changeCardPosition.call(this, columnIndex, position)
    },
    changeCardPosition (newColumn, newIndex) {
      if ((this.state.draggedCardColumnIndex === -1 &&
        this.state.draggedCardIndex === -1) ||
        (this.state.draggedCardColumnIndex === newColumn &&
          this.state.draggedCardIndex === newIndex)
      ) { return }

      let cloneColumns = clone(this.state.reducers)

      newIndex = newIndex > cloneColumns[newColumn].cards.length - 1 ? cloneColumns[newColumn].cards.length - 1 : newIndex
      newIndex = newIndex < 0 ? 0 : newIndex

      // cut dragged card
      let draggedCard = cloneColumns[this.state.draggedCardColumnIndex].cards.splice(this.state.draggedCardIndex, 1)[0]

      // put in new column
      cloneColumns[newColumn].cards.splice(newIndex, 0, draggedCard)

      this.setState({
        'draggedCardColumnIndex': newColumn,
        'draggedCardIndex': newIndex,
        'columns': cloneColumns
      })
    }
  };

  columnDragAndDrop = {
    onDragEnd: () => {
      this.setState({
        'draggedColumn': -1
      })
    },
    onDragStart: (columnIndex) => {
      this.setState({
        'draggedColumn': columnIndex
      })
    },
    onDragEnter: (overColumnIndex) => {
      if (this.state.draggedColumn === -1 ||
        this.state.draggedColumn === overColumnIndex) { return true }

      // calc new index
      let newIndex = overColumnIndex // + posDiff;
      newIndex = newIndex > this.state.reducers.length - 1 ? this.state.reducers.length - 1 : newIndex
      newIndex = newIndex < 0 ? 0 : newIndex

      if (newIndex === this.state.draggedColumn) { return true }

      let cloneColumns = clone(this.state.reducers)

      // cut dragged column
      let draggedColumn = cloneColumns.splice(this.state.draggedColumn, 1)[0]

      // put column
      cloneColumns.splice(newIndex, 0, draggedColumn)

      this.setState({
        columns: cloneColumns,
        draggedColumn: newIndex,
        cards: []
      })
    }
  };

  private addColumnHandler () {
    this.lastAddedId = 'column-' + (new Date().getTime())
    this.props.addColumn({
      name: 'Новая колонка',
      id: this.lastAddedId,
      cards: []
    })
  }

  render () {
    const { cardPopup, columns } = this.props

    return (
      <React.Fragment>

        <AnimateComponent
          isMounted={cardPopup.isOpen}
          animation={'fade'}
          mountDelay={300}
          unmountDelay={300}>
          <CardDetail />
        </AnimateComponent>

        <div className="columns-list">

          {columns.map((column, index) => {
            return <Column
              key={column.id}
              columnIndex={index}
              onCardDragStart = {this.cardDragAndDrop.onDragStart.bind(this, index)}
              onCardDragEnd = {this.cardDragAndDrop.onDragEnd.bind(this, index)}
              onCardDragEnter = {this.cardDragAndDrop.onDragEnter.bind(this, index)}
              onCardEnterColumn = {this.cardDragAndDrop.onEnterColumn.bind(this, index)}

              draggedCardColumnIndex = {this.state.draggedCardColumnIndex}
              draggedCardIndex = {this.state.draggedCardIndex}

              onDragEnter = {this.columnDragAndDrop.onDragEnter.bind(this, index)}
              onDragStart = {this.columnDragAndDrop.onDragStart.bind(this, index)}
              onDragEnd = {this.columnDragAndDrop.onDragEnd.bind(this, index)}
              justAdded = {this.lastAddedId === column.id}
            />
          })}

          <a href="#"
            onClick={() => this.addColumnHandler()}
            className="add-column-link">
            + Добавить еще 1 колонку
          </a>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    cardPopup: state.cardPopup,
    columns: state.columns
  }
}

export default connect(
  mapStateToProps,
  {addColumn}
)(Desc)
