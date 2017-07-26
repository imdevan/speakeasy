import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as postActions from '../actions/postActions';

import sanitizeHtml from 'sanitize-html'; //https://www.npmjs.com/package/sanitize-html
// import Spinner from '../../common/ReactSpinner';
import SkeletonBox from './SkeletonBox';
import {Grid, Row, Col} from 'react-bootstrap';

class Posts extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      // posts: {}
    };
    this.displayPosts = this.displayPosts.bind(this);
  }

  renderPostByType(post){
    if(post){
      if(post.type === 'post' && post._embedded['wp:featuredmedia']){
        return this.postRow(post)
      }else if(post.type === 'post'){
        return this.postRow(post)
      }
    }else{
      return null
    }
  }

  displayPosts(posts){
    if(posts){
      if(posts.length > 0){
        return <div>
            {posts.map(post => this.postRow(post))}
          </div>
      }else{
        return(<h1>Sorry No Posts Found :(</h1>)
      }
    }else{
      return (
        <div>
          <SkeletonBox
            boxWidth={'50%'}
            boxHeight={'40px'}
            rowSpace={'10px'}
            />
          <SkeletonBox rows={3}/>
          <br/>
          <SkeletonBox
            boxWidth={'80%'}
            boxHeight={'40px'}
            rowSpace={'10px'}
            />
          <SkeletonBox
            boxWidth={'100%'}
            boxHeight={'150px'}
            rowSpace={'10px'}
            />
          <br/>
          <SkeletonBox
            boxWidth={'70%'}
            boxHeight={'40px'}
            rowSpace={'10px'}
            />
          <SkeletonBox rows={3}/>
          <br/>
          <SkeletonBox
            boxWidth={'45%'}
            boxHeight={'40px'}
            rowSpace={'10px'}
            />
          <SkeletonBox
            boxWidth={'100%'}
            boxHeight={'150px'}
            rowSpace={'10px'}
            />
          <br/>
          <SkeletonBox
            boxWidth={'65%'}
            boxHeight={'40px'}
            rowSpace={'10px'}
            />
          <SkeletonBox rows={3}/>
        </div>
      )
    }
  }


  prettyTrim(text, n, useWordBoundary ){
    if (text.length <= n) { return text; }
    var subString = text.substr(0, n-1);
    return (useWordBoundary
       ? subString.substr(0, subString.lastIndexOf(' '))
       : subString) + " ...";
  };

  sanitizeInput(htmlString){
    return(
      this.createMarkup(sanitizeHtml(this.prettyTrim(htmlString, 320, true), {
        allowedTags: [''],
        allowedAttributes: {}
      }))
    )
  }

  postRow(post){
    return(
      <Row key={post.id}>
        <Col sm={12}>
          <h3 className='my-4'>
            <Link to={`/blog/${post.slug}`}
            dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
          </h3>
          {/* <div className="postBody"
            dangerouslySetInnerHTML={{__html:post.content.rendered}}/> */}
        </Col>
      </Row>
    )
  }

  // NOT CURRENTLY USED
  // {this.postRowCategories(post)}

  postRowCategories(post){
    if(post && post._embedded && post._embedded['wp:term']){
      return(
        <div className="row">
          <div className="col-12 postCategories">
            {post._embedded['wp:term'][0].map(category => {return <span className="categoryName">{category.name}</span>})}
          </div>
        </div>
      )
    }
  }

  createMarkup(string) {
    return {__html: string};
  }

  render(){
    return this.displayPosts(this.props.posts);
  }
}

function mapStateToProps(state, ownProps){
  return {
    posts: ownProps.posts
  };
}

function mapDispatchToProps(dispatch){
  return{
    postActions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
