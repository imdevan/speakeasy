import React from 'react';
import PropTypes from 'prop-types';

const Toggle =({title, value, className, toggleclassName, onChange,
disabled, children}) =>{
  function handleClick(e) {
    e.preventDefault();
    if(disabled)  return

    onChange(!value)
  }

  console.log('value', value);
  let toggleStyles = `${value === true ? 'on' : ''} ${disabled === true ? 'disabled' : ''}`;
  className += ` c-toggle ${toggleStyles}`;
  toggleclassName += ` c-toggle__toggle ${toggleStyles}`;

  function renderToggle(className, handleClick, toggleclassName, children){
    if(!disabled){
      return(
        <div className={className} onClick={handleClick}>
          <div className={toggleclassName} children={children} />
        </div>
      )
    }else{
      return(
        <div className={className}>
          <div className={toggleclassName} children={children} />
        </div>
      )
    }
  }
  return (
    renderToggle(className, handleClick, toggleclassName, children)
  );
};

Toggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  toggleclassName: PropTypes.string,
  children:  PropTypes.object
};

Toggle.defaultProps = {
  value: false,
  onChange: () => {},
  disabled: false,
  className: '',
  toggleclassName: '',
  children: null
}
export default Toggle
