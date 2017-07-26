import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Link } from 'react-router';

class HorizontalSocialButtons extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      link:{}
    };
  }


  displayTwitterLink(link){
    if(link){
      return(
        <a href={link} target="_blank">
          <i className="fa fa-twitter"></i>
        </a>
      )
    }else{
      return(
        ""
      )
    }
  }
  // https://www.facebook.com/sharer/sharer.php?u=google.com&picture=&title=TestTitleHere&caption=&quote=&description=TestDescription
  displayFacebookLink(link){
    if(link){
      return(
        <a href={link} target="_blank">
          <i className="fa fa-facebook"></i>
        </a>
      )
    }else{
      return(
        ""
      )
    }
  }

  displayEmailLink(link){
    if(link){
      return(
        <a href={link} target="_blank">
          <i className="fa fa-envelope-o"></i>
        </a>
      )
    }else{
      return(
        ""
      )
    }
  }

  displayGithubLink(link){
    if(link){
      return(
        <a href={link} target="_blank">
          <i className="fa fa-github"></i>
        </a>
      )
    }
  }

  render(){
    const {className} = this.props;
    return(
      <div className={`${className} flex justify-content-center`}>
        {this.displayTwitterLink(this.props.twitterLink)}
        {this.displayFacebookLink(this.props.facebookLink)}
        {this.displayGithubLink(this.props.githubLink)}
        {this.displayEmailLink(this.props.emailLink)}
      </div>
    );
  }
}
// http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3
function mapStateToProps(state, ownProps){
  return {
    twitterLink: ownProps.twitterLink,
    facebookLink: ownProps.facebookLink,
    emailLink: ownProps.emailLink,
    githubLink: ownProps.githubLink
  };
}

function mapDispatchToProps(dispatch){
  return{
    // postActions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalSocialButtons);
