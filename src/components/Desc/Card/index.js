import React from 'react'

import './style.css'

class Cards extends React.Component {

	constructor(props){
		super(props)
		
		this.state = {
			cardIndex: props.cardIndex
		};
	}
	
	
	render(){
		const {card, onCardDragStart, onDragEnter, onCardClick, isDraggable, onDragEnd} = this.props;
		const cardClass = ['card-container'];
		
		if (isDraggable) cardClass.push('_dragging');
		
		return (
			<article
				className={cardClass.join(' ')}
				onDragEnter={onDragEnter}
				onClick={onCardClick}
			>
				<div className="card"
				     onDragStart={onCardDragStart}
				     onDragEnd = {onDragEnd}
				     draggable="true"
				>
					<div className="card-title">{card.title}</div>
				</div>
			</article>
		);
	}
}

export default Cards