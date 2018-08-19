import React, {Component} from 'react'

import HeaderUser from '../../components/HeaderUser'

import './style.css'

class Article extends Component {

	render(){
		return (
			<header className="h-wrapper">
				<div className="container">
					<div className="h-container">
						<div className="h-title">Trello</div>
						<HeaderUser />
					</div>
				</div>
			</header>
		);
	}
}

export default Article