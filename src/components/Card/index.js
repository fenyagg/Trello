import React, {Component} from 'react'

import './style.css'

class Cards extends Component {

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

	onDragEnd = (id, e) => {
		this.setState({
			isDragging: false
		});
	};
	
	render(){
		const {card, onDragEnter} = this.props;
		const cardClass = ['card-container'];
		
		if (this.state.isDragging) cardClass.push('_dragging');
		
		return (
			<article
				className={cardClass.join(' ')}
				onDrop={e => this.onDragEnd(card.id, e)}
				ref={this.cardRef}
				onDragEnter={e => {onDragEnter( e, this.props.cardIndex, this.cardRef)}}
				onDragLeave={() => this.setState({isDraggingOver: false})}
			>
				<div className="card"
				     onDragStart={e => this.onDragStart(this.state.cardIndex, e)}
				     onDragEnd = {e => this.onDragEnd()}
				     draggable="true"
				>
					<div className="card-title">{card.title}</div>
				</div>
			</article>
		);
	}
}

export default Cards