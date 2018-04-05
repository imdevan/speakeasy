import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button'
import SingleColContainer from '../components/SingleColContainer';

class Login extends Component {
  render() {
    return (
      <SingleColContainer className='h-100' rowProps={{className:'h-100'}}>
        <div className="w-100 h-100 d-flex justify-content-center">
          <GoogleButton
            onClick={() => { console.log('button clicked') }}
          />
        </div>
      </SingleColContainer>
    );
  }
}

export default Login;
