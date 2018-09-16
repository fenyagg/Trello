import React from 'react'
import Card from '../Card'

import './style.css'

class Columns extends React.Component {
	constructor(props) {
		super(props);
		
		const {column} = props;
		
		this.state = {
			isDragging: false,
			column: column,
		};
	}
	
	onCardClick = cardIndex => {
		this.props.openCard(this.props.index, cardIndex);
	};

	changeColumnName = event => {
		let column = this.state.column;
		column.name = event.target.value;
		this.setState({column: column});
	};
	keyDownColumnName = event => {
		if (['Enter', 'Escape'].includes(event.key))
			event.target.blur();
	};

	// drag and drop cursor fix
	onDragEnter = e => {
		e.preventDefault();
	};
	
	onDragStart = e => {
		// dont fire on drag card
		if (e.target.className === 'column')
			this.props.onDragStart();
	};

	render(){
		const {
			openCard,
			onCardDragStart,
			onCardDragEnd,
			onCardEnterColumn,
			onCardDragEnter,
			index:columnIndex,
			
			draggedCardColumnIndex,
			draggedCardIndex,
			onDragEnter,
			onDragEnd
		} = this.props;
		
		const cardsList = this.state.column.cards.map((card,index) => {
			return <Card
				onCardDragStart = {onCardDragStart.bind(this, index)}
				onDragEnd = {onCardDragEnd.bind(this, index)}
				onDragEnter = {onCardDragEnter.bind(this, index)}
				onCardClick = {() => openCard(columnIndex, index)}
				isDraggable = {draggedCardColumnIndex === columnIndex && draggedCardIndex === index}
				card={card}
				cardIndex = {index}
				key={card.id}/>
		});
		const columnClass = ['column'];
		if (this.state.isDragging) columnClass.push('_dragging');

		return (
			<div className="column-wrapper"
			     onDragEnter={onDragEnter}
			>
				<div
					className={columnClass.join(' ')}
					onDragEnter = {this.onDragEnter}
					onDragStart = {this.onDragStart}
					onDragEnd = {onDragEnd}
					draggable="true"
				>
					<header
						onDragEnter={onCardEnterColumn.bind(this, columnIndex, 0)}
						className="column-header">
						<input className="column-title"
						       type="text"
						       value={this.state.column.name}
						       onKeyDown={this.keyDownColumnName}
						       onChange={this.changeColumnName}/>
					</header>
					<main className="column-cards">
						<div className="card-list">
							{cardsList}
						</div>
					</main>
					<footer className="column-footer"
					        onDragEnter={onCardEnterColumn.bind(this, columnIndex, this.state.column.cards.length)}>
						<a href="#0"
						   onClick={e => {e.preventDefault(); openCard(columnIndex , -1 )}}
						   className="add-task-link">+ Добавить еще 1 карточку</a>
					</footer>

				</div>
			</div>
	);
	}
}

export default Columns