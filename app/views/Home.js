// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../components/Icon';
import Toggle from '../components/Toggle';
import ProfileSwitcher from '../components/profileSwitcher/ProfileSwitcher';
import HotKeyTable from '../components/HotKeyTable';
import background from '../assets/svg/background.svg';
import Svg from '../components/Svg';
import Form from '../components/form/Form';

import {connect} from 'react-redux';
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import * as hotKeyActions from '../actions/hotKeyActions';
import * as currentUserActions from '../actions/currentUserActions';
import * as runOnStartupActions from '../actions/runOnStartupActions';
import {reset} from 'redux-form';

// import { withFirebase } from 'react-redux-firebase'

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
        <Grid>
          <div className='py-4 text-right'>
            <Link to='/settings' className='c-link'>
              Hi, {profile.displayName}
            </Link>
          </div>
          <Row>
            <Col sm={12}>
              <ProfileSwitcher className='mb-5'/>
              <div>
                <HotKeyTable hotkeyOptions={_activeProfile.hotKeys}/>
                <Form
                  onSubmit={this.addHotkey}
                  form='hotykeyform'
                  sections={[{
                    fieldWrapperClassName: 'row mb-3',
                    fields: [{
                      className: 'col',
                      placeholder: 'w',
                      name: 'hotKey',
                      type: 'text'
                    },{
                      className: 'col',
                      placeholder: 'action',
                      name: 'action',
                      type: 'text'
                    }]
                  }]}
                  submitButtonClassName='c-btn py-2 px-3 w-100'
                  submitLabel='Add Hotkey' />
              </div>
            </Col>
          </Row>
        </Grid>
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
