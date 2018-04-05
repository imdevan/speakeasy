// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Toggle from '../components/Toggle';
import HotKeyButton from '../components/HotKeyButton';
import SetKeyPopUp from '../components/SetKeyPopUp';
import MicControl from '../components/MicControl';
import micSvg from '../assets/svg/mic.svg';
import background from '../assets/svg/background.svg';
import Svg from '../components/Svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as hotkeyActions from '../actions/hotkey';
import * as runOnStartupActions from '../actions/runOnStartup';
import project from '../config/project';

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
    const {runOnStartup, hotkey} = this.props;
    const {showHotkeyPopup} = this.state;

    return (
      <div>
         {showHotkeyPopup && (
            <SetKeyPopUp
              value={hotkey}
              onChange={this.hotKeyChanged.bind(this)}/>
          )}
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
        <Grid  className='pt-3'>
          <Row>
            <Col sm={12}>
              <Row>
                <Col sm={12} md={6} className='mb-5 mb-md-0'>
                  <Row className='align-items-center mb-3'>
                    <Col sm={2}>
                      <HotKeyButton
                        onChange={this.onHotkeyClick}
                        value={hotkey}/>
                    </Col>
                    <Col sm={10}>
                      Hotkey
                    </Col>
                  </Row>
                  <Row className='align-items-center'>
                    <Col sm={2}>
                      <Toggle
                        onChange={this.onToggle}
                        value={runOnStartup}/>
                    </Col>
                    <Col sm={10}>
                      Run on Startup
                    </Col>
                  </Row>
                </Col>
              </Row>
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
    runOnStartup: state.runOnStartup
  };
}

function mapDispatchToProps(dispatch){
  return {
    hotkey_actions: bindActionCreators(hotkeyActions, dispatch),
    runOnStartup_actions: bindActionCreators(runOnStartupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
