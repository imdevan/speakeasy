import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleColContainer from '../components/SingleColContainer';
import Form from '../components/form/Form';
import {connect} from 'react-redux';
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {browserHistory,withRouter} from "react-router-dom"
import * as currentUserActions from '../actions/currentUserActions'

class Login extends Component {
  constructor(props, context){
    super(props, context);

    this.submitCreateUserOrSignIn = this.submitCreateUserOrSignIn.bind(this);
  }
  componentWillReceiveProps(nextProps){
    const {firebase, history} = nextProps;
    const {currentUser} = firebase.auth();

    if(currentUser) {
      history.push('/')
    }
  }

  submitCreateUserOrSignIn(e){
    // create user or sign in
    const {form, firebase, history, current_user_actions} = this.props;
    const {email, password} = form.values;

    current_user_actions.loginOrCreate({email, password});
  }

  render() {
    return (
      <SingleColContainer className='vh-100' rowProps={{className:'vh-100'}}>
        <div className="w-100 h-100 d-flex justify-content-center align-items-center text-center pt-5">
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
                  placeholder: 'Email Address',
                  name: 'email',
                  type: 'email'
                },{
                  placeholder: 'Passord',
                  name: 'password',
                  type: 'password'
                }]
              }]}
              submitButtonClassName='c-btn py-2 px-3 w-100'
              submitLabel='Sign in / Create Account' />
          </div>
        </div>
      </SingleColContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  runOnStartup: state.runOnStartup,
  auth: state.firebase.auth,
  form: state.form['signupform'],
  profile: state.firebase.profile
})

const mapDispatchToProps = (dispatch) => ({
  current_user_actions: bindActionCreators(currentUserActions, dispatch),
})

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Login));
