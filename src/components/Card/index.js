import React, {Component} from 'react'

import './style.css'

class Cards extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			isDragging: false,
			
		};
		this.cardRef = React.createRef();
	}
	
	onDragStart = event => {
		this.setState({
			isDragging: true
		});
	};

	onDragEnd = (id, e) => {
		this.setState({
			isDragging: false
		});
	};
	
	onDragEnter = (id, e) => {
		console.log(id);
		console.log(e);
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
				onDragEnter={e => {onDragEnter( e, card.id, this.cardRef)}}
				onDragLeave={() => this.setState({isDraggingOver: false})}
			>
				<div className="card"
				     onDragStart={e => this.onDragStart(card.id, e)}
				     onDragEnd = {e => this.onDragEnd(card.id, e)}
				     draggable="true"
				>
					<div className="card-title">{card.title}</div>
				</div>
			</article>
		);
	}
}

export default Cards