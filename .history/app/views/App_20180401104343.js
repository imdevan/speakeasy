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
    const {firebase, current_user_actions,auth,
      profile} = this.props;

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
    const {todos} = this.props;
    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : todos
    console.log('APP TODOS: \n', todosList);

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
  profile: state.firebase.profile,
  todos: state.firebase.todos
})

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(App));
