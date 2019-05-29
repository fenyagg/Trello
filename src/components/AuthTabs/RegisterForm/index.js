import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { register } from '../../../store/user/actions'
import PropTypes from 'prop-types'
import ValidateField from '../../ValidateField'

class RegisterForm extends React.Component {
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
      this.props.register(
        this.fields.email.value,
        this.fields.password.value
      )
    }
  }

  render () {
    return (
      <form className="form auth-form" onSubmit={this.onSubmit}>
        <ValidateField
          component='input'
          type="text"
          className="form-control"
          placeholder="Email"
          defaultValue=""
          validRules={[TypeValidatorRules.required, TypeValidatorRules.email]}
          ref={field => (this.fields.email = field)}
        />

        <ValidateField
          component='input'
          type="password"
          className="form-control"
          placeholder="Password"
          defaultValue=""
          validRules={[
            TypeValidatorRules.required,
            { [TypeValidatorRules.minLength]: 6 }
          ]}
          ref={field => (this.fields.password = field)}
        />

        <button type="submit" className="btn btn-primary">Регистрация</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password) => dispatch(register({ email, password }))
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(RegisterForm)
