import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//css
import './app.css'
//components
import Header from './Header'
import AuthTabs from './AuthTabs'

import {clone} from 'lodash/lang';
import Desc from './Desc'


class App extends React.Component {
	// drop fix https://stackoverflow.com/questions/50230048/react-ondrop-is-not-firing
	onDragOver = e => {
		e.stopPropagation();
		e.preventDefault();
	}

	render () {
		const {isAuthorized} = this.props;

		return (
			<div className="trello"
				 onDragOver={this.onDragOver}
				 onDrop = {this.onDrop} >

				<Header/>

				<div className="main-container">
          {!isAuthorized && <AuthTabs />}
					{isAuthorized && <Desc />}
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
    isAuthorized: state.user.isAuthorized
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	};
};

App.prototypes = {
	isAuthorized: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
