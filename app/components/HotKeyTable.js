import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import Col from './layout/Col';

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
          <div className="c-bg-gray p-2 c-br">
            {_hotkey.hotKey}
          </div>
        </Col>
        <Col>
          <div className="c-bg-gray p-2 c-br">
          {_hotkey.action}
          </div>
        </Col>
      </Row>
    )
  }

  render() {
    const {hotkeyOptions} = this.props;

    if(!hotkeyOptions)
      return null

    return (
      <div>
        <Row>
          <Col sm={6} className='col'>
            <h5>Key</h5>
          </Col>
          <Col sm={6} className='col'>
            <h5>Action</h5>
          </Col>
        </Row>
        {hotkeyOptions.map(this.renderRow)}
      </div>
    );
  }
}

