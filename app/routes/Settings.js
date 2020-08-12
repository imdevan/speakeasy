import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SCC from '../components/layout/SingleColContainer';
import Form from '../components/form/Form';
import { compose } from 'redux'
import {connect} from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import {browserHistory,withRouter, Link} from "react-router-dom"
import { loadFromElectronState } from '../store/localStorage';

class Settings extends Component {
  updateUserSettings = (formValues) => {
    const {form, firebase, currentUser} = this.props;
    firebase.updateProfile(formValues);
  }

  logOut = () => {
    const {firebase} = this.props;
    firebase.logout();
  }

  logLocalStore = () => {
    loadFromElectronState().then(localStore => {
      if(localStore)
        console.log('localStore', localStore);
      else
        console.log('localStore NOT FOUND', localStore);
    }).catch(err => console.log('localStore NOT FOUND', err))
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
      <SCC>
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
              submitButtonClassName='c-btn c-btn-cta'
              submitLabel='Update User Settings' />
        </div>
        <div>
          <button className='c-link a' onClick={this.logLocalStore}>
            Log local store
          </button>
        </div>
        <div>
          <Link to='login' onClick={this.logOut}>
              Logout
          </Link>
        </div>
      </SCC>
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
