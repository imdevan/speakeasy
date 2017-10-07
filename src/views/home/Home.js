import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';
import * as postActions from '../../actions/postActions';
import * as pageActions from '../../actions/pageActions';
import ScrollToTop from '../../components/ScrollToTop';


import { Grid, Row, Col } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router-dom';
import BackLink from '../../components/BackLink';
import PostCard from '../../components/PostCard';
import Footer from '../../components/Footer';
import Svg from '../../components/Svg';
import homeContent from './homeContent';

import defaultTheme from '../../config/theme';
import project from '../../config/project';
import categories from '../../config/categories';
import redirects from '../../config/redirects';
import headerImage from '../../assets/images/logos/studio-microphone.png';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scrollToTop from '../../utils/scrollToTop';


class Home extends React.Component {
  constructor(props, context){
    super(props, context);

    this.renderFeatures = this.renderFeatures.bind(this);
    this.renderIntegrations = this.renderIntegrations.bind(this);
  }
  componentWillMount(){
    const {post_actions, page_actions} = this.props;
    post_actions.requestAllPosts();
    page_actions.requestAllPages();
  }
  
  componentDidMount() {
    scrollToTop();
  }
  
  renderFeatures() {
    if(!homeContent) return null
    return homeContent.features.map((feature, i) => {
        const odd = (i+1) % 2;
        const rowClass = `flex-column align-items-center 
          flex-md-row${!odd ? '-reverse' : ''}
          ${i === 0 ? 'pb-5 mb-5' : 
            (i+1) === homeContent.features.length ? 'pt-5 mt-5' : 
            'py-5 my-5'}`;

            return (
          <Row className={rowClass} key={i}>
            <Col sm={12} md={8} lg={6} className='h-100 mb-3 mb-md-0'>
              <img className='c-shadow-lg w-100' src={feature.image} />
            </Col>
            <Col sm={12} md={8} lg={6} className='h-100'>
              <div className='p-4'>
                <h3 className='font-title'>
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                </p>
              </div>
            </Col>
          </Row>
        )
      }
    )
  }
  renderIntegrations() {
    if(!homeContent) return null

    return (
      <Row className='align-items-end'>
        {homeContent.integrations.map((integration, i) => (
          <Col key={i} sm={4} md={4} lg={4} className='h-100 mb-3 mb-md-0 text-center'>
            <img src={integration.image} style={{width: 100}} />
          </Col>
         ))}
      </Row>
    )
  }
  
  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>
          <div>
        <ReactCSSTransitionGroup
          transitionName='fade-in-from-right'
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={300}
          transitionEnter={false}>
            {/* <AppBar title='My AppBar' className='mb-5'/> */}
            <div>
              <div className='w-100 my-5 py-5'>
                <Grid className='my-5 py-5'>
                  <Row>
                    <Col sm={12} className='text-center'>
                      <Row className='justify-content-center'>
                        <Col className='col-8 col-md-6'>
                          <img src={headerImage}
                            className='c-drop-shadow-sm'/>
                        </Col>
                      </Row>
                      <h1 className='display-4 display-md-1 mb-4 font-title'>
                        {homeContent.title}
                      </h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className='text-center font-sub-title'>
                      <h3 
                      dangerouslySetInnerHTML={{__html: homeContent.subtitle}}/>
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className='w-100 c-bg-light-gray py-5 my-5'>
                <Grid className='my-5 py-5'>
                  <Row>
                    <Col sm={12} className=''>
                      {this.renderFeatures()}
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className='w-100 my-5 py-5'>
                <Grid className='my-5 py-5'>
                  <Row className='mb-5'>
                    <Col sm={12} md={8} className='text-center offset-md-2'>
                      <h3 className='font-title'>
                        {homeContent.valueProp.title}
                      </h3>
                      <p dangerouslySetInnerHTML={{
                        __html: homeContent.valueProp.description
                        }}  
                      />
                    </Col>
                  </Row>
                  <Row className='justify-content-center'>
                    <Col sm={12} md={6}>
                      {this.renderIntegrations()}
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className='w-100 c-bg-light-gray py-5 my-5'>
                <Grid className='my-5 py-5'>
                  <Row>
                    <Col sm={12} className='text-center'>
                      <h2 className='font-title'>
                        {homeContent.finalSell.title}
                      </h2>
                      <p>
                        {homeContent.finalSell.description}
                      </p>
                      <p className='text-center mt-5'>
                        {/* <CTA to=''  */}
                          {/* label='Get your FREE ticket' /> */}
                          <a className="typeform-share c-cta font-title" 
                            href="https://bisonstudio.typeform.com/to/HjPCvy" 
                            data-mode="popup" 
                            target="_blank">{homeContent.finalSell.cta}</a>
                      </p>
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className='w-100 my-5 py-5'>
                <Grid className='my-5 py-5'>
                  <Row className='justify-content-center'>
                    <Col sm={8} className='text-center'>
                      <h2 className='font-title'>
                        {homeContent.upsell[0].title}
                      </h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: homeContent.upsell[0].description
                        }}
                      />
                      <Svg 
                        src={homeContent.upsell[0].image} 
                        className='m-auto'
                        width={100}/>
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
            <Footer />
            </ReactCSSTransitionGroup>
          </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    ui: state.ui,
    posts: state.posts,
    pages: state.pages
  };
}

function mapDispatchToProps(dispatch){
  return{
    ui_actions: bindActionCreators(uiActions, dispatch),
    post_actions: bindActionCreators(postActions, dispatch),
    page_actions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
