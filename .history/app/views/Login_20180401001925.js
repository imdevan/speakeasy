import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleColContainer from '../components/SingleColContainer';
import Form from '../components/common/form/Form';
import {connect} from 'react-redux';
import { withFirebase } from 'react-redux-firebase'

class Login extends Component {
  constructor(props, context){
    super(props, context);
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
        <div className="w-100 h-100 d-flex justify-content-center align-items-center text-center">
          <div>
            <h3 className='mb-3'>
              Welcome to MajorKey
            </h3>
            <h5 className='mb-5'>
              Sign in to get started
            </h5>
              <Form
                onSubmit
                fields={[{
                  placeholder: 'rockstar@keymapper.com',
                  label: 'Email Address',
                  name: 'email'
                }]}
                submitLabel='Sign in / Create Account' />
          </div>
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
