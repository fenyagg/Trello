import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {openCardPopup, closeCardPopup, saveCardPopup} from './actions/cardPopup';

//data
import columns from './data/columns'
//css
import './app.css'
//components
import Header from './layouts/header/index'
import Column from './components/Column'
import CardDetail from './components/CardDetail'
import AuthTabs from './components/AuthTabs'

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
			draggedColumn: -1,
			columns: columns,
			isAuthorized: true,
			// todo save user
			user: {

			}
		}
	}
	
	static contextTypes = {
		store: PropTypes.object
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

	// drop fix https://stackoverflow.com/questions/50230048/react-ondrop-is-not-firing
	onDragOver = e => {
		e.stopPropagation();
		e.preventDefault();
	};
	onDrop = e => {
		this.setState({
			'draggedCardColumnIndex': -1,
			'draggedCardIndex': -1,
		});
	};

	onDeleteDrop = () => {
		if (this.state.draggedCardColumnIndex > -1 && this.state.draggedCardIndex > -1) {
			let cloneColumns = clone(this.state.columns);
			cloneColumns[this.state.draggedCardColumnIndex]['cards'].splice(this.state.draggedCardIndex, 1);

			this.setState({
				'draggedCardColumnIndex': -1,
				'draggedCardIndex': -1,
				'columns': cloneColumns
			});
		}

		if (this.state.draggedColumn > -1) {
			let cloneColumns = clone(this.state.columns);
			cloneColumns.splice(this.state.draggedColumn, 1);

			this.setState({
				'draggedColumn': -1,
				'columns': cloneColumns
			});
		}
	};

	onAuth = formData => {
		this.setState({
			isAuthorized: true
		});
	};
	onExit = () => {
		this.setState({
			isAuthorized: false
		});
	};

	render () {
		const {openCardPopup, closeCardPopup, saveCardPopup, cardPopup} = this.props;

		const renderColumns = this.state.columns.map((column, index) => {
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
				openCard = {openCardPopup}

				onDragEnter = {this.columnDragAndDrop.onDragEnter.bind(this, index)}
				onDragStart = {this.columnDragAndDrop.onDragStart.bind(this, index)}
				onDragEnd = {this.columnDragAndDrop.onDragEnd.bind(this, index)}
			/>
		});

		return (
			<div className="trello"
				 onDragOver={this.onDragOver}
				 onDrop = {this.onDrop} >

				<Header
						isAuthorized={this.state.isAuthorized}
						onExit={this.onExit}
						onDrop={this.onDeleteDrop}
						isDraggedItems={(this.state.draggedCardColumnIndex > -1 && this.state.draggedCardIndex > -1) || this.state.draggedColumn > -1}/>

				<div className="main-container">

					{cardPopup.isOpen ? (
						<CardDetail
							saveCard = {this.saveCard}
							closeCard = {this.closeCard}
							card = {this.state.columns[cardPopup.columnIndex]['cards'][cardPopup.cardIndex] || {}} />
					) : ''}

					{!this.state.isAuthorized ?
						<AuthTabs onAuth={this.onAuth} /> :
						(<div className="columns-list">
							{renderColumns}

							<a href="#0"
							   onClick={this.addColumn}
							   className="add-column-link">
								+ Добавить еще 1 колонку
							</a>
						</div>)
					}

				</div>
			</div>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return {
		cardPopup: store.cardPopup
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openCardPopup: (columnIndex, cardIndex) => dispatch(openCardPopup({columnIndex, cardIndex})),
		closeCardPopup: () => dispatch(closeCardPopup()),
		saveCardPopup: () => dispatch(saveCardPopup()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App)