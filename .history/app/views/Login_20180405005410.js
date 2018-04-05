import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleColContainer from '../components/SingleColContainer';
import Form from '../components/common/form/Form';
import {connect} from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import {browserHistory,withRouter} from "react-router-dom"

class Login extends Component {
  constructor(props, context){
    super(props, context);
    this.submitCreateUserOrSignIn = this.submitCreateUserOrSignIn.bind(this);
  }
  componentWillReceiveProps(nextProps){
    const {currentUser, history} = nextProps;

    debugger
    if(!currentUser || !currentUser.signedIn) {
      history.push('/login')
    }
  }
  submitCreateUserOrSignIn(e){
    // create user or sign in
    const {form, firebase} = this.props;
    const {email, password} = form.values;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({...pargs}) => {
      console.log('RETURNED FROM FIREBASE', pargs);

      history.push('/')
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
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
              onSubmit={this.submitCreateUserOrSignIn}
              form='signupform'
              name='signupform'
              sections={[{
                fields: [{
                  placeholder: 'rockstar@keymapper.com',
                  label: 'Email Address',
                  name: 'email',
                  type: 'email'
                },{
                  placeholder: 'passord',
                  name: 'password',
                  type: 'password'
                }]
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
    currentUser: state.currentUser,
    runOnStartup: state.runOnStartup,
    auth: state.firebase.auth,
    form: state.form['signupform'],
    profile: state.firebase.profile
  };
}

export default connect(mapStateToProps)(withFirebase(withRouter(Login)));
