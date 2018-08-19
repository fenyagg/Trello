import React, {Component} from 'react'

//data
import columns from './data/columns'
//css
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'
//components
import Header from './layouts/header/index'
import Column from './components/Column'


class App extends Component {
	/*constructor(props) {
		super(props);
	}*/

	render () {
		const renderColumns = columns.map(column => {
			return 	<Column column={column} key={column.id} />
		});

		return (
			<div className="trello">
				<Header />
				<div className="main-container">
					<div className="columns-list">
						{renderColumns}

						<a href="{javascript:void(0)}" className="add-column-link">
							+ Добавить еще 1 колонку
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App