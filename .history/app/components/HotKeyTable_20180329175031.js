import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

class HotKeyTable extends Component {
  state = {  };

  render() {
    return (
      <Row>
        <Col xs={6} className='col w-100'>
          <h5>Key</h5>
        </Col>
        <Col xs={6} className='col w-100'>
          <h5>Action</h5>
        </Col>
      </Row>
    );
  }
}

export default HotKeyTable;
