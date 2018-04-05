// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Toggle from '../components/Toggle';
import HotKeyButton from '../components/HotKeyButton';
import ProfileSwitcher from '../components/ProfileSwitcher';
import HotKeyTable from '../components/HotKeyTable';
import background from '../assets/svg/background.svg';
import Svg from '../components/Svg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as hotkeyActions from '../actions/hotkey';
import * as runOnStartupActions from '../actions/runOnStartup';
import project from '../config/project';

import { withFirebase } from 'react-redux-firebase'
import { debug } from 'util';

class Home extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      showHotkeyPopup: false
    };

    this.onToggle = this.onToggle.bind(this);
    this.onHotkeyClick = this.onHotkeyClick.bind(this);
    this.hotKeyChanged = this.hotKeyChanged.bind(this);
  }
  onToggle (ros) {
    const {runOnStartup_actions} = this.props;
    runOnStartup_actions.setRunOnStartup(ros);
  }
  onHotkeyClick () {
    this.setState({showHotkeyPopup: true});
  }
  hotKeyChanged (key) {
    const {hotkey_actions} = this.props;

    hotkey_actions.setHotkey(key);
    this.setState({showHotkeyPopup: false});
  }
  render() {
    const {runOnStartup, hotkey, profile, firebase} = this.props;
    const {showHotkeyPopup} = this.state;

    if(!profile){
      debugger
      firebase.login({
        provider: 'google',
        type: 'popup'
      });
    }
    debugger
    return (
      <div>
        <div className='fixed-top c-z--1 w-100 h-100'>
          <Svg src={background}   />
        </div>
        <div className='c-bg-gray-5 h-2'>
          <Grid>
            <Row>
              <Col sm={12}>
                <div className='w-100 p-2 text-right text-white text-sm'>Hi, Devan</div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className='c-bg-svg'>
        <Grid  className='pt-5'>
          <Row>
            <Col sm={12}>
              <ProfileSwitcher className='mb-3'/>
              <HotKeyTable/>
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
    profile: state.firebase.profile
  };
}

function mapDispatchToProps(dispatch){
  return {
    hotkey_actions: bindActionCreators(hotkeyActions, dispatch),
    runOnStartup_actions: bindActionCreators(runOnStartupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(Home));
