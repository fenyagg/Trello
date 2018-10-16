import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderUser from './HeaderUser/index'
import './style.css'
import { endDraggingCard } from '../../actions/dndCard'
import { endDraggingColumn } from '../../actions/dndColumn'
import { removeCard, removeColumn } from '../../actions/columns'
import PropTypes from 'prop-types'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'draggingOver': false
    }
  }

  onDrop = () => {
    const {
      dndCard,
      dndColumn,
      endDraggingCard,
      endDraggingColumn,
      removeCard,
      removeColumn
    } = this.props
    this.setState({ draggingOver: false })
    if (dndCard.isDragging) {
      removeCard(dndCard.cardId)
      endDraggingCard()
    }
    if (dndColumn.isDragging) {
      removeColumn(dndColumn.columnId)
      endDraggingColumn()
    }
  }

  render () {
    const { dndCard, dndColumn, isAuthorized } = this.props

    const isDraggedItems = dndCard.isDragging || dndColumn.isDragging

    const hWrapperClass = ['h-wrapper']
    if (isDraggedItems) hWrapperClass.push('_delete-header')
    if (this.state.draggingOver) hWrapperClass.push('_dragging-over')

    return (
      <header
        className={hWrapperClass.join(' ')}
        onDragEnter={e => {
          this.setState({ draggingOver: true })
        }}
        onDragLeave={e => {
          this.setState({ draggingOver: false })
        }}
        onDrop={this.onDrop}>
        <i className="h-delete-icon fa fa-trash-o" aria-hidden="true"> </i>
        <div className='container'>
          <div className="h-container">
            <div className="h-title">Trello</div>
            {isAuthorized ? <HeaderUser/> : null}
          </div>
        </div>
      </header>
    )
  }
}

const mapStoreToProps = store => {
  return {
    isAuthorized: store.user.isAuthorized,
    dndCard: store.dndCard,
    dndColumn: store.dndColumn
  }
}
const mapDispatchToProps = dispatch => {
  return {
    endDraggingCard: () => dispatch(endDraggingCard()),
    endDraggingColumn: () => dispatch(endDraggingColumn()),
    removeCard: (cardId) => dispatch(removeCard(cardId)),
    removeColumn: (columnId) => dispatch(removeColumn(columnId))
  }
}

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  dndCard: PropTypes.object.isRequired,
  dndColumn: PropTypes.object.isRequired,
  endDraggingCard: PropTypes.func.isRequired,
  endDraggingColumn: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired
}

export default connect(mapStoreToProps, mapDispatchToProps)(Header)
