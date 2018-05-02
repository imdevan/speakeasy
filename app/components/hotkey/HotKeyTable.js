import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import Col from '../layout/Col';
import HotKey from './HotKeyButton';

export default class HotKeyTable extends Component {
  constructor(props, context){
    super(props, context);

    this.renderRow = this.renderRow.bind(this);
  }
  renderRow(_hotkey, i){
    const {hotkeyOptions} = this.props;
    return (
      <Row key={_hotkey.hotKey + i} className='mb-3'>
        <Col>
          <HotKey value={_hotkey.hotKey} />
        </Col>
        <Col>
          <div className="c-action">
          {_hotkey.action}
          </div>
        </Col>
      </Row>
    )
  }

  render() {
    const {hotkeyOptions = []} = this.props;

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

