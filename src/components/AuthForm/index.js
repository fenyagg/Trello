import React from 'react';
import './style.css';

class AuthForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	onChange = (name, value) => {
		let newState = {};
		newState[name] = value;
		this.setState(newState);
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAuth({
			'email': this.state.email,
			'password': this.state.password,
		});
	};

	render(){
		return (
			<form className="form auth-form" onSubmit={this.onSubmit}>
				<div className="form-group">
					<input type="email"
					       className="form-control"
					       placeholder="Email"
					       required="required"
					       onChange={e => this.onChange('email', e.target.value)}
					       value={this.state.email}/>
				</div>

				<div className="form-group">
					<input type="password"
					       className="form-control"
					       placeholder="Пароль"
					       required="required"
					       onChange={e => this.onChange('password', e.target.value)}
					       value={this.state.password}/>
				</div>

				<button type="submit" className="btn btn-primary">Войти</button>
			</form>
		)
	}
}
export default AuthForm;