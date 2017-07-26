import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';


import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {blue600, darkBlack, fullWhite} from 'material-ui/styles/colors';

import MailingList from '../../components/MailingList';
import TopNav from '../../components/TopNav';

import defaultTheme from '../../config/theme';
import project from '../../config/project';

injectTapEventPlugin();

class Home extends React.Component {
  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>
        <div>
          <TopNav />
          {/* <AppBar title="My AppBar" className='mb-5'/> */}
          <div>
            <Grid>
              <Row>
                <Col sm={12} className='d-flex justify-content-center my-5'>
                  <h1>
                    {project.title}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}  className='mb-5'>
                  <Card style={{background: darkBlack}}
                    className='text-center h-100'>
                    <CardTitle style={{color: fullWhite}} title='This page contains the React library.'/>
                    <Row>
                      <Col sm={8} className='mx-auto'>
                        <hr color='#66A6E6'/>
                      </Col>
                    </Row>
                    <CardText>
                      <p>
                        The documentation can be found on react.github.io
                      </p>
                    </CardText>
                  </Card>
                </Col>
                <Col sm={12} md={6} className='mb-5'>
                  <Card style={{background: darkBlack}}
                    className='text-center h-100'>
                    <CardTitle style={{color: fullWhite}} title='Bootstrap imported via link tag.'/>
                    <Row>
                      <Col sm={8} className='mx-auto'>
                        <hr color='#66A6E6'/>
                      </Col>
                    </Row>
                    <CardText>
                      <p>
                        This isn't ideal, but not blocking the development of
                        everything else :)
                      </p>
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className='mb-5'>
                    <Card style={{background: darkBlack}}
                      className='text-center h-100'>
                      <CardTitle style={{color: fullWhite}} title='Forms and other inputs lean on  the material-ui library' />
                      <Row>
                        <Col sm={8} className='mx-auto'>
                          <hr color='#66A6E6'/>
                        </Col>
                      </Row>
                      <CardText>
                        <p>
                          Sorry Steve Jobs, not sorry 😎
                        </p>
                      </CardText>
                    </Card>
                </Col>
              </Row>
              <Row className='pb-5'>
                <Col sm={12} md={8}
                  className='my-5 offset-md-2' >
                  <MailingList
                    body={'Mailchimp integration to engage users'}/>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
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
    ui_actions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
