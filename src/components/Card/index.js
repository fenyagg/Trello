import React from 'react'

import './style.css'

class Cards extends React.Component {

	constructor(props){
		super(props)
		
		this.state = {
			cardIndex: props.cardIndex
		};
		this.cardRef = React.createRef();
	}
	
	
	render(){
		const {card, onCardDragStart, onDragEnter, onCardClick, isDraggable, onDragEnd} = this.props;
		const cardClass = ['card-container'];
		
		if (isDraggable) cardClass.push('_dragging');
		
		return (
			<article
				className={cardClass.join(' ')}
				ref={this.cardRef}
				onDragEnter={onDragEnter}
				onDragLeave={() => this.setState({isDraggingOver: false})}
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