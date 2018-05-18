import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../common/Dropdown'

const HotKeyAction = ({value = ' ', className}) => {
  function handleClick(e) {
    e.preventDefault()

    onChange(value)
  }

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
          onClick: () => console.log('remove hotkey here')
        }
      ]}>

      <div className='text-center'>
        {value || <span>👌</span>}
      </div>
    </Dropdown>
  )
}

HotKeyAction.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}

HotKeyAction.defaultProps = {
  value: '',
  title: '',
  onChange: () => {},
  className: ''
}

export default HotKeyAction
