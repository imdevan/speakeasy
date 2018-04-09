import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleColContainer from '../components/SingleColContainer';
import Form from '../components/form/Form';
import { compose } from 'redux'
import {connect} from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import {browserHistory,withRouter, Link} from "react-router-dom"

class Settings extends Component {
  constructor(props, context){
    super(props, context);

    this.updateUserSettings = this.updateUserSettings.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  updateUserSettings(formValues){
    const {form, firebase, currentUser} = this.props;
    firebase.updateProfile(formValues);
  }

  logOut(){
    const {firebase} = this.props;
    firebase.logout();
  }

  render() {
    const {currentUser, profile} = this.props;

    if(!isLoaded(profile) || isEmpty(profile)) {
      return null
    }
    const initialValues = {
      displayName: profile.displayName,
      email: profile.email
    };

    return (
      <SingleColContainer>
        <div className='py-4 text-right'>
          <Link to='/' className='c-link'>
            Home
          </Link>
        </div>
        <div className="mb-3">
            <h3 className='mb-3'>
              Settings
            </h3>
            <Form
              onSubmit={this.updateUserSettings}
              form='updateProfileForm'
              initialValues={initialValues}
              sections={[{
                fields: [{
                  label: 'Name',
                  name: 'displayName',
                  type: 'text'
                },{
                  label: 'Email',
                  name:'email',
                  type: 'email'
                }]
              }]}
              submitButtonClassName='c-btn py-2 px-3 w-100'
              submitLabel='Update User Settings' />
        </div>
        <div>
          <Link to='login' onClick={this.logOut}>
              Logout
          </Link>
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

export default compose(
  firebaseConnect(() => [
    'profile'
  ]),
  connect(mapStateToProps)
)(Settings);
