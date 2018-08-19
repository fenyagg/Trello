import React, {Component} from 'react'

import './style.css'

class Cards extends Component {

	state = {
		isDragging: false,
	};

	onDragStart = event => {
		console.log(event);
	};

	onDragEnd = (id, e) => {

	};

	render(){
		const {card} = this.props;

		return (
			<article
				className="card"
				draggable="true"
				onDragStart={this.onDragStart}
				onDrop={e => this.onDragEnd(card.id, e)}
				onDragEnter={() => this.setState({isDraggingOver: true})}
				onDragLeave={() => this.setState({isDraggingOver: false})}
			>
				<div className="card-title">{card.title}</div>
			</article>
		);
	}
}

export default Cards