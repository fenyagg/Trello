import React, { KeyboardEvent, PureComponent, RefObject } from 'react'
import fieldValidator, { TypeHtmlFormElement, TypeValidatorParams, TypeValidatorRules } from './FieldValidator'

interface State {
  isValid?: boolean,
  errorMessage: string[]
}
interface Props {
  validRules: TypeValidatorParams[],
  component: 'input',
  required?: boolean,
  onChange?: (e: KeyboardEvent<HTMLElement>, value: string|boolean|undefined) => void,
  type?: string,
  className: string,
  onInput?: (e: KeyboardEvent<HTMLInputElement>) => void,
  onBlur?: (e: KeyboardEvent<HTMLInputElement>) => void,
  ref: RefObject<HTMLElement>,
}

class ValidateField extends PureComponent<Props, State> {
  protected field: RefObject<TypeHtmlFormElement>;
  protected rules: TypeValidatorParams[] = [];
  protected value: string = '';
  protected previewValue: string = '';
  protected wasChanged: boolean = false;

  constructor (props: Props) {
    super(props);

    this.state = {
      isValid: undefined,
      errorMessage: []
    };
    this.field = React.createRef();

    if (props.required) { this.rules.push(TypeValidatorRules.required) }

    this.rules = props.validRules;
    switch (props.type) {
      case ('email'):
        this.rules.push(TypeValidatorRules.email);
        break;
      case ('phone'):
        this.rules.push(TypeValidatorRules.phone);
        break;
      default:
        break
    }
  }

  public render () {
    const { component, validRules, ...fieldProps } = this.props;
    const wasValidate = this.state.isValid !== undefined;

    fieldProps.onInput = e => this.onInput(e);
    fieldProps.onBlur = e => this.onBlur(e);

    fieldProps.ref = this.field;
    const additionalClassName = this.state.isValid === true ? 'is-valid'
        : this.state.isValid === false ? 'is-invalid' : '';
    fieldProps.className = fieldProps.className.split(' ').concat(additionalClassName).join(' ');
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

  protected validate (): void {
    fieldValidator.validate(
        this.field.current,
        this.rules,
        (isValid: boolean, errors: string[]) => {
        this.setState({
          ...this.state,
          isValid,
          errorMessage: errors
        })
    })
  }

  protected onInput (e: KeyboardEvent<HTMLInputElement>) {
    this.value = this.field.current ? this.field.current.value : '';
    if (this.wasChanged || this.state.isValid !== undefined) { this.validate() }
    if (this.props.onChange) { this.props.onChange(e, this.state.isValid) }
  }

  protected onBlur (e: KeyboardEvent<HTMLInputElement>) {
    if (e.currentTarget.value === this.previewValue) { return }
    this.previewValue = e.currentTarget.value;
    this.wasChanged = true;
    this.validate()
  }
}

export default ValidateField
