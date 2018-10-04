import React, {Component} from 'react'
import { connect } from 'react-redux'
import HeaderUser from '../../components/HeaderUser'
import './style.css'


class Article extends Component {

	constructor(props){
		super(props);

		this.state = {
			'draggingOver': false
		};
	}

	onDrop = () => {
		this.setState({draggingOver: false});
		this.props.onDrop();
	};

	render(){
		const {isDraggedItems, onExit, isAuthorized} = this.props;

		let hWrapperClass = ['h-wrapper'];
		if (isDraggedItems) hWrapperClass.push('_delete-header');
		if (this.state.draggingOver) hWrapperClass.push('_dragging-over');

		return (
			<header
				className={hWrapperClass.join(' ')}
				onDragEnter = {e => {this.setState({draggingOver: true})}}
				onDragLeave = {e => {this.setState({draggingOver: false})}}
				onDrop={this.onDrop}>

				<i className="h-delete-icon fa fa-trash-o" aria-hidden="true"> </i>

				<div className='container'>
					<div className="h-container">
						<div className="h-title">Trello</div>

						{isAuthorized ? <HeaderUser onExit={onExit}/> : null}

					</div>
				</div>
			</header>
		);
	}
}

const mapStoreToProps = store => {
	return {
    isAuthorized: store.user.isAuthorized
	}
}

export default connect(mapStoreToProps, null)(Article)
