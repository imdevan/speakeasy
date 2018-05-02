// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import PopUp from './PopUp';
import PropTypes from 'prop-types';


class SetKeyPopUp extends Component {
  constructor(props, context){
    super(props, context);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    value: ''
  };

  handleKeyDown(e) {
    const {onChange} = this.props;
    onChange(e.key);
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const {value, show} = this.props;

    return (
      <PopUp>
        <div className='p-4'>
          <h3 className='mb-3'>
            Press any key
          </h3>
          <div className='c-bg-gray-1 c-br p-3 text-center'>
            <h1 className='m-0 p-0'>
              {value}
            </h1>
          </div>
        </div>
      </PopUp>
    );
  }
}

export default SetKeyPopUp;
