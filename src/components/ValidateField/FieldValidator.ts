import { isObject as _isObject, keys as _keys } from 'lodash'

interface InterfaceValidatorField {
  value: string,
  setCustomValidity: () => void
}
export type TypeHtmlFormElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null
export enum TypeValidatorRules {phone, required, email, minLength}
export type TypeValidatorParams = TypeValidatorRules.phone
    |TypeValidatorRules.required|
    TypeValidatorRules.email|
    {[TypeValidatorRules.minLength]: number}

export class FieldValidator {
   private validateFunctions = {
     [TypeValidatorRules.required]: (field: InterfaceValidatorField) => (!!field.value.trim()),
     [TypeValidatorRules.email]: (field: InterfaceValidatorField) => /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(field.value),
     [TypeValidatorRules.minLength]: (field: InterfaceValidatorField, params: number) => (!field.value || field.value.trim().length >= params)
   };

  private validateMessages = {
    default: 'field is not valid',
    [TypeValidatorRules.required]: 'field is required',
    [TypeValidatorRules.email]: 'email is not valid',
    [TypeValidatorRules.minLength]: 'length must be more than {0}'
  };

  public getValidMessage = (ruleName: TypeValidatorRules, params: TypeValidatorRules[]) => {
    let message = this.validateMessages[ruleName] || this.validateMessages.default;
    params.forEach((param, i) => {
      message = message.replace('{' + i + '}', param)
    });
    return message
  };

  public validate (
      field: TypeHtmlFormElement,
      rules: TypeValidatorParams[],
      callback: (isValid: boolean, errors: string[]) => void
  ): boolean|undefined {

    let isValid = true;
    const errors: string[] = [];

    rules.forEach((rule: TypeValidatorParams) => {
      let ruleName: TypeValidatorRules;
      if (_isObject(rule)) {
        ruleName = +_keys(rule)[0]
      } else {
        ruleName = rule
      }

      if (!this.validateFunctions[ruleName]) {
        console.warn(`${rule} is not defined validate function`);
        return false
      }

      if (!this.validateFunctions[ruleName](field, _isObject(rule) ? rule[ruleName] : null)) {
        isValid = false;
        errors.push(this.getValidMessage(ruleName, [].concat(rule[ruleName])))
      }
      return true
    });
    // set field valid/invalid
    if (field) {
      field.setCustomValidity(errors.length ? ' ' : '');
    }
    callback(isValid, errors);

    return isValid
  }
}
export default new FieldValidator()
