import React, {Component} from 'react'

class Article extends Component {
	state = {
		isOpen: true
	}

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	render(){
		const {article} = this.props;
		const body = this.state.isOpen && <section>{article.text}</section>;
		return (
			<div className="card mx-auto" style={{width: "50%"}}>
				<div className="card-header">
					<h2 className="hello" style={{color: 'red'}}>
						{article.title}
						<button className="btn btn-primary btn-lg float-right" onClick={this.handleClick}>
							{this.state.isOpen ? 'close': 'open'}
						</button>
					</h2>
				</div>
				<div className="card-body">
					<h6 className="card-subtitle text-muted">Create date: {article.date}</h6>
					{body}
				</div>

			</div>
		);
	}
}

/*function Article(props) {
	const {article} = props;
		const body = this.state.isOpen && <section>{article.text}</section>;
		return (
			<div>
				<h2 className="hello" style={{color: 'red'}}>
					{article.title}
					<button onClick={handleClick}>close</button>
				</h2>
				{body}
				<h3>Create date: {article.date}</h3>
			</div>
		);
}*/


export default Article