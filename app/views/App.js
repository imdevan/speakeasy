// @flow
import React, { Component } from 'react'
import type { Children } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose } from 'redux'
import * as currentUserActions from '../actions/currentUserActions'
import { firebaseConnect , isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import Nav from '../components/app/Nav'
import { withRouter } from 'react-router-dom';

class App extends Component {
  props: {
    children: Children
  }

  componentWillMount(){
    const {firebase, current_user_actions,location, history} = this.props

    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        // User is signed out.
        current_user_actions.logout()

        if(location && location.pathname !== '/login'){
          history.push('/login')
        }
      }
    })
  }

  componentWillReceiveProps(nextProps){
    const {history, firebase, location, profile, current_user_actions, currentUser} = nextProps;
    const authLoggedIn = firebase.auth().currentUser;

    if(!authLoggedIn && location && location.pathname !== '/login') {
      history.push('/login')
    }

    if(isLoaded(profile) && !isEmpty(profile) && !profile.hotKeyProfiles) {
      debugger
      current_user_actions.fill();
    }
  }

  render() {
    const {firebase} = this.props

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  current_user_actions: bindActionCreators(currentUserActions, dispatch),
})

const mapStateToProps = (state, ownProps)=> ({
  runOnStartup: state.runOnStartup,
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  currentUser: state.currentUser
})


export default compose(
  firebaseConnect(() => [
    'profile'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
