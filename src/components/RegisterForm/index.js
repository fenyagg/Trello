import React from 'react';
import './style.css';

class RegisterForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			login: '',
			password: '',
		};
	}

	onChange = (name, value) => {

	};

	render(){
		return (
			<form className="form auth-form">
				<div className="form-group">
					<input type="text"
					       className="form-control"
					       placeholder="Логин"
					       value={this.state.login}/>
				</div>

				<div className="form-group">
					<input type="password"
					       className="form-control"
					       placeholder="Пароль"
					       value={this.state.password}/>
				</div>

				<button type="submit" className="btn btn-primary">Регистрация</button>
			</form>
		)
	}
}
export default RegisterForm;