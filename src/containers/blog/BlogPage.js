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
import lightTheme from '../../config/lightTheme.js';

import Fuse from 'fuse.js'; // PROVIDES FUZZY SEARCH
import SkeletonBox from '../common/skeleton/SkeletonBox';
import HorizontalSocialButtons from '../common/HorizontalSocialButtons';
import MailingList from '../common/MailingList';
import Posts from './post/Posts';
import social from '../../config/social.js';
import TopNav from '../../components/TopNav';

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
      // TAKE IT OUT
      this.setState({...this.state,
        activeCategories: this.state.activeCategories.filter((_category) => _category !== category)
      })
    }else{
      // PUSH IT ON
      var newCategories = this.state.activeCategories.slice();
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

  renderSocialShare(){
    return(
      <div>
        <Row className=' flex justify-content-around'>
          <Col xs={4}>
            <a href={social.twitter} target="_blank" className='d-block w-100'>
              <h3 className='my-0'>
                <i className="fa fa-twitter"></i>
              </h3>
            </a>
          </Col>
          <Col xs={4}>
            <a href={social.facebook} target="_blank" className='d-block w-100'>
              <h3 className='my-0'>
                <i className="fa fa-facebook"></i>
              </h3>
            </a>
          </Col>
          <Col xs={4}>
            <a href={social.email} target="_blank" className='d-block w-100'>
              <h3 className='my-0'>
                <i className="fa fa-envelope-o"></i>
              </h3>
            </a>
          </Col>
        </Row>
      </div>
    )
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
          posts,
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
          <TopNav />
          <Grid>
            <Row className='my-5'>
              <Col className='col'>
                <h1>
                  Blog
                </h1>
                <p>
                  Take notes.
                </p>
              </Col>
            </Row>
            <Row className='my-5'>
              <Col xs={12} md={8}>
                  <Posts posts={
                    this.renderPosts(
                      this.props.posts,
                      this.state.search,
                      this.state.activeCategories)
                  }/>
              </Col>
              <Col xs={12} md={4}>
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
                <div>
                  <h4>Say Hello</h4>
                  <Card className='py-3 px-3 w-100'>
                    {this.renderSocialShare()}
                  </Card>
                </div>
              </Col>
            </Row>
            <Row className='my-5'>
              <Col xs={12} lg={8} lgOffset={2}>
                <MailingList
                  header={'Awesome, spam-less, articles right to your inbox.'}/>
              </Col>
            </Row>
          </Grid>
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
