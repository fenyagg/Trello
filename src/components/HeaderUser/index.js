import React, {Component} from 'react'
import './style.css'

class HeaderUser extends Component {

	user = {
		'name': 'Сильвестр',
		'secondName': 'Сталоне'
	};

	render(){
		const {onExit} = this.props;
		return (
			<div className="header-user">
				<a href="#0" className="header-user__avatar" style={{'backgroundImage': 'url("/img/stalone.jpg")'}} title={this.user.name+' '+this.user.secondName}> </a>

				<a href="#0" className="header-user__exit" onClick={e => {e.preventDefault(); onExit()}}>Выход</a>
			</div>
		)
	}
}

export default HeaderUser