import React from 'react'

import './style.css'

class CardDetail extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			card: Object.assign({
				'title': 'Новая задача',
				'id': 'task'+(new Date().getTime()),
				'text': ''
			}, props.card)
		}
	}
	
	render(){
		const {closeCard} = this.props;
		return (
			<div
				onClick={closeCard}
				className="popup-shadow">
				<article className="card-detail">
					<div className="card-detail__title">{this.state.card.title}</div>
					<div className="card-detail__text">{this.state.card.text}</div>
				</article>
			</div>
		);
	}
}

export default CardDetail;