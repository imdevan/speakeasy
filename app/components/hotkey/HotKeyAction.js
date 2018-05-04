import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown';

const HotKeyButton = ({value = ' ', className}) => {
  function handleClick(e) {
    e.preventDefault();

    onChange(value)
  }

  return(
    <Dropdown
      className={className}
      options={[
        {label: 'Macro >'},
        {label: 'Media >'},
        {label: 'System >'},
        {label: 'Open App >'},
        {label: 'Single Key'},
        {label: 'Combo Key'},
        <hr/>,
        {label: 'Switch Profile'},
        {label: 'Disable'},
      ]}>
      <div>
        {value || <span>&nbsp;</span>}
      </div>
    </Dropdown>
  )
};

HotKeyButton.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
};

HotKeyButton.defaultProps = {
  value: '',
  title: '',
  onChange: () => {},
  className: 'c-action'
};

export default HotKeyButton;
