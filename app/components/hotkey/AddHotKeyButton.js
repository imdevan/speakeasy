import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import PopUpButton from '../popUps/PopUpButton';

import { app, BrowserWindow, globalShortcut } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as popUpActions from '../../actions/popUpActions'
import KeyHandler, { KEYPRESS } from 'react-key-handler';

class AddHotKeyButton extends Component {
  state = {  };
  constructor(props, context){
    super(props, context);
    this.state = {
      key: ''
    };

    this.renderHotKey = this.renderHotKey.bind(this)
    this.handleKeyEvent = this.handleKeyEvent.bind(this)
    this.addHotkey = this.addHotkey.bind(this)
  }

  renderHotKey(){
    const {key} = this.state;
    let _key = '';

  }

  handleKeyEvent(e) {
    e.preventDefault();
    const { altKey, ctrlKey, shiftKey, metaKey, key } = e;

    this.setState({ key });
  }


  renderHotkeyButton() {
    return(
      <div className='c-btn c-btn-round c-position-bottom-right'>
        <Icon icon='plus' />
      </div>
    )
  }

  addHotkey() {
    const {popup_actions} = this.props;

    // add hotkey to profile
    popup_actions.hide('add-hotkey')
  }

  render() {
    const { key } = this.state;

    return (
      <PopUpButton
        name='add-hotkey'
        button={this.renderHotkeyButton()}>
        <input
          className='text-center position-abosolute'
          type='text'
          style={{opacity: 0}}
          name='doesntmatter'
          onKeyPress={this.handleKeyEvent} autoFocus/>

        <div className='px-4 py-3'>
          <h3 className='mb-4 text-center'>
            Press any key...
          </h3>
          <div className='c-hotkey mb-4 text-center h4'>
            {key}
          </div>
          <div className=''>
            <button className='c-btn c-btn-cta' onClick={this.addHotkey}>
              Add hotkey
            </button>
          </div>
        </div>
      </PopUpButton>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  self: state.popUp[ownProps.name],
});

const mapDispatchToProps = (dispatch) => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHotKeyButton);