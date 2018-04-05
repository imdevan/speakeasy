import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button'
import SingleColContainer from '../components/SingleColContainer';
import {connect} from 'react-redux';
import { withFirebase } from 'react-redux-firebase'

class Login extends Component {

  constructor({...args}){
    super(...args);
    this.login = this.login.bind(this);
  }
  login(){
    const {profile, firebase} = this.props;
    if(profile.isEmpty){
      firebase.login({
        provider: 'google',
        type: 'popup'
      });
    }
  }
  render() {
    return (
      <SingleColContainer className='vh-100' rowProps={{className:'vh-100'}}>
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <GoogleButton
            onClick={this.login}
          />
        </div>
      </SingleColContainer>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    hotkey: state.hotkey,
    runOnStartup: state.runOnStartup,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
}

export default connect(mapStateToProps)(withFirebase(Login));
