import React from 'react'

import './style.css'

class CardDetail extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = Object.assign({
			'title': 'Новая задача',
			'id': 'task'+(new Date().getTime()),
			'text': '',
			'isNew': !props.card.id
		}, props.card);
		
		this.titleRef = React.createRef();
		this.changeCardTitle = this.changeCardTitle.bind(this);
		this.changeCardText = this.changeCardText.bind(this);
	}
	
	componentDidMount(prevProps, prevState) {
		// autofocus on title in new item
		if (!prevProps || !prevProps.card.id)
			this.titleRef.current.focus()
	}
	
	changeCardTitle = event => {
		this.setState({'title': event.target.value});
	};
	
	textareaAutoHeight = el => {
		el.style.cssText = 'height:auto;';
		let textareaHeight = el.scrollHeight;
		el.style.cssText = 'height:' + textareaHeight + 'px';
	};
	
	changeCardText = event => {
		this.textareaAutoHeight(event.target);
		
		this.setState({
			'text': event.target.value,
		});
	};
	
	saveCard = () => {
		this.props.saveCard(this.state);
		this.props.closeCard();
	};
	
	render(){
		const {closeCard} = this.props;
		return (
			<div className="popup-wrapper">
				<div onClick={closeCard}
				     className="popup-shadow"> </div>
				<article className="card-detail">
					<button onClick={closeCard}
							type="button"
					        className="close card-detail__close"
					        aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<header className="card-detail__header">
						<input
							placeholder="Название задачи"
							ref={this.titleRef}
							type="text"
							onChange={this.changeCardTitle}
							className="card-detail__title-input"
							value={this.state.title} />
					</header>
					<textarea
						onChange={this.changeCardText}
						placeholder="Описание задачи"
						className="card-detail__textarea"
						value={this.state.text}> </textarea>
					
					<footer className="card-detail__footer">
						<button onClick={this.saveCard}
						        className="btn btn-primary"
						        type='button'>
								Сохранить
							</button>
					</footer>
				</article>
			</div>
		);
	}
}

export default CardDetail;