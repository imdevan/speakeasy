import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';

import { Grid, Row, Col } from 'react-bootstrap';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../config/lightTheme';

import ReactMarkdown from 'react-markdown';

import MailingList from '../../components/MailingList';
import HorizontalSocialButtons from '../../components/HorizontalSocialButtons';
import TopNav from '../../components/TopNav';
import aboutContent from './AboutContent';
// var aboutContent = '# test';


class AboutPage extends React.Component{
  render(){
    return <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)} >
      <div>
        <TopNav />
        <Grid>
          <Row className='py-5'>
            <Col sm={12}>
              <ReactMarkdown
                className='c-markdown-page'
                source={aboutContent} />
            </Col>
          </Row>
        </Grid>
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
