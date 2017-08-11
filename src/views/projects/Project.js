// NODE MODULES
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sanitizeHtml from 'sanitize-html'; //https://www.npmjs.com/package/sanitize-html
import {Helmet} from "react-helmet";

// Custom modules
import renderMarkup from '../../utils/renderMarkup';
// ACTIONS
import * as projectActions from '../../actions/projectActions';


// VENDOR UI COMPONENTS
import { Link } from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import lightTheme from '../../config/lightTheme.js';

// CUSTOM UI COMPONENTS
import MailingList from '../../components/MailingList';
import VerticalShareButtons from '../../components/VerticalShareButtons';
import HorizontalShareButtons from '../../components/HorizontalShareButtons';
import SkeletonBox from '../../components/SkeletonBox';
import TopNav from '../../components/TopNav';


class Project extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {};
    this.displayMetaInfo = this.displayMetaInfo.bind(this);
  }

  componentWillMount(){
    if(!this.props.project){
      console.log(this.props)
      console.log(this.props.location.pathname.slice(1))
      this.props.projectActions.requestProject(4803);
      // this.props.projectActions.requestAllProjects();
    }
    // debugger
    // this.props.projectActions.requestProject(this.props.routeParams.projectSlug);
  }

  componentWillUnmount(){
    this.props.projectActions.removeProject();
  }

  displaySelectionShare(selection){
    if(selection.popup.open && selection.text){
      return(
        <div className="selectionSharePopUp">
          <HorizontalShareButtons content={`${selection.text} #WesAdvance #BC&D`} top={selection.popup.top} right={50}/>
        </div>
      )
    }
  }

  displayMetaInfo(){
    if(this.props.project){
      let thisUrl = 'https://www.wesvane.com' + this.props.location.pathname
      let embedUrl = ''
      if(this.props.project._embedded){
        if(this.props.project._embedded['wp:featuredmedia']){
          embedUrl = this.props.project._embedded['wp:featuredmedia'][0].link;
        }
      }
      return(
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.props.project.title.rendered}</title>
          <meta name="description" content={this.props.project.title.render} />

          <link rel="canonical" href="http://wesvance.com/" />

          <meta property="og:title" content={this.props.project.title.rendered} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={thisUrl} />
          <meta property="og:image" content={embedUrl} />
          <meta property="og:description" content={sanitizeHtml(this.props.project.excerpt.rendered, {
              allowedTags: [''],
              allowedAttributes: {}
            }).substring(0,250)}
          />

          <meta name="twitter:card" value={sanitizeHtml(this.props.project.excerpt.rendered, {
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
    const {project} = this.props;

    return <Grid>
      <TopNav/>
      <Row className='py-5 my-5'>
        <Col sm={12}>
          <h1 
            className='display-1'
            dangerouslySetInnerHTML={renderMarkup(project.title.rendered)}/>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div 
            dangerouslySetInnerHTML={renderMarkup(project.title.rendered)}/>
        </Col>
      </Row>
    </Grid>
  }
}
// http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3
function mapStateToProps(state, ownProps){
  // IF YOU HAVE THE POSTS IN THE STATE USE IT, OTHERWISE USE THE CURRENTPOST LOADED FROM A NEW API CALL IN COMPONENTWILLMOUNT
  if(state.projects && state.projects.allProjects){
    return({
      project: state.projects.allProjects.filter(project => {return project.slug === ownProps.match.params.projectSlug})[0]
    })
  }else{
    return({
      project: state.projects.currentProject
    })
  }
}

function mapDispatchToProps(dispatch){
  return{
    projectActions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
