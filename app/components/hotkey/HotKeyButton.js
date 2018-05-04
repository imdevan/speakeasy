import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as popUpActions from '../../actions/popUpActions'

const HotKeyButton = ({ title, value, index, className, onChange, popup_actions}) => {
  function handleClick(e) {
    e.preventDefault();

    popup_actions.show('add-hotkey', { value, index })
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

const mdp = dispatch => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
})

export default connect(null, mdp)(HotKeyButton)
