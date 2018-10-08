import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit as _omit} from 'lodash/object'
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
        break;
    }
  }

  previewValue = ''
  wasChanged = false
  rules = []

  validate() {
    return fieldValidator.validate(this.field.current, this.rules, (isValid, errors) => {
      this.setState({
        ...this.state,
        isValid: isValid,
        errorMessage: errors
      })
    })
  }

  onInput(e) {
    if (this.wasChanged || this.state.isValid !== undefined) this.validate()
    if(this.props.onChange) this.props.onChange(e, this.isValid)
  }

  onBlur(e) {
    if (e.currentTarget.value === this.previewValue) return
    this.previewValue = e.currentTarget.value
    this.wasChanged = true
    this.validate()
  }

  render () {
    const { component, ...props } = this.props
    const wasValidate = this.state.isValid !== undefined

    let fieldProps = {...props}
    fieldProps.onInput = e => this.onInput(e)
    fieldProps.onBlur = e => this.onBlur(e)

    fieldProps.ref = this.field

    fieldProps = _omit(fieldProps, ['validRules'])
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
  component: PropTypes.string.isRequired
}

export default ValidateField
