import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';

import { Grid, Row, Col } from 'react-bootstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../config/lightTheme';

import ReactMarkdown from 'react-markdown';

import aboutContent from './AboutContent';
import CTA from '../../components/CTA';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AboutPage extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render(){
    return <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)} >
      <div>
        
    <ReactCSSTransitionGroup
      transitionName='fade-in-from-right'
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionLeaveTimeout={300}
      transitionEnter={false}>
        <Grid className='py-5'>
          <Row className='my-5'>
            <Col sm={12}>
              <h1 className='display-3 mb-5'>
                {aboutContent.title}
              </h1>
              <ReactMarkdown
                className='c-markdown-page'
                source={aboutContent.content} />
            </Col>
          </Row>
          <Row className='py-5'>
            <Col sm={12} className='text-center'>
              <CTA to='' 
                label='Get started' />
            </Col>
          </Row>
        </Grid>
        </ReactCSSTransitionGroup>
      </div>
    </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
