import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profileActions'
import ProfileTag from './ProfileTag';

import {connect} from 'react-redux'
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class ProfileSwitcher extends Component {
  constructor(props, context){
    super(props, context);
    const profiles = [0, 1, 2, 3, 4].map(i => ({id: i, label: `Profile ${i+1}`}));

    this.state = {profiles}
    this.switchProfile = this.switchProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  switchProfile(id){
    const {firebase} = this.props;

    firebase.updateProfile({ activeProfile: id });
  }

  renderProfile(_profile, i) {
    const {firebase, profile} = this.props;
    const active = _profile.id === profile.activeProfile;

    return  <ProfileTag key={i} active={active} {..._profile} onClick={this.switchProfile.bind(null, i)}/>
  }

  render() {
    const {firebase, profile, className=''} = this.props;

    if(isLoaded(profile) && isEmpty(profile))
      return null

    return (
      <div className={`d-flex w-100 justify-content-between ${className}`}>
        {this.state.profiles.map(this.renderProfile)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeProfile: state.profile.activeProfile,
  profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
  profile_actions: bindActionCreators(profileActions, dispatch)
})

export default compose(
  firebaseConnect ([
    'profile'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSwitcher)
