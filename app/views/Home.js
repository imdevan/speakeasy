// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../components/common/Icon';
import Svg from '../components/common/Svg';
import SCC from  '../components/layout/SingleColContainer'
import ProfileSwitcher from '../components/profileSwitcher/ProfileSwitcher';
import background from '../assets/svg/background.svg';
import HotKeyTable from '../components/hotkey/HotKeyTable';
import AddHotKeyButton from '../components/hotkey/AddHotKeyButton';
import {connect} from 'react-redux';
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import * as hotKeyActions from '../actions/hotKeyActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as runOnStartupActions from '../actions/runOnStartupActions';
import {reset} from 'redux-form';

class Home extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      showHotkeyPopup: false,
      activeProfile: 0,
      propsLoaded: false
    };

    this.addHotkey = this.addHotkey.bind(this);
  }

  addHotkey(formValues){
    const {profile, firebase, form_actions, currentUser, current_user_actions} = this.props;
    let {activeProfile, hotKeyProfiles} = profile;

    if(!formValues.hotKey || !formValues.action)
      return null;

    if(hotKeyProfiles[activeProfile].hotKeys)
      hotKeyProfiles[activeProfile].hotKeys.push(formValues);
    else
      hotKeyProfiles[activeProfile].hotKeys = [formValues];

    current_user_actions.updateProfile({hotKeyProfiles}).then(() => {
      form_actions.reset('hotykeyform')
    });
  }

  render() {
    const {runOnStartup, hotkey, profile, firebase, currentUser} = this.props;

    if(!isLoaded(profile))
      return <div>Constructing addtional pylons...</div>

    const {hotKeyProfiles, activeProfile} = profile;
    const _activeProfile = hotKeyProfiles && (typeof activeProfile !== 'undefined') ? hotKeyProfiles[activeProfile] : [];

    return (
      <div>
        <div className='fixed-top c-z--1 w-100 h-100'>
          <Svg src={background}   />
        </div>
        <div className='c-bg-svg'>
          <SCC style={{height:'100vh'}}  rowProps={{className:'h-100'}}>
            <div className='py-4 text-right'>
              <Link to='/settings' className='c-link'>
                Hi, {profile.displayName}
              </Link>
            </div>
            <ProfileSwitcher className='mb-5'/>
            <HotKeyTable hotkeyOptions={_activeProfile.hotKeys}/>
            <AddHotKeyButton />
          </SCC>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps){
  return {
    hotkey: state.hotkey,
    runOnStartup: state.runOnStartup,
    auth: state.firebase.auth,
    currentUser:  state.currentUser,
    profile: state.firebase.profile
  };
}

function mapDispatchToProps(dispatch){
  return {
    hotkey_actions: bindActionCreators(hotKeyActions, dispatch),
    current_user_actions: bindActionCreators(currentUserActions, dispatch),
    runOnStartup_actions: bindActionCreators(runOnStartupActions, dispatch),
    form_actions: bindActionCreators({reset}, dispatch),
  };
}

export default compose(
  firebaseConnect ([
    'profile'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Home))
