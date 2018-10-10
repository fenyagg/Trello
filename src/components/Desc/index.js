import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CardDetail from './CardDetail'
import Column from './Column'
import { clone } from 'lodash/lang'
import {openCardPopup, closeCardPopup, saveCardPopup} from '../../actions/cardPopup';

class Desc extends Component {
  constructor (props) {
    super(props)

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
      });
    },

    onDragEnter: (overColumnIndex, overCardIndex) => {
      if (this.state.draggedCardColumnIndex === -1 ||
        this.state.draggedCardIndex === -1 ||
        (this.state.draggedCardColumnIndex === overColumnIndex &&
          this.state.draggedCardIndex === overCardIndex))  return true;

      this.cardDragAndDrop.changeCardPosition.call(this, overColumnIndex, overCardIndex);
    },
    onDragStart: (columnIndex, cardIndex) => {
      this.setState({
        'draggedCardColumnIndex': columnIndex,
        'draggedCardIndex': cardIndex,
      });
    },
    onEnterColumn: (columnIndex, position) => {
      this.cardDragAndDrop.changeCardPosition.call(this, columnIndex, position);
    },
    changeCardPosition(newColumn, newIndex){
      if ( (this.state.draggedCardColumnIndex === -1 &&
        this.state.draggedCardIndex === -1) ||
        (this.state.draggedCardColumnIndex === newColumn &&
          this.state.draggedCardIndex === newIndex)
      ) return;

      let cloneColumns = clone(this.state.columns);

      newIndex = newIndex > cloneColumns[newColumn]['cards'].length-1 ? cloneColumns[newColumn]['cards'].length-1 : newIndex;
      newIndex = newIndex < 0 ? 0 : newIndex;

      // cut dragged card
      let draggedCard = cloneColumns[this.state.draggedCardColumnIndex]['cards'].splice(this.state.draggedCardIndex, 1)[0];

      // put in new column
      cloneColumns[newColumn]['cards'].splice(newIndex, 0, draggedCard);

      this.setState({
        'draggedCardColumnIndex': newColumn,
        'draggedCardIndex': newIndex,
        'columns': cloneColumns
      });
    }
  };

  columnDragAndDrop = {
    onDragEnd: () => {
      this.setState({
        'draggedColumn': -1,
      });
    },
    onDragStart: (columnIndex) => {
      this.setState({
        'draggedColumn': columnIndex,
      });
    },
    onDragEnter: (overColumnIndex) => {
      if (this.state.draggedColumn === -1 ||
        this.state.draggedColumn === overColumnIndex )  return true;

      // calc new index
      let newIndex = overColumnIndex; // + posDiff;
      newIndex = newIndex > this.state.columns.length-1 ? this.state.columns.length-1 : newIndex;
      newIndex = newIndex < 0 ? 0 : newIndex;

      if (newIndex === this.state.draggedColumn ) return true;

      let cloneColumns = clone(this.state.columns);

      // cut dragged column
      let draggedColumn = cloneColumns.splice(this.state.draggedColumn, 1)[0];

      // put column
      cloneColumns.splice(newIndex, 0, draggedColumn);

      this.setState({
        'columns': cloneColumns,
        'draggedColumn': newIndex,
      });
    }
  };

  addColumn = event => {
    event.preventDefault();
    this.setState({
      columns: [
        ...this.state.columns,
        {
          'name': 'Новая колонка',
          'id': 'column-'+(new Date().getTime()),
          'cards': []
        }
      ]
    });
  };
  openCard = (columnIndex, cardIndex ) => {
    this.setState({
      openCardColumnIndex: columnIndex,
      openCardIndex: cardIndex,
      cardPopup: true,
    });
  };
  closeCard = () => {
    this.setState({
      openCardColumnIndex: -1,
      openCardIndex: -1,
      cardPopup: false,
    });
  };
  saveCard = card => {
    if (this.state.openCardColumnIndex > -1) {
      let columns = this.state.columns;
      // change card data
      if (card.id && this.state.openCardIndex > -1) {
        columns[this.state.openCardColumnIndex]['cards'][this.state.openCardIndex] = card;
        this.setState({'columns': columns});
      } else { // new card
        // todo set state
        this.state.columns[this.state.openCardColumnIndex].cards.push(card);
      }
    }
  };

  render () {
    const { cardPopup, columns, openCardPopup, closeCardPopup, saveCardPopup } = this.props

    const renderColumns = columns.map((column, index) => {
      return 	<Column
        column={column}
        key={column.id}
        index={index}
        onCardDragStart = {this.cardDragAndDrop.onDragStart.bind(this, index)}
        onCardDragEnd = {this.cardDragAndDrop.onDragEnd.bind(this, index)}
        onCardDragEnter = {this.cardDragAndDrop.onDragEnter.bind(this, index)}
        onCardEnterColumn = {this.cardDragAndDrop.onEnterColumn.bind(this, index)}

        draggedCardColumnIndex = {this.state.draggedCardColumnIndex}
        draggedCardIndex = {this.state.draggedCardIndex}

        onDragEnter = {this.columnDragAndDrop.onDragEnter.bind(this, index)}
        onDragStart = {this.columnDragAndDrop.onDragStart.bind(this, index)}
        onDragEnd = {this.columnDragAndDrop.onDragEnd.bind(this, index)}
      />
    });

    return (
      <React.Fragment>
        {cardPopup.isOpen ? (
          <CardDetail
            card = {this.state.columns[cardPopup.columnIndex]['cards'][cardPopup.cardIndex] || {}} />
        ) : ''}

        <div className="columns-list">
          {renderColumns}

          <a href="#0"
             onClick={this.addColumn}
             className="add-column-link">
            + Добавить еще 1 колонку
          </a>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    cardPopup: state.cardPopup,
    columns: state.columns
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openCardPopup: (columnIndex, cardIndex) => dispatch(openCardPopup({columnIndex, cardIndex})),
    closeCardPopup: () => dispatch(closeCardPopup()),
    saveCardPopup: () => dispatch(saveCardPopup()),
  }
}

Desc.propTypes = {
  cardPopup: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desc)
