import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux'

import * as popUpActions from '../../actions/popUpActions'

import {Row} from 'react-bootstrap';
import Col from '../layout/Col';
import Icon from '../common/Icon';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKeyboard from '@fortawesome/fontawesome-pro-light/faKeyboard'
import faUserAstronaut from '@fortawesome/fontawesome-pro-light/faUserAstronaut'

import HotKey from './HotKeyButton';
import HotKeyAction from './HotKeyAction';
import { debug } from 'builder-util';

class HotKeyTable extends Component {
  constructor(props, context){
    super(props, context);

    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyState = this.renderEmptyState.bind(this);
  }

  renderEmptyState(_hotkey, i){
    const {hotkeyOptions} = this.props

    return (
      <Row className='align-items-center my-md-5 py-md-5 mx-md-5 px-md-5 mb-md-3'>
        <Col sm={3} className='mb-4 mb-md-0'>
          <h1 className='display-1 text-center'>
            <FontAwesomeIcon icon={faUserAstronaut} />
          </h1>
        </Col>
        <Col sm={12} md={9}>
          <h2>
            Looks like you don't have any hotkeys added,
            hit the plus button to add one now
          </h2>
        </Col>
      </Row>
    )
  }

  renderRow(_hotkey, i){
    const {hotkeyOptions} = this.props

    return (
      <Row key={_hotkey.hotKey + i} className='mb-3'>
        <Col>
          <HotKey value={_hotkey.hotKey} index={i} />
        </Col>
        <Col>
          <HotKeyAction value={_hotkey.action} />
        </Col>
      </Row>
    )
  }

  render() {
    const {hotkeyOptions} = this.props

    if(!hotkeyOptions)
      return this.renderEmptyState()

    return (
      <div>
        <Row>
          <Col sm={6} className='col mb-3'>
            <h5>Key</h5>
          </Col>
          <Col sm={6} className='col mb-3'>
            <h5>Action</h5>
          </Col>
        </Row>
        {hotkeyOptions.map(this.renderRow)}
      </div>
    );
  }
}

const mdp = dispatch => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
})

export default connect(null, mdp)(HotKeyTable)
