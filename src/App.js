import React from 'react'

//data
import columns from './data/columns'
//css
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'
//components
import Header from './layouts/header/index'
import Column from './components/Column'
import CardDetail from './components/CardDetail'

import {clone} from 'lodash/lang';


class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			openCardColumnIndex: -1,
			openCardIndex: -1,
			cardPopup: false,
			draggedCardColumnIndex: -1,
			draggedCardIndex: -1,
			columns: columns,
		}
	}
	
	cardDragAndDrop = {
		onDragEnd: () => {
			this.setState({
				'draggedCardColumnIndex': -1,
				'draggedCardIndex': -1,
			});
		},
		/**
		 * handler calculate and change position
		 * @param e - event
		 * @param cardRef - dragover card node
		 * @param overColumnIndex - dragover card column
		 * @param overCardIndex - dragover card index
		 */
		onDragEnter: (e, cardRef, overColumnIndex, overCardIndex) => {
			if (this.state.draggedCardColumnIndex === -1 ||
				this.state.draggedCardIndex === -1 ||
					(this.state.draggedCardColumnIndex === overColumnIndex &&
					this.state.draggedCardIndex === overCardIndex))  return true;
			
			
			
			// calc new position
			let cardMiddleOffset = cardRef.current.offsetTop + (cardRef.current.offsetHeight/2);
			
			// more than half card height, pos set after card else before
			let posDiff = e.pageY > cardMiddleOffset ? 1 : 0;
			// calc new index
			let newIndex = overCardIndex + posDiff;
			
			this.cardDragAndDrop.changeCardPosition.call(this, overColumnIndex, newIndex);
		},
		onDragStart: (columnIndex, cardIndex) => {
			this.setState({
				'draggedCardColumnIndex': columnIndex,
				'draggedCardIndex': cardIndex,
			});
		},
		onDragEnterColumnHeader: (columnIndex) => {
			this.cardDragAndDrop.changeCardPosition.call(this, columnIndex, 0);
		},
		changeCardPosition(newColumn, newIndex){
			if (this.state.draggedCardColumnIndex === newColumn &&
				this.state.draggedCardIndex === newIndex
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
	deleteColumn = columnIndex => {
	
	};

	render () {
		const renderColumns = this.state.columns.map((column, index) => {
			return 	<Column
				column={column}
				key={column.id}
				index={index}
				cardDragAndDrop={this.cardDragAndDrop}
				draggedCardColumnIndex = {this.state.draggedCardColumnIndex}
				draggedCardIndex = {this.state.draggedCardIndex}
				openCard={this.openCard} />
		});

		return (
			<div className="trello">
				<Header />
				<div className="main-container">
					
					{this.state.cardPopup ? (
						<CardDetail
							saveCard = {this.saveCard}
							closeCard={this.closeCard}
							card={this.state.columns[this.state.openCardColumnIndex]['cards'][this.state.openCardIndex] || {}} />
					) : ''}
					
					<div className="columns-list">
						{renderColumns}

						<a href="#0"
						   onClick={this.addColumn}
						   className="add-column-link">
							+ Добавить еще 1 колонку
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App