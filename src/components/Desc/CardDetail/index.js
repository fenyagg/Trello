import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import { closeCardPopup as closeCardPopupAction } from '../../../actions/cardPopup'
import { saveCard } from '../../../actions/columns'
import PropTypes from 'prop-types'

class CardDetail extends React.Component {
  constructor (props) {
    super(props)

    this.titleInput = React.createRef()
    this.descriptionInput = React.createRef()
  }

  static contextTypes = {
    store: PropTypes.object
  }

  componentDidMount (prevProps, prevState) {
    // autofocus on title in new item
    if (this.props.cardIndex < 0)
      this.titleInput.current.focus()
  }

  textareaAutoHeight = el => {
    el.style.cssText = 'height:auto;'
    el.style.cssText = 'height:' + el.scrollHeight + 'px'
  }

  changeCardText = event => {
    this.textareaAutoHeight(event.target)
  }

  saveCard = (e) => {
    e.preventDefault()
    const {columns, closeCardPopup, columnIndex, cardIndex} = this.props
    const card = columns[columnIndex]['cards'][cardIndex]
    const nextCard ={
      'title': this.titleInput.current.value,
      'text': this.descriptionInput.current.value
    }
    if (!card || !card.id) nextCard.id = 'card-' + (new Date().getTime())
    this.props.saveCardToStore(columnIndex, cardIndex, nextCard)
    closeCardPopup()
  }

  render () {
    const {columns, closeCardPopup, columnIndex, cardIndex} = this.props
    const card = Object.assign({
      'title': 'Новая задача',
      'text': ''
    }, columns[columnIndex]['cards'][cardIndex])

    return (
      <div className="popup-wrapper">
        <div onClick={closeCardPopup}
             className="popup-shadow"> </div>

        <form onSubmit={e => this.saveCard(e, this.context.store.cardPopup)}
              className="card-detail">
          <button onClick={closeCardPopup}
                  type="button"
                  className="close card-detail__close"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <header className="card-detail__header">
            <input
              ref={this.titleInput}
              required="required"
              placeholder="Название задачи"
              type="text"
              className="card-detail__title-input"
              defaultValue={card.title}
            />
          </header>
          <textarea
            ref={this.descriptionInput}
            placeholder="Описание задачи"
            className="card-detail__textarea"
            onChange={this.changeCardText}
            defaultValue={card.text} />

          <footer className="card-detail__footer">
            <button
              className="btn btn-primary mr-2"
              type='submit'>
              Сохранить
            </button>
          </footer>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    columns: state.columns,
    columnIndex: state.cardPopup.columnIndex,
    cardIndex: state.cardPopup.cardIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCardPopup: () => {
      dispatch(closeCardPopupAction())
    },
    saveCardToStore: (columnIndex, cardIndex, nextCard) => {
      dispatch(
        saveCard(
          columnIndex,
          cardIndex,
          nextCard
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)
