// @flow
import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {reset} from 'redux-form'

import * as hotkeyActions from '../actions/hotkeyActions'
import * as currentUserActions from '../actions/currentUserActions'


import Icon from '../components/common/Icon'
import Svg from '../components/common/Svg'
import SCC from '../components/layout/SingleColContainer'
import ProfileSwitcher from '../components/profileSwitcher/ProfileSwitcher'
import background from '../assets/svg/background.svg'
import HotKeyTable from '../components/hotkey/HotKeyTable'
import AddHotKeyButton from '../components/hotkey/AddHotKeyButton'
import loadingString from '../utils/loadingString'

class Home extends Component {
  constructor(props, context){
    super(props, context)

    this.state = {
      showHotkeyPopup: false,
      activeProfile: 0,
      propsLoaded: false
    }
  }

  renderLoading(){
    return (
      <div className='fixed-top d-flex h-100 w-100 justify-content-center align-items-center'>
        <h3 className='mb-0 text-center'>
          {loadingString()}
        </h3>
      </div>
    )
  }
  render() {
    const { profile, firebase, hotkey_actions } = this.props

    if(!isLoaded(profile))
      return this.renderLoading()

    const {hotKeyProfiles, activeProfile} = profile
    const _activeProfile = hotKeyProfiles && (typeof activeProfile !== 'undefined') ? hotKeyProfiles[activeProfile] : []

    return (
      <div>
        <SCC rowProps={{className:'h-100'}}>
          <div className='py-4 text-right'>
            <Link to='/settings' className='c-link'>
              Hi, {profile.displayName}
            </Link>
          </div>
          <ProfileSwitcher className='mb-5'/>
          <HotKeyTable hotkeyOptions={_activeProfile.hotkeys}/>
        </SCC>

        <SCC className='fixed-bottom'>
          <AddHotKeyButton onAddHotKey={hotkey_actions.add} />
        </SCC>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps){
  return {
    auth: state.firebase.auth,
    currentUser:  state.currentUser,
    profile: state.firebase.profile
  }
}

function mapDispatchToProps(dispatch){
  return {
    hotkey_actions: bindActionCreators(hotkeyActions, dispatch),
    current_user_actions: bindActionCreators(currentUserActions, dispatch),
  }
}

export default compose(
  firebaseConnect ([
    'profile'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Home))
