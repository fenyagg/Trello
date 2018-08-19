import React, {Component} from 'react'
import './style.css'

class HeaderUser extends Component {

	user = {
		'name': 'Дмитрий',
		'secondName': 'Чернышев'
	};

	render(){
		return (
			<div className="header-user">
				<a href="{javascript:void(0)}" className="header-user__avatar" style={{'backgroundImage': 'url("/img/stalone.jpg")'}} title={this.user.name+' '+this.user.secondName}> </a>
			</div>
		)
	}
}

export default HeaderUser