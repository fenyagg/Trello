import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from "../../store";
import { removeCard, removeColumn } from '../../store/column/actions'
import { endDraggingCard } from '../../store/dndCard/actions'
import { endDraggingColumn } from '../../store/dndColumn/actions'
import HeaderUser from './HeaderUser/index'
import './style.css'

interface Props {
  dndCard: AppState['dndCard'],
  dndColumn: AppState['dndColumn'],
  endDraggingCard: typeof endDraggingCard,
  endDraggingColumn: typeof endDraggingColumn,
  removeCard: typeof removeCard,
  removeColumn: typeof removeColumn,
  isAuthorized: boolean,
}
interface State {
  draggingOver: boolean
}

class Header extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      'draggingOver': false
    }
  }
  public render () {
    const { dndCard, dndColumn, isAuthorized } = this.props

    const isDraggedItems = dndCard.isDragging || dndColumn.isDragging

    const hWrapperClass = ['h-wrapper']
    if (isDraggedItems) { hWrapperClass.push('_delete-header') }
    if (this.state.draggingOver) { hWrapperClass.push('_dragging-over') }

    return (
        <header
            className={hWrapperClass.join(' ')}
            onDragEnter={() => this.setHeaderDragOver(true)}
            onDragLeave={() => this.setHeaderDragOver(false)}
            onDrop={this.onDrop}>
          <i className="h-delete-icon fa fa-trash-o" aria-hidden="true" />
          <div className='container'>
            <div className="h-container">
              <div className="h-title">Trello</div>
              {isAuthorized ? <HeaderUser/> : null}
            </div>
          </div>
        </header>
    )
  }
  private setHeaderDragOver(isDraggingOver: boolean) {
    this.setState({ draggingOver: isDraggingOver })
  }

  private onDrop = () => {
    const {
      dndCard,
      dndColumn
    } = this.props;
    this.setState({ draggingOver: false });
    if (dndCard.isDragging) {
      removeCard(dndCard.cardId);
      endDraggingCard();
    }
    if (dndColumn.isDragging) {
      removeColumn(dndColumn.columnId);
      endDraggingColumn();
    }
  };
}

const mapStoreToProps = (store: AppState) => {
  return {
    isAuthorized: store.user.isAuthorized,
    dndCard: store.dndCard,
    dndColumn: store.dndColumn
  }
};

export default connect(
    mapStoreToProps,
    { endDraggingCard, endDraggingColumn, removeCard, removeColumn }
)
(Header)
