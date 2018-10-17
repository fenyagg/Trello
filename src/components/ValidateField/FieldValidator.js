import { isObject as _isObject } from 'lodash'
import { keys as _keys } from 'lodash/object'

export class FieldValidator {
   validateFunctions = {
     required: field => (!!field.value.trim()),
     email: field => /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(field.value),
     minLength: (field, params) => (!field.value || field.value.trim().length >= params)
   }

  validateMessages = {
    default: 'field is not valid',
    required: 'field is required',
    email: 'email is not valid',
    minLength: 'length must be more than {0}'
  }

  getValidMessage = (ruleName, params) => {
    let message = this.validateMessages[ruleName] || this.validateMessages['default']
    params.forEach((param, i) => {
      message = message.replace('{' + i + '}', param)
    })
    return message
  }

  validate (field, rules, callbalck = () => {}) {
    if (!rules.length) return

    let isValid = true
    const errors = []

    rules.forEach(rule => {
      let ruleName = typeof rule === 'string'
        ? rule
        : (_isObject(rule) ? _keys(rule)[0] : '')

      if (!this.validateFunctions[ruleName]) {
        console.warn(`${rule} is not defined validate function`)
        return false
      }

      if (!this.validateFunctions[ruleName](field, _isObject(rule) ? rule[ruleName] : null)) {
        isValid = false
        errors.push(this.getValidMessage(ruleName, [].concat(rule[ruleName])))
      }
    })
    // set field valid/invalid
    field.setCustomValidity && field.setCustomValidity(errors.length ? ' ' : '')
    callbalck(isValid, errors)

    return isValid
  }
}
export default new FieldValidator()
