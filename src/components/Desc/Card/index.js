import React from 'react'
import './style.css'
import { openCardPopup } from '../../../actions/cardPopup'
import connect from 'react-redux/es/connect/connect'
import { endDraggingCard, startDraggingCard } from '../../../actions/dndCard'
import PropTypes from 'prop-types'
import { swapCards } from '../../../actions/columns'

class Cards extends React.PureComponent {

  onDragEnter(e) {
    const { card, dndCard, swapCards } = this.props

    if (!dndCard.isDragging || dndCard.cardId === card.id) return
    swapCards(dndCard.cardId, card.id)
  }

  render () {
    const {
      card,
      dndCard,

      startDraggingCard,
      endDraggingCard,
      openCardPopup
    } = this.props

    const cardClass = ['card-container']

    const isDraggable = dndCard.isDragging && card.id === dndCard.cardId

    if (isDraggable) cardClass.push('_dragging')

    return (
      <article
        className={cardClass.join(' ')}
        onDragEnter={e => this.onDragEnter(e)}
        onClick={openCardPopup.bind(this)}
        onDrop={endDraggingCard}
      >
        <div className="card"
             onDragStart={() => startDraggingCard(card.id)}
             onDragEnd={endDraggingCard}
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
    card: state.columns[ownProps.columnIndex]['cards'][ownProps.cardIndex],
    dndCard: state.dndCard
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openCardPopup: () => dispatch(openCardPopup(
      ownProps.columnIndex,
      ownProps.cardIndex
    )),
    startDraggingCard: (cardId)=> dispatch(startDraggingCard(cardId)),
    endDraggingCard: () => dispatch(endDraggingCard()),
    swapCards: (draggingCardId, overCardId) => dispatch(swapCards(draggingCardId, overCardId))
  }
}

Cards.propTypes = {
  card: PropTypes.object.isRequired,
  dndCard: PropTypes.object.isRequired,
  openCardPopup: PropTypes.func.isRequired,
  startDraggingCard: PropTypes.func.isRequired,
  endDraggingCard: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
