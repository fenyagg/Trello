import React from 'react'

//data
import columns from './data/columns'
//css
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'
//components
import Header from './layouts/header/index'
import Column from './components/Column'
import CardDetail from './components/CardDetail'


class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			openCardColumnIndex: -1,
			openCardIndex: -1,
			cardPopup: false,
			columns: columns
		}
	}
	
	openCard = (columnIndex, cardIndex ) => {
		this.setState({
			openCardColumnIndex: columnIndex,
			openCardIndex: cardIndex,
			cardPopup: true,
		});
	};
	closeCard = () => {
		this.setState({
			openCardColumnIndex: -1,
			openCardIndex: -1,
			cardPopup: false,
		});
	};
	saveCard = card => {
		if (this.state.openCardColumnIndex > -1) {
			let columns = this.state.columns;
			if (card.id && this.state.openCardIndex > -1) {
				columns[this.state.openCardColumnIndex]['cards'][this.state.openCardIndex] = card;
				this.setState({'columns': columns});
			} else {
				this.state.columns[this.state.openCardColumnIndex].cards.push(card);
			}
		}
	};

	render () {
		const renderColumns = this.state.columns.map((column, index) => {
			return 	<Column
				column={column}
				key={column.id}
				index={index}
				openCard={this.openCard} />
		});

		return (
			<div className="trello">
				<Header />
				<div className="main-container">
					
					{this.state.cardPopup ? (
						<CardDetail
							saveCard = {this.saveCard}
							closeCard={this.closeCard}
							card={columns[this.state.openCardColumnIndex]['cards'][this.state.openCardIndex] || {}} />
					) : ''}
					
					<div className="columns-list">
						{renderColumns}

						<a href="#0" className="add-column-link">
							+ Добавить еще 1 колонку
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App