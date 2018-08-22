import React, {Component} from 'react'
import Card from '../Card'

import './style.css'

class Columns extends Component {
	
	
	constructor(props) {
		super(props);
		
		const {column} = props;
		
		this.state = {
			isDragging: false,
			isDraggingOver: false,
			draggingCardIndex: false,
			column: column
		};
	}
	
	
	
	headerColumnHandler = event => {
		console.log(event);
	};
	
	onCardDragStart = cardIndex => {
		this.setState({
			draggingCardIndex: cardIndex
		});
	};
	
	// @todo move fn to app
	changeCardPosition = (draggingCardIndex, newIndex) => {
		if (!draggingCardIndex || draggingCardIndex === newIndex) return true;
		
		let changedColumn = this.state.column;
		let newIndexWithDelete = newIndex-1 < 0 ? 0 : newIndex-1;
		
		// delete dragging element
		const draggingCard = changedColumn.cards.splice(draggingCardIndex, 1)[0];
		// add in new positon
		changedColumn.cards.splice(newIndex, 0, draggingCard);
				
		this.setState({
			column: changedColumn
		});
	};
	
	onDragEnter = (e, overCardIndex, cardRef) => {
		let cardOffset = {
			top: cardRef.current.offsetTop,
			bot: cardRef.current.offsetTop + cardRef.current.offsetHeight,
		};
	
		let cardMiddleOffset = cardRef.current.offsetTop + (cardRef.current.offsetHeight/2);
		
		if (this.state.draggingCardIndex === overCardIndex) return true;
		
		// more than half card height, pos set after card else before
		let posDiff = e.pageY > cardMiddleOffset ? 1 : 0;
		
		let newIndex = overCardIndex + posDiff;
		newIndex = newIndex < 0 ? 0 : (newIndex > (this.state.column.cards.length-1) ? (this.state.column.cards.length-1) : newIndex);
	
		this.changeCardPosition(this.state.draggingCardIndex, newIndex);
	};

	render(){
		
		const cardsList = this.state.column.cards.map((card,index) => {
			return <Card
				onCardDragStart={this.onCardDragStart.bind(this, index )}
				onDragEnter={this.onDragEnter}
				card={card}
				cardIndex = {index}
				key={card.id}/>
		});
		const columnClass = ['column'];
		if (this.state.isDragging) columnClass.push('_dragging');

		return (
			<div className={columnClass.join(' ')} >
				<header onClick={this.headerColumnHandler} className="column-header">
					{this.state.column.name}
				</header>
				<div className="column-cards">
					<div className="card-list">
						{cardsList}
					</div>

				</div>
				<a href="{javascript:void(0)}"
				   className="add-task-link">+ Добавить еще 1 карточку</a>
			</div>

	);
	}
}

export default Columns