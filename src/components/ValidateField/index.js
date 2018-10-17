import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import fieldValidator from './FieldValidator'

class ValidateField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isValid: undefined,
      errorMessage: []
    }
    this.field = React.createRef()

    if (props.required) this.rules.push('required')

    this.rules = props.validRules
    switch (props.type) {
      case ('email'):
      case ('phone'):
        if (!this.rules[props.type]) this.rules.push(props.type)
        break
      default:
        break
    }
  }

  value = ''
  previewValue = ''
  wasChanged = false
  rules = []

  validate () {
    return fieldValidator.validate(this.field.current, this.rules, (isValid, errors) => {
      this.setState({
        ...this.state,
        isValid: isValid,
        errorMessage: errors
      })
    })
  }

  onInput (e) {
    this.value = this.field.current.value
    if (this.wasChanged || this.state.isValid !== undefined) this.validate()
    if (this.props.onChange) this.props.onChange(e, this.isValid)
  }

  onBlur (e) {
    if (e.currentTarget.value === this.previewValue) return
    this.previewValue = e.currentTarget.value
    this.wasChanged = true
    this.validate()
  }

  render () {
    const { component, validRules, className = '', ...fieldProps } = this.props
    const wasValidate = this.state.isValid !== undefined

    fieldProps.onInput = e => this.onInput(e)
    fieldProps.onBlur = e => this.onBlur(e)

    fieldProps.ref = this.field
    const additionalClassName = this.state.isValid === true ? 'is-valid'
      : this.state.isValid === false ? 'is-invalid' : ''
    fieldProps.className = className.split(' ').concat(additionalClassName).join(' ')
    return (
      <div className={`form-group ${wasValidate ? 'was-validated' : ''}`}>
        {React.createElement(component, fieldProps)}

        <div className={'invalid-feedback'}>
          {this.state.errorMessage.map((error, key) => (
            <div key={key} className={'form-error-item'}>{error}</div>
          ))}
        </div>
      </div>
    )
  }
}

ValidateField.propTypes = {
  validRules: PropTypes.array,
  component: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string
}

export default ValidateField
