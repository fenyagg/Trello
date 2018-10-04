import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'
import { logout } from '../../actions/user'

class HeaderUser extends Component {
	render(){
		const {name, secondName, logout} = this.props;
		return (
			<div className="header-user">
				<a href="#0" className="header-user__avatar"
					 style={{'backgroundImage': 'url("/img/stalone.jpg")'}}
					 title={name+' '+secondName}> </a>

				<a href="#0" className="header-user__exit"
					 onClick={e => {e.preventDefault(); logout()}}>Выход</a>
			</div>
		)
	}
}

const mapStateToProps = store => {
	return {
		name: store.user.name,
    secondName: store.user.secondName
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser)
