import React from 'react';
import connect from 'react-redux/es/connect/connect'
import { login } from '../../actions/user'
import ValidateField from './../ValidateField'

class AuthForm extends React.Component {
	constructor(props){
		super(props);

    this.email = React.createRef();
    this.password = React.createRef();
	}

  fields = []

	onSubmit = (e) => {
		e.preventDefault();

		const errorFields = this.fields.filter( fieldComponent => {
			return (fieldComponent.state.isValid !== undefined && !fieldComponent.state.isValid)
							|| !fieldComponent.validate()
		})

		if (!errorFields.length)
			this.props.login({
				email: this.email.value,
				password: this.password.value
			})
	};

	render(){
		return (
			<form className="form auth-form" onSubmit={this.onSubmit}>
        <ValidateField
					component='input'
					type="text"
					className="form-control"
					placeholder="Email"
					defaultValue=""
          validRules={['required', 'email']}
					ref={field => this.fields.push(field)}
				 />

        <ValidateField
          component='input'
          type="password"
          className="form-control"
          placeholder="Password"
          defaultValue=""
					validRules={[
						'required',
						{'minLength': 6}
					]}
          ref={field => this.fields.push(field)}
        />

				<button type="submit" className="btn btn-primary">Войти</button>
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login({email, password})),
  };
};

export default connect(null, mapDispatchToProps)(AuthForm)
