import React from 'react'
import './style.css'
import { openCardPopup } from '../../../actions/cardPopup'
import connect from 'react-redux/es/connect/connect'

class Cards extends React.Component {

  render () {
    const {card,
      columnIndex,
      cardIndex,
      openCardPopup,
      onCardDragStart,
      onDragEnter,
      isDraggable,
      onDragEnd} = this.props

    const cardClass = ['card-container']
    if (isDraggable) cardClass.push('_dragging')

    return (
      <article
        className={cardClass.join(' ')}
        onDragEnter={onDragEnter}
        onClick={openCardPopup.bind(this)}
      >
        <div className="card"
             onDragStart={onCardDragStart}
             onDragEnd={onDragEnd}
             draggable="true"
        >
          <div className="card-title">{card.title}</div>
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.columns[ownProps.columnIndex]['cards'][ownProps.cardIndex]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openCardPopup: () => dispatch(openCardPopup(
      ownProps.columnIndex,
      ownProps.cardIndex
    ))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cards)
