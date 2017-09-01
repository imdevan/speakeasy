// NODE MODULES
import React from 'react';

// VENDOR UI COMPONENTS
import {Grid, Row, Col} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Footer from '../../components/Footer';
import scrollToTop from '../../utils/scrollToTop';


const errorPage = () => {
  scrollToTop();

  return (
    <ReactCSSTransitionGroup
      transitionName='fade-in-from-right'
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionLeaveTimeout={300}
      transitionEnter={false}>
      <Grid className='py-5'>
        <Row className='my-5'>
          <Col sm={12}>
            <h1 className='display-1'>
              Whoops! <span className=''>404</span>
            </h1>
            <h3 className='mb-4'>
              Looks like that page doesn't exist, or was removed.
            </h3>
            <p>
              Sorry about that...
            </p>
            <p>
              Message us bellow, or send us an email
              at&nbsp;<a href='mailto:hello@bisonstudio.co'>
                hello@bisonstudio.co
              </a>&nbsp;if you need help looking for something.
            </p>
          </Col>
        </Row>
      </Grid>
      <Footer />
    </ReactCSSTransitionGroup>
  )
};

export default errorPage;
