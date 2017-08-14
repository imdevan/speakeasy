import React from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class Error404Page extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return(
      <Grid>
        <Row>
          <Col sm={12} className='ad-flex justify-content-center my-5'>
            <h1>
              404
            </h1>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch){
  return{
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error404Page);
