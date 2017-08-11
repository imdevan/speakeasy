import React from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import * as categoryActions from '../../actions/categoryActions';

import {Grid, Row, Col} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import lightTheme from '../../config/lightTheme';

import Fuse from 'fuse.js'; // PROVIDES FUZZY SEARCH
import SkeletonBox from '../../components/SkeletonBox';
import HorizontalSocialButtons from '../../components/HorizontalSocialButtons';
import MailingList from '../../components/MailingList';
import Posts from '../../components/Posts';
import social from '../../config/social';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class BlogPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      activeCategories: [],
      search: ''
    };
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  componentWillMount(){
    this.props.postActions.requestAllPosts();
    this.props.categoryActions.requestAllCategories();
  }

  setActiveCategory(category){
    if(this.state.activeCategories.includes(category)){
      this.setState({...this.state,
        activeCategories: this.state.activeCategories.filter((_category) => _category !== category)
      })
    } else {
      const newCategories = this.state.activeCategories.slice();
      newCategories.push(category);
      this.setState({activeCategories:newCategories})
    }
  }

  renderCategories(categories){
    if(categories){
      return(
        <div className="categories">
          {this.filterCategoriesByCount(categories).map((category) => {
            return(
              <span key={category.id}
                className={this.state.activeCategories.includes(category)? 'category selected': 'category'}
                onClick={this.setActiveCategory.bind(null, category)}>
                {category.name}
              </span>
              )
            })
          }
        </div>
      )
    }else{
      return(
        <div className="row">
          <div className="col-8">
            <SkeletonBox
              rows={3}
              boxHeight={'30px'}
              />
          </div>
        </div>
      )
    }
  }

  filterCategoriesByCount(categories){
    if(categories){
      return categories.filter((_category) => _category.count > 0)
    }
  }

  filterPostsByActiveCategory(posts, activeCategories){
    if(posts && activeCategories){
      let activeCategoriesIDArray = activeCategories.map(category => {return category.id})
      // let filteredPosts = posts.map(post => {
      //   if(post._embedded && post._embedded['wp:term']){
      //     let postCategories = post._embedded['wp:term'][0];
      //     return postCategories.filter(category => {return category.id === activeCategories[0]})
      //   }
      // })
      // debugger
      // RETURN POSTS WHERE THE POSTS CATEGORIES MATCH ALL THE ACTIVE CATEGORIES

      return posts
    }else{
      return posts
    }
  }

  filterPostsByFuseSearch(posts, search){
    if(posts && search){
      var options = {
        shouldSort: true,
        threshold: 0.7,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: [
          "title.rendered"
        ]
      };
      var fuse = new Fuse(posts, options); // "list" is the item array
      var result = fuse.search(search);
      return result
    }else{
      return posts
    }
  }

  renderPosts(posts, search, activeCategories){
    return(
      this.filterPostsByActiveCategory(
        this.filterPostsByFuseSearch(
          posts.filter(p => p.categories.includes(211)),
          search),
        activeCategories
      )
    )
  }

  setSearch(e){
    this.setState({search: e.target.value})
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
                    this.renderPosts(
                      this.props.posts,
                      this.state.search,
                      this.state.activeCategories)
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
