import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as hotkeyActions from '../../actions/hotkeyActions'
import ProfileTag from './ProfileTag'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class ProfileSwitcher extends Component {
  constructor(props, context) {
    super(props, context)
    const profiles = [0, 1, 2, 3, 4].map(i => ({ id: i, label: `Profile ${i + 1}` }))

    this.state = { profiles }
    this.renderProfile = this.renderProfile.bind(this)
  }


  renderProfile(_profile, i) {
    const { hotkey_actions, hotkeys } = this.props
    const active = _profile.id === hotkeys.activeProfile

    return (
      <ProfileTag key={i}
        active={active}
        {..._profile}
        onClick={hotkey_actions.setActive.bind(null, i)} />
    )
  }

  render() {
    const { firebase, profile, className = '' } = this.props

    if (isLoaded(profile) && isEmpty(profile))
      return null

    return (
      <div className={`d-flex w-100 justify-content-between ${className}`}>
        {this.state.profiles.map(this.renderProfile)}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  hotkeys: state.hotkeys
})

const mapDispatchToProps = (dispatch) => ({
  hotkey_actions: bindActionCreators(hotkeyActions, dispatch)
})

export default compose(
  firebaseConnect([
    'profile'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSwitcher)
