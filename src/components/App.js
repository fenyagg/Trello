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
	constructor(props) {
		super(props);

		this.state = {
			openCardColumnIndex: -1,
			openCardIndex: -1,
			cardPopup: false,
			draggedCardColumnIndex: -1,
			draggedCardIndex: -1,
			draggedColumn: -1,
			// todo save user
			user: {

			}
		}
	}

	// drop fix https://stackoverflow.com/questions/50230048/react-ondrop-is-not-firing
	onDragOver = e => {
		e.stopPropagation();
		e.preventDefault();
	};
	onDrop = e => {
		this.setState({
			'draggedCardColumnIndex': -1,
			'draggedCardIndex': -1,
		});
	};

	onDeleteDrop = () => {
		if (this.state.draggedCardColumnIndex > -1 && this.state.draggedCardIndex > -1) {
			let cloneColumns = clone(this.state.columns);
			cloneColumns[this.state.draggedCardColumnIndex]['cards'].splice(this.state.draggedCardIndex, 1);

			this.setState({
				'draggedCardColumnIndex': -1,
				'draggedCardIndex': -1,
				'columns': cloneColumns
			});
		}

		if (this.state.draggedColumn > -1) {
			let cloneColumns = clone(this.state.columns);
			cloneColumns.splice(this.state.draggedColumn, 1);

			this.setState({
				'draggedColumn': -1,
				'columns': cloneColumns
			});
		}
	};

	render () {
		const {isAuthorized} = this.props;



		return (
			<div className="trello"
				 onDragOver={this.onDragOver}
				 onDrop = {this.onDrop} >

				<Header onDrop={this.onDeleteDrop}/>

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
