import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';
import * as postActions from '../../actions/postActions';
import * as pageActions from '../../actions/pageActions';


import { Grid, Row, Col } from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {blue600, darkBlack, fullWhite} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import MailingList from '../../components/MailingList';
import TopNav from '../../components/TopNav';
import BackLink from '../../components/BackLink';
import PostCard from '../../components/PostCard';
import Svg from '../../components/Svg';

import defaultTheme from '../../config/theme';
import project from '../../config/project';
import headerImage from '../../assets/images/logos/bison.svg';


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
    const path = category === 210 ? 'projects' :
                category === 211 ? 'blog' :
                category === 212 ? '' : '';

    return <Row >
      {featuredArticles.map((p, i) => (
        <Col sm={12} md={4} key={i}
          className='mb-5 mb-md-0'>
          <Link to={`/${path}/${p.slug}`}
            className='c-link-no-style h-100 w-100'>
            <PostCard post={p} />
          </Link>
        </Col>
      ))}
    </Row>
  }
  render(){
    const projects = [];
    const {posts} = this.props;

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>
        <div>
          <TopNav className='fixed-top'/>

          {/* <AppBar title="My AppBar" className='mb-5'/> */}
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
                    <p>
                      <BackLink to=''>Get your freeticket</BackLink>
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
