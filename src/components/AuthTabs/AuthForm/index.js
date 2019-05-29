import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../../store/user/actions'
import ValidateField from '../../ValidateField'
import PropTypes from 'prop-types'

class AuthForm extends React.Component {
  fields = {}
  isFormValid = true

  onSubmit = (e) => {
    e.preventDefault()

    this.isFormValid = true
    for (let fieldComponent of this.fields) {
      if (fieldComponent.isValid === false || !fieldComponent.validate()) {
        this.isFormValid = false
      }
    }

    if (this.isFormValid) {
      this.props.login(
        this.fields.email.value,
        this.fields.password.value
      )
    }
  }

  render () {
    return (
      <form className="form auth-form" onSubmit={this.onSubmit}>
        <ValidateField
          data-field='email'
          component='input'
          type="text"
          className="form-control"
          placeholder="Email"
          defaultValue=""
          validRules={['required', 'email']}
          ref={field => (this.fields.email = field)}
        />

        <ValidateField
          data-field='password'
          component='input'
          type="password"
          className="form-control"
          placeholder="Password"
          defaultValue=""
          validRules={[
            'required',
            { 'minLength': 6 }
          ]}
          ref={field => (this.fields.password = field)}
        />

        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login({ email, password }))
  }
}

AuthForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(AuthForm)
