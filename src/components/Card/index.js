import React from 'react'

import './style.css'

class Cards extends React.Component {

	constructor(props){
		super(props)
		
		this.state = {
			isDragging: false,
			cardIndex: props.cardIndex
		};
		this.cardRef = React.createRef();
	}
	
	onDragStart = cardIndex => {
		this.setState({
			isDragging: true
		});
		this.props.onCardDragStart(cardIndex);
	};
	onDrop = () => {
		this.setState({
			isDragging: false
		});
		this.props.onCardDrop();
	};
	
	render(){
		const {card, onDragEnter, onCardClick} = this.props;
		const cardClass = ['card-container'];
		
		if (this.state.isDragging) cardClass.push('_dragging');
		
		return (
			<article
				className={cardClass.join(' ')}
				ref={this.cardRef}
				onDragEnter={e => {onDragEnter( e, this.props.cardIndex, this.cardRef)}}
				onDragLeave={() => this.setState({isDraggingOver: false})}
				onClick={onCardClick}
			>
				<div className="card"
				     onDragStart={e => this.onDragStart(this.state.cardIndex, e)}
				     onDragEnd = {this.onDrop}
				     draggable="true"
				>
					<div className="card-title">{card.title}</div>
				</div>
			</article>
		);
	}
}

export default Cards