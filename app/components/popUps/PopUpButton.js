import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as popUpActions from '../../actions/popUpActions'
import PopUp from './PopUp'

class PopUpButton extends React.Component {
  state = { open: this.props.open }
  
  openPopUp = (e) => {
    const { onClick, name, popup_actions } = this.props

    popup_actions.show(name)
    onClick()
  }

  renderButton = () => {
    const { button, buttonClassName, buttonLabel, disabled } = this.props
    const onClick = disabled ? null : this.openPopUp

    if (button && React.isValidElement(button)) {
      return React.cloneElement(button, { onClick })
    } else {
      return (
        <button className={`${buttonClassName}`} onClick={onClick}>
          {buttonLabel}
        </button>
      )
    }
  }

  render() {
    const { children, className, name, onShow, onHide } = this.props

    return (
      <div className={className}>
        {this.renderButton()}

        <PopUp {...{name, onShow, onHide}}>
          {children}
        </PopUp>
      </div>
    )
  }
}


PopUpButton.propTypes = {
  name: PropTypes.string.isRequired,
}

PopUpButton.defaultProps = {
  onClick: () => { },
  onShow: () => { },
  onHide: () => { },
  className: '',
  disabled: false,
  buttonClassName: 'c-btn',
  buttonLabel: 'Open popup',
}


function mapDispatchToProps(dispatch) {
  return {
    popup_actions: bindActionCreators(popUpActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PopUpButton)
