// @flow
import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Toggle from './Toggle';
import HotKeyButton from './HotKeyButton';
import SetKeyPopUp from './SetKeyPopUp';
import MicControl from './MicControl';

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
      <Grid  className='pt-5'>
        {showHotkeyPopup && (
          <SetKeyPopUp 
            value={hotkey}
            onChange={this.hotKeyChanged.bind(this)}/> 
        )}
      
        <Row className='my-5'>
          <Col sm={12}>
            <h2 className='mb-3 mb-md-5'>
              {project.title}
            </h2>
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
              <Col sm={12} md={6}>
                <div className='text-md-center'>
                  <MicControl />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
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
