import React, {Component} from 'react'
import Card from '../Card'

import './style.css'

class Columns extends Component {

	state = {
		isDragging: false,
		isDraggingOver: false
	};

	headerColumnHandler = event => {
		console.log(event);
	};



	render(){

		const {column} = this.props;
		const cardsList = column.cards.map(card => {
			return <Card
				card={card}
				key={card.id}/>
		});
		const columnClass = ['column'];
		if (this.state.isDragging) columnClass.push('_dragging');

		return (
			<div className={columnClass.join(' ')} >
				<header onClick={this.headerColumnHandler} className="column-header">
					{column.name}
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