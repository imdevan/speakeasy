import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as profileActions from '../actions/profile'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ProfileSwitcher extends Component {
  constructor(props, context){
    super(props, context);
    const profiles = [1, 2, 3, 4, 5].map(i => ({id: i, label: `Profile ${i}`}));

    this.state = {profiles}
    this.renderProfile = this.renderProfile.bind(this);
  }

  renderProfile(profile, i) {
    const active = profile.id === this.props.activeProfile;
    const  _className = `c-tag ${active ? 'c-tag-active' : ''}`;

    return (
      <div key={i} className={_className}>
        {profile.label}
      </div>
    )
  }

  render() {
    return (
      <div className='d-flex w-100 justify-content-between'>
        {this.state.profiles.map(this.renderProfile)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeProfile: state.profile.activeProfile
});

const mapDispatchToProps = (dispatch) => ({
  profile_actions: bindActionCreators(profileActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSwitcher);
