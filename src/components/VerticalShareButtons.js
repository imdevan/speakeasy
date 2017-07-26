import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Link } from 'react-router';

class VerticalShareButtons extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      content:{}
    };
  }


  displayTwitterLink(content){
    if(content){
      return(
        <a href={"http://twitter.com/share?text=" + content } target="_blank">
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
  displayFacebookLink(content, link){
    if(content){
      return(
        <a href={`https://www.facebook.com/sharer/sharer.php?u=wesvance.com/posts&title= ${content}` } target="_blank">
          <i className="fa fa-facebook"></i>
        </a>
      )
    }else{
      return(
        ""
      )
    }
  }

  displayEmailLink(content){
    if(content){
      return(
        <a href={`mailto:?Subject=${content}` } target="_blank">
          <i className="fa fa-envelope-o"></i>
        </a>
      )
    }else{
      return(
        ""
      )
    }
  }

  render(){
    return(
      <div className="verticalSocialContainer">
        <div className="button">
          {this.displayTwitterLink(this.props.content)}
          {this.displayFacebookLink(this.props.content, this.props.link)}
          {this.displayEmailLink(this.props.content)}
        </div>
      </div>
    );
  }
}
// http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3
function mapStateToProps(state, ownProps){
  return {
    content: ownProps.content,
    link: ownProps.link
  };
}

function mapDispatchToProps(dispatch){
  return{
    // postActions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalShareButtons);

