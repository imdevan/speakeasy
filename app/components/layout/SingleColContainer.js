import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

class SingleColContainer extends Component {
  static defaultProps = {
    children: '',
    className: '',
    style: {},
    rowProps: {},
    colProps: {},
    children: null
  };

  render() {
    const { children, className, style, rowProps, colProps } = this.props;

    return (
      <Grid className={className} style={style}>
        <Row {...rowProps}>
          <Col sm={12} {...colProps}>
            {children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SingleColContainer;
