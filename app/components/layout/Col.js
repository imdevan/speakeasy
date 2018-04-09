import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

export default ({children, ...props}) => {
  const {className = ''} = props;

  return (
    <Col {...props} className={`col ${className}`} >
      {children}
    </Col>
  )
}

