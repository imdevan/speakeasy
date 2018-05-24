import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getLabel from '../../utils/hotkeys/getLabel'

import * as hotkeyActions from '../../actions/hotkeyActions'

import Dropdown from '../common/Dropdown'


class HotkeyAction extends Component {
  render(){
    const { hotkey, className } = this.props
    const { action } = hotkey

    return(
      <Dropdown
        className={`c-action ${className}`}
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
          <hr/>,
          {
            label: 'Remove Hotkey',
            onClick: () => hotkey_actions.remove()
          }
        ]}>

        <div className='text-center'>
          {getLabel(action)}
        </div>
      </Dropdown>
    )
  }
}

HotkeyAction.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}

HotkeyAction.defaultProps = {
  value: '',
  title: '',
  onChange: () => {},
  className: ''
}


const mdp = dispatch => ({
  hotkey_actions: bindActionCreators(hotkeyActions, dispatch),
})

export default connect(null, mdp)(HotkeyAction)

