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
import Svg from '../../components/Svg';

import defaultTheme from '../../config/theme';
import project from '../../config/project';
import categories from '../../config/categories';
import redirects from '../../config/redirects';
import headerImage from '../../assets/images/logos/bison.svg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Home extends React.Component {
  constructor(props, context){
    super(props, context);
    this.renderFeaturedArticles = this.renderFeaturedArticles.bind(this);
    this.filterPostsCategory = this.filterPostsCategory.bind(this);
  }
  componentWillMount(){
    const {post_actions, page_actions} = this.props;
    post_actions.requestAllPosts();
    page_actions.requestAllPages();
  }
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  filterPostsCategory(category, count = 3) {
    const {posts} = this.props;
    if(!posts || !posts.allPosts) return null;

    if(!category)
      return posts.allPosts.slice(0, count)

    return posts.allPosts
      .filter(p => p.categories.includes(category)).slice(0, count)
  }
  renderFeaturedArticles(category) {
    const featuredArticles = this.filterPostsCategory(category);
    const path = categories[category];

    if(!featuredArticles) return null;
    
    return <Row >
      <ScrollToTop/>

      {featuredArticles.map((p, i) => {
        const redirect = redirects[p.slug];
        const card = redirect ? 
          <a href={redirect} target='_blank'
            className='c-link-no-style h-100 w-100'><PostCard post={p} /></a> :
          <Link to={`/${path}/${p.slug}`}
            className='c-link-no-style h-100 w-100'>
            <PostCard post={p} />
          </Link>;

        return <Col sm={12} md={4} key={i}
          className='mb-5 mb-md-0'>
          {card}
        </Col>
      })}
    </Row>
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
              <Grid>
                <Row>
                  <Col sm={12} className='text-center my-5 pt-5 '>
                    <Row className='justify-content-center'>
                      <Col className='col-8 col-md-6'>
                        <Svg src={headerImage}
                          className='c-drop-shadow-sm w-100'/>
                      </Col>
                    </Row>
                    <h1 className='display-3 display-md-1'>
                      {project.title}
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className='my-5'>
                    <p>
                      <BackLink to='imdevan.com'>A design, code, and consulting
                      studio</BackLink> that specializes in
                      creating procuts that live on the web.
                      Bison Studio is&nbsp;<BackLink to='imdevan.com'>owned and
                      operated by
                      Devan Huapaya</BackLink>. And usually operates with
                      partartner freelancers and agencies.
                      &nbsp;<BackLink to='imdevan.com'>The end results are products
                      </BackLink> built on partnerships with the
                      users in mind.
                    </p>
                  </Col>
                </Row>
              </Grid>
              <div className='w-100 c-bg-light-gray py-5 my-5'>
                <Grid>
                  <Row className='py-5'>
                      <Col sm={12} className='my-5'>
                      <h2 className='mb-5'>
                        Projects 2017 to Now
                      </h2>
                      {this.renderFeaturedArticles(210)}
                    </Col>
                  </Row>
                </Grid>
              </div>
            <Grid>
              <Row className='py-5'>
                  <Col sm={12} className='my-5'>
                    <h2 className='mb-5'>
                      What We're Up To
                    </h2>
                    {this.renderFeaturedArticles(211)}
                  </Col>
                </Row>
                  <Row className='py-5'>
                      <Col sm={12} className='my-5'>
                    <h2 className='mb-5'>
                      Bison Studio in The Community
                    </h2>
                    {this.renderFeaturedArticles(212)}
                  </Col>
                </Row>
                </Grid>
                <div className='w-100 c-bg-light-gray py-5 my-5'>
                  <Grid>
                    <Row className='py-5'>
                        <Col sm={12} className='my-5'>
                      <h2>
                        Before you go,
                      </h2>
                      <h2 className='mb-5'>
                        A gift for you!
                      </h2>
                      <p>
                        That's Right! Because you're awesome and made it this far.
                      </p>
                      <p>
                        I'm giving you a free pass to Bison Studio's first procut webinar.
                      </p>
                      <p className='text-center mt-5'>
                        {/* <CTA to=''  */}
                          {/* label='Get your FREE ticket' /> */}
                           <a className="typeform-share c-cta" 
                            href="https://bisonstudio.typeform.com/to/HjPCvy" 
                            data-mode="popup" 
                            target="_blank">Get your FREE ticket</a>  
                      </p>
                    </Col>
                  </Row>
                  </Grid>
                </div>
                <Grid>
                  <Row className='py-5'>
                      <Col sm={12} className='my-5 text-center'>
                    <h2>
                      Cheers,
                    </h2>
                    <h2 className='mb-5'>
                      👋
                    </h2>
                  </Col>
                </Row>
              </Grid>
            </div>
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
