import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import * as categoryActions from '../../actions/categoryActions';

import {Grid, Row, Col} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../config/lightTheme';

import Posts from '../../components/Posts';
import Footer from '../../components/Footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scrollToTop from '../../utils/scrollToTop';

class BlogPage extends React.Component {
  static propTypes = {
    posts: PropTypes.array,
  };

  static defaultProps = {
    posts: [],
  };

  constructor(props, context){
    super(props, context);
    
    // this.setActiveCategory = this.setActiveCategory.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    // this.setSearch = this.setSearch.bind(this);
  }

  componentWillMount(){
    this.props.postActions.requestAllPosts();
    this.props.categoryActions.requestAllCategories();
  }

  componentDidMount() {
    scrollToTop();
  }
  
  // filterPostsByFuseSearch(posts, search){
  //   if(posts && search){
  //     var options = {
  //       shouldSort: true,
  //       threshold: 0.7,
  //       location: 0,
  //       distance: 100,
  //       maxPatternLength: 32,
  //       minMatchCharLength: 3,
  //       keys: [
  //         "title.rendered"
  //       ]
  //     };
  //     var fuse = new Fuse(posts, options); // "list" is the item array
  //     var result = fuse.search(search);
  //     return result
  //   }else{
  //     return posts
  //   }
  // }

  renderPosts(posts){
    return(posts.filter(p => p.categories.includes(211)));
  }

  render(){
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)} >
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
                <h1 className='display-3'>
                  Blog
                </h1>
                <p>
                  Take notes.
                </p>
              </Col>
            </Row>
            <Row className=''>
              <Col sm={12} md={8}>
                  <Posts posts={
                    this.renderPosts(this.props.posts)
                  }/>
              </Col>
              {/* <Col sm={12} md={4}>
                <TextField
                  type='text'
                  value={this.state.search}
                  onChange={this.setSearch}
                  floatingLabelText='Search Posts'
                  className='mb-3'/>

                <div className='mb-3'>
                  <h4>Categories</h4>
                  {this.renderCategories(this.props.categories.allCategories)}
                </div>
              </Col> */}
            </Row>
          </Grid>
          <Footer />
          </ReactCSSTransitionGroup>
        </div>
      </MuiThemeProvider>
    );
  }
}

// <div className="pageCircle">
//  <Link to="/posts">
//    <div className="button">
//      <i className="fa fa-rss"></i>
//    </div>
//  </Link>
// </div>
function mapStateToProps(state, ownProps){
  return {
    ui: state.ui,
    posts: state.posts.allPosts,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch){
  return{
    postActions: bindActionCreators(postActions, dispatch),
    categoryActions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
