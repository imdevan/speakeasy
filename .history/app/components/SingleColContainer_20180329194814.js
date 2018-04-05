import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

class SingleColContainer extends Component {
  static defaultProps = {
    children: '',
    className: '',
    rowProps: {},
    colProps: {},
    children: null
  };

  render() {
    const { children, className, rowProps, colProps } = this.props;

    return (
      <Grid className={className}>
        <Row {...rowProps}>
          <Col {...colProps}>
            {children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SingleColContainer;
