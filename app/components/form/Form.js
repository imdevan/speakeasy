// TODO: implement block form using redux forms
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import Select from './input/Select';

import 'react-select/dist/react-select.css';
class Form extends  React.Component {
  static defaultProps = {
    sections: [],
    submitButtonClassName: 'c-btn c-btn--cta disabled text-center w-100',
    submitLabel: 'Submit',
    className: '',
    showSubmitButton: true
  }

  renderFieldInput = (field) => {
    const {
      name,
      component = 'input',
      type = 'text',
      required,
      placeholder = null,
      rows,
      className = 'w-100 mb-3',
      selectOnFocus = true,
      options
    } = field;

    if(type === 'select') {
      return (
        <Field {...{
          name,
          component: Select,
          type,
          required,
          className,
          placeholder,
          options,
          rows
        }} onFocus={e => selectOnFocus && e.target.select()}/>
      )
    }

    else {
      return (
        <Field {...{
          name,
          component,
          type,
          required,
          className,
          placeholder,
          rows
        }} onFocus={e => selectOnFocus && e.target.select()}/>
      )
    }
  }

  renderField = (field, key)  => {
    const {initialValues} = this.props;
    const {
      name,
      label,
      subLabel,
      className = 'w-100 mb-3',
    } = field;

  return (
      <div key={key} className={className || ''}>
        {label && (
          <label htmlFor={name}>
            {label}
            {subLabel && <small htmlFor={name}><br/>{subLabel}</small>}
          </label>
        )}
        {this.renderFieldInput(field)}
      </div>
    )
  }

  renderSection = (section, key) => {
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
    const { sections, submitLabel, submitButtonClassName, showSubmitButton, className, pristine, submitting, handleSubmit } = this.props;

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
const mapStateToProps = (state,ownProps) => ({
    initialValues: ownProps.initialValues || {}
});
export default connect(mapStateToProps)(reduxForm({})(Form));
