import React from 'react'
import './style.css'
import { openCardPopup } from '../../../store/cardPopup/actions'
import connect from 'react-redux/es/connect/connect'
import { endDraggingCard, startDraggingCard } from '../../../store/dndCard/actions'
import PropTypes from 'prop-types'
import { swapCards } from '../../../store/column/actions'

class Cards extends React.PureComponent {
  onDragEnter (e) {
    const { card, dndCard, swapCardsFunction } = this.props

    if (!dndCard.isDragging || dndCard.cardId === card.id) { return }
    swapCardsFunction(dndCard.cardId, card.id)
  }

  render () {
    const {
      card,
      dndCard,

      startDraggingCardFunction,
      endDraggingCardFunction,
      openCardPopupFunction
    } = this.props

    const cardClass = ['card-container']

    const isDraggable = dndCard.isDragging && card.id === dndCard.cardId

    if (isDraggable) { cardClass.push('_dragging') }

    return (
      <article
        className={cardClass.join(' ')}
        onDragEnter={e => this.onDragEnter(e)}
        onClick={openCardPopupFunction.bind(this)}
        onDrop={endDraggingCardFunction}
      >
        <div className="card"
          onDragStart={() => startDraggingCardFunction(card.id)}
          onDragEnd={endDraggingCardFunction}
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
    card: state.reducers[ownProps.columnIndex].cards[ownProps.cardIndex],
    dndCard: state.dndCard
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openCardPopupFunction: () => dispatch(openCardPopup(
      ownProps.columnIndex,
      ownProps.cardIndex
    )),
    startDraggingCardFunction: (cardId) => dispatch(startDraggingCard(cardId)),
    endDraggingCardFunction: () => dispatch(endDraggingCard()),
    swapCardsFunction: (draggingCardId, overCardId) => dispatch(swapCards(draggingCardId, overCardId))
  }
}

Cards.propTypes = {
  card: PropTypes.object.isRequired,
  dndCard: PropTypes.object.isRequired,
  openCardPopupFunction: PropTypes.func.isRequired,
  startDraggingCardFunction: PropTypes.func.isRequired,
  endDraggingCardFunction: PropTypes.func.isRequired,
  swapCardsFunction: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
