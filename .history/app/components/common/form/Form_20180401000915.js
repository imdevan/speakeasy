// TODO: implement block form using redux forms
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import PhoneInput from './PhoneInputV2';

class BlockForm extends  React.Component {
  static defaultProps = {
    sections: [],
    submitButtonClassName: 'c-btn c-btn--cta disabled text-center w-100',
    submitLabel: 'Submit',
    className: '',
    showSubmitButton: true
  }
  constructor(props, context){
    super(props, context);
    this.renderField = this.renderField.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  renderField(field, key) {
    const {initialValues} = this.props;
    const {
      name,
      component = 'input',
      type = 'text',
      required,
      placeholder = null,
      rows,
      label,
      className = 'w-100',
      subLabel
    } = field;

  return (
      <div key={key} className={className || ''}>
        {label && (
          <label htmlFor={name}>
            {label}
            {subLabel && <small htmlFor={name}><br/>{subLabel}</small>}
          </label>
        )}
        <Field {...{
            name,
            component,
            type,
            required,
            placeholder,
            rows,
            label,
            className,
            subLabel
          }}/>
      </div>
    )
  }

  renderSection(section, key){
    const {body} = section;

    return (
      <div className="c-field;
      block" key={key}>
        {section.header && <h4>{section.header}</h4>}
        <div className={section.fieldWrapperClassName || ''}>
          {section.fields && section.fields.map(this.renderField)}
          {body && body}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit, sections, submitLabel, submitButtonClassName, showSubmitButton, className, pristine, submitting} = this.props;
    console.log('initialValues', this.props.initialValues);

    return (
      <form onSubmit={handleSubmit} className={className}>
        {sections.map(this.renderSection)}
        {showSubmitButton && (
        <button className={submitButtonClassName} type="submit" disabled={pristine || submitting}>
          <h5 className="mb-0">
            {submitLabel}
          </h5>
        </button>
        )}
      </form>
    )
  }
}

export default connect((state,ownProps) => ({
  initialValues: ownProps.initialValues || {}
}), null)(reduxForm({})(BlockForm));
