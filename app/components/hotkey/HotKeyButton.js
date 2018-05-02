import React from 'react';
import PropTypes from 'prop-types';

const HotKeyButton = ({title, value, className, onChange}) => {
  function handleClick(e) {
    e.preventDefault();

    onChange(value)
  }

  className += ` c-hotkey`;

  return(
    <div className={className} onClick={handleClick}>
      {value}
    </div>
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
  className: ''
};

export default HotKeyButton;
