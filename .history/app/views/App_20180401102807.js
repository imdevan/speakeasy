// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as currentUserActions from '../actions/currentUser';
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'

class App extends Component {
  props: {
    children: Children
  };

  componentWillMount(){
    const {firebase, current_user_actions} = this.props;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        debugger
        console.log('RETURNED FROM FIREBASE', user);
        current_user_actions.userSignedIn(user);
      } else {
        // User is signed out.
        debugger
        current_user_actions.userSignedOut();
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  current_user_actions: bindActionCreators(currentUserActions, dispatch),
})

const mapStateToProps = (state, ownProps)=> ({
  runOnStartup: state.runOnStartup,
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(App));
