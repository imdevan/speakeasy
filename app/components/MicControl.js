import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from './Icon';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as micActions from '../actions/microphone';

class MicControl extends Component {
  constructor(props, context){
    super(props, context);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle () {
    const {microphone, mic_actions} = this.props;
    console.log('clicked')
    mic_actions.mute(!microphone.mute);
  }

  render() {
    const {mute} = this.props.microphone;
    console.log(this.props.microphone)
    const icon = mute ? 'microphone-slash' : 'microphone';

    return (
      <Icon 
        icon={icon} 
        onClick={this.onToggle}
        className='display-1 c-pointer'/>
    );
  }
}


function mapStateToProps(state, ownProps){
  return {
    microphone: state.microphone
  };
}

function mapDispatchToProps(dispatch){
  return { 
    mic_actions: bindActionCreators(micActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MicControl);
