// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose } from 'redux';
import * as currentUserActions from '../actions/currentUser';
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'

class App extends Component {
  props: {
    children: Children
  };

  componentWillMount(){
    const {firebase, current_user_actions,auth,
      profile, userProfile} = this.props;
      console.log('PROPS',this.props);
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

  componentWillReceiveProps(nextProps){
    let {todos} = nextProps
  }
  render() {
    const {todos} = this.props;

    debugger
    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : todos;

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
  userProfile: state.firebase.userProfile,
  todos: state.firebase.data.todos
})


export default compose(
  firebaseConnect([
    'todos' // { path: '/todos' } // object notation
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(withFirebase(App))
