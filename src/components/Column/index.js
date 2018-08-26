import React from 'react'
import Card from '../Card'

import './style.css'

class Columns extends React.Component {
	constructor(props) {
		super(props);
		
		const {column} = props;
		
		this.state = {
			columnIndex: props.index,
			isDragging: false,
			column: column,
		};
		this.columnRef = React.createRef();
	}
	
	onCardClick = cardIndex => {
		this.props.openCard(this.state.columnIndex, cardIndex);
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

	render(){
		const {
			openCard,
			cardDragAndDrop,
			draggedCardColumnIndex,
			draggedCardIndex,
			columnDragAndDrop
		} = this.props;
		const cardsList = this.state.column.cards.map((card,index) => {
			return <Card
				onCardDragStart={cardDragAndDrop.onDragStart.bind(this, this.state.columnIndex, index)}
				onDragEnd = {cardDragAndDrop.onDragEnd}
				onDragEnter={(event, cardRef) => cardDragAndDrop.onDragEnter(event, cardRef, this.state.columnIndex, index)}
				onCardClick={this.onCardClick.bind(this, index)}
				isDraggable={draggedCardColumnIndex === this.state.columnIndex && draggedCardIndex === index}
				card={card}
				cardIndex = {index}
				key={card.id}/>
		});
		const columnClass = ['column'];
		if (this.state.isDragging) columnClass.push('_dragging');

		return (
			<div className="column-wrapper"
			     onDragOver={e => {columnDragAndDrop.onDragOver( e, this.columnRef, this.state.columnIndex)}}
			>
				<div
					ref={this.columnRef}
					className={columnClass.join(' ')}
					onDragEnter = {this.onDragEnter}
					onDragStart = {columnDragAndDrop.onDragStart.bind(this, this.state.columnIndex)}
					draggable="true"
				>
					<header
						onDragEnter={cardDragAndDrop.onDragEnterColumn.bind(this, this.state.columnIndex, 0)}
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
					        onDragEnter={cardDragAndDrop.onDragEnterColumn.bind(this, this.state.columnIndex, this.state.column.cards.length)}>
						<a href="#0"
						   onClick={e => {e.preventDefault(); openCard(this.state.columnIndex , -1 )}}
						   className="add-task-link">+ Добавить еще 1 карточку</a>
					</footer>

				</div>
			</div>
	);
	}
}

export default Columns