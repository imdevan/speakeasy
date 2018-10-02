// @flow
import React, { Component } from 'react'
import type { Children } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { firebaseConnect , isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import storage from 'electron-json-storage'

import * as currentUserActions from '../actions/currentUserActions'

import Nav from '../components/app/Nav'
import Svg from '../components/common/Svg'
import background from '../assets/svg/background.svg'


class App extends Component {
  props: {
    children: Children
  }

  componentWillMount(){
    const {firebase, current_user_actions,location, history} = this.props


    /**
     * TODO: 
     * Find best place to put user auth, subscription, and app version / updates. 
     * Seperate them as much as possible from everything else
     */
    // Check if user auth state changed
    // firebase.auth().onAuthStateChanged(function(user) {
    //     // User is signed out.
    //     if (!user) {
    //     current_user_actions.logout()
    //   }
    // })
  }

  componentWillReceiveProps(nextProps){
    // const {
    //   current_user_actions,
    //   currentUser,
    //   hotkeys,
    //   history,
    //   firebase,
    //   location,
    //   profile
    // } = nextProps;
    // const authLoggedIn = firebase.auth().currentUser;

    // if(!authLoggedIn && location && location.pathname !== '/login') {
    //   history.push('/login')
    // }

    // if(isLoaded(profile) && !isEmpty(profile) && !profile.hotKeyProfiles) {
    //   // current_user_actions.fill();
    // }

    // if (hotkeys.profiles.length === 0) {
    //   // current_user_actions.fill();
    // }

    // const majorKey = storage.get('majorKey')

    // if(isLoaded(profile) && !isEmpty(profile) && !majorKey) {
    //   // storage.set('majorKey', { profile }, function(error) {
    //   //   if (error) throw error;
    //   // });
    // }
  }

  render() {
    return (
      <div>
        <div className='fixed-top w-100 h-100 c-z--1 c-o-hidden'>
          <Svg src={background} />
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapDisToProps = dispatch => ({
  current_user_actions: bindActionCreators(currentUserActions, dispatch),
})

const mapStateToProps = (state, ownProps)=> ({
  runOnStartup: state.runOnStartup,
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  hotkeys: state.hotkeys,
  currentUser: state.currentUser
})


export default compose(
  firebaseConnect(() => [ 'profile' ]),
  connect(mapStateToProps, mapDisToProps)
)(withRouter(App));
