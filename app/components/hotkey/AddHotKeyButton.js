import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';

class AddHotKeyButton extends Component {
  state = {  };

  render() {
    return (
      <div className='c-btn c-btn-round c-position-bottom-right'>
        <Icon icon='plus'/>
      </div>
    );
  }
}

export default AddHotKeyButton;
