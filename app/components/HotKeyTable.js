import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

class HotKeyTable extends Component {
  state = {  };

  render() {
    return (
      <Row>
        <Col sm={6} className='col'>
          <h5>Key</h5>
        </Col>
        <Col sm={6} className='col'>
          <h5>Action</h5>
        </Col>
      </Row>
    );
  }
}

export default HotKeyTable;
