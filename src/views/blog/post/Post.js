// NODE MODULES
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sanitizeHtml from 'sanitize-html'; //https://www.npmjs.com/package/sanitize-html
import {Helmet} from "react-helmet";

// ACTIONS
import * as postActions from '../../../actions/postActions';

// VENDOR UI COMPONENTS
import {Grid, Row, Col} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDisqusThread from 'react-disqus-thread';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../../config/lightTheme.js';
import Footer from '../../../components/Footer';

class PostPage extends React.Component{
  constructor(props, context){
    super(props, context);

    this.displayBody = this.displayBody.bind(this);
    this.displayMetaInfo = this.displayMetaInfo.bind(this);
  }

  componentWillMount(){
    if(!this.props.post){
      this.props.postActions.requestPost(this.props.match.params.postSlug);
      // this.props.postActions.requestAllPosts();
    }
    // debugger
    // this.props.postActions.requestPost(this.props.routeParams.postSlug);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillUnmount(){
    this.props.postActions.removePost();
  }

  displayTitle(post){
    return <h1
      className='display-1'
      dangerouslySetInnerHTML={this.createMarkup(post.title.rendered)} />
  }

  displayBody(post){
    return <div
            className="w-100 c-article-body"
            onMouseUp={this.onHighlight}
            dangerouslySetInnerHTML={this.createMarkup(post.content.rendered)}/>
  }

  createMarkup(string) {
    return {__html: string};
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

          <link rel="canonical" href="http://bisonstudio.co/" />

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
  render(){
    const {post, location} = this.props;
    console.log(location)
    console.log(post)
    console.log(window.location)
    // debugger
    if(!post) return null
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
                  {this.displayTitle(post)}
                </Col>
              </Row>
              <Row className='mb-5'>
                <Col sm={12}>
                  {this.displayBody(post)}
                </Col>
              </Row>
              <Row className='my-5'>
                <Col sm={12}  className='py-5'>
                <ReactDisqusThread
                  shortname={'bison-studio'}
                  title={post.slug}
                  identifier={`${post.slug}-${post.id}`}
                  url={window.location.href}/>
                </Col>
              </Row>
            </Grid>
            <Footer />
          </ReactCSSTransitionGroup>
        </div>
      </MuiThemeProvider>
    );
  }
}
// http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3
function mapStateToProps(state, ownProps) {
  // IF YOU HAVE THE POSTS IN THE STATE USE IT, OTHERWISE USE THE CURRENTPOST LOADED FROM A NEW API CALL IN COMPONENTWILLMOUNT
  if(state.posts && state.posts.allPosts) {
    return({
      post: state.posts.allPosts.filter(post => {return post.slug === ownProps.match.params.postSlug})[0]
    })
  } else {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
