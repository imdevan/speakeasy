import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button'
import SingleColContainer from '../components/SingleColContainer';

class  extends Component {
  state = {  };

  render() {
    return (
      <SingleColContainer>
        <div className="w-100 h-100 d-flex justify-content-center">
          <GoogleButton
            onClick={() => { console.log('button clicked') }}
          />
        </div>
      </SingleColContainer>
    );
  }
}

export default ;
