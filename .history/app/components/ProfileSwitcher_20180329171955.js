import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as profileActions from '../actions/profile'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ProfileSwitcher extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      profiles: [1, 2, 3, 4, 5].map(i => ({id: i}))
    }
  }

  renderProfile(profile, i) {
    return (
      <div>

      </div>
    )
  }
  render() {
    return (
      <div className='d-flex'>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
