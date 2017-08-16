// NODE MODULES
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sanitizeHtml from 'sanitize-html'; //https://www.npmjs.com/package/sanitize-html
import {Helmet} from "react-helmet";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Custom modules
import renderMarkup from '../../utils/renderMarkup';
import Footer from '../../components/Footer';

// ACTIONS
import * as postActions from '../../actions/postActions';

// VENDOR UI COMPONENTS
import {Grid, Row, Col} from 'react-bootstrap';



class Project extends React.Component{
  constructor(props, context){
    super(props, context);
    this.displayMetaInfo = this.displayMetaInfo.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  componentWillMount(){
    if(!this.props.post){
      this.props.postActions.requestPost(4803);
      // this.props.postActions.requestAllPosts();
    }
    // this.props.postActions.requestPost(this.props.routeParams.projectSlug);
  }

  componentWillUnmount(){
    this.props.postActions.removePost();
  }


  displayMetaInfo(){
    if(this.props.post){
      let thisUrl = 'https://www.wesvane.com' + this.props.location.pathname
      let embedUrl = ''
      if(this.props.post._embedded){
        if(this.props.post._embedded['wp:featuredmedia']){
          embedUrl = this.props.post._embedded['wp:featuredmedia'][0].link;
        }
      }
      return(
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.props.post.title.rendered}</title>
          <meta name="description" content={this.props.post.title.render} />

          <link rel="canonical" href="http://wesvance.com/" />

          <meta property="og:title" content={this.props.post.title.rendered} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={thisUrl} />
          <meta property="og:image" content={embedUrl} />
          <meta property="og:description" content={sanitizeHtml(this.props.post.excerpt.rendered, {
              allowedTags: [''],
              allowedAttributes: {}
            }).substring(0,250)}
          />

          <meta name="twitter:card" value={sanitizeHtml(this.props.post.excerpt.rendered, {
              allowedTags: [''],
              allowedAttributes: {}
            }).substring(0,250)}
          />
        </Helmet>
      )
    }
  }

  // {this.displaySelectionShare(this.state.selection)}
  render(){
    const {post} = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName='fade-in-from-right'
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionLeaveTimeout={300}
        transitionEnter={false}>
        <Grid>
        <Row className='py-5 my-5'>
          <Col sm={12}>
            <h1 
              className='display-1'
              dangerouslySetInnerHTML={renderMarkup(post.title.rendered)}/>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div 
              dangerouslySetInnerHTML={renderMarkup(post.content.rendered)}/>
          </Col>
        </Row>
      </Grid>
      <Footer />
    </ReactCSSTransitionGroup>
  )}
}

// http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3
function mapStateToProps(state, ownProps){
  // IF YOU HAVE THE POSTS IN THE STATE USE IT, OTHERWISE USE THE CURRENTPOST LOADED FROM A NEW API CALL IN COMPONENTWILLMOUNT
  if(state.posts && state.posts.allPosts){
    return({
      post: state.posts.allPosts.filter(post => {return post.slug === ownProps.match.params.projectSlug})[0]
    })
  }else{
    return({
      post: state.posts.currentPost
    })
  }
}

function mapDispatchToProps(dispatch){
  return{
    postActions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
