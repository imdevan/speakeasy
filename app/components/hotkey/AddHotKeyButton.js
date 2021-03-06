import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-pro-light/faPlus'

import * as popUpActions from '../../actions/popUpActions'

import capitalize from '../../utils/capitalize';

import Icon from '../common/Icon';
import PopUpButton from '../popUps/PopUpButton';

class AddHotKeyButton extends Component {
  state = {  };
  constructor(props, context){
    super(props, context);
    this.state = {
      key: ''
    };

    this.renderHotKey = this.renderHotKey.bind(this)
    this.handleKeyEvent = this.handleKeyEvent.bind(this)
    this.clearState = this.clearState.bind(this)
    this.addHotkey = this.addHotkey.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyEvent);
  }

  renderHotKey(){
    const {key} = this.state;
    let _key = '&nbsp;';
  }

  handleKeyEvent(e) {
    const { self } = this.props;

    if (self && self.show) {
      const { altKey, ctrlKey, shiftKey, metaKey, key } = e;

      let _key = '';

      if (ctrlKey && key.toLowerCase() !== 'control')
      _key += 'Control + '

      if (shiftKey && key.toLowerCase() !== 'shift')
      _key += 'Shift + '

      if (altKey && key.toLowerCase() !== 'alt')
      _key += 'Alt + '

      _key += capitalize(key)

      this.setState({ key: _key });

      e.preventDefault();
      return false
    }
  }

  clearState(){
    this.setState({ key: '' })
  }

  renderHotkeyButton() {
    return(
      <div className='c-btn c-btn-round c-position-bottom-right'>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    )
  }

  addHotkey() {
    const {popup_actions, onAddHotKey} = this.props;
    const {key} = this.state;

    // add hotkey to profile
    popup_actions.hide('add-hotkey')
    onAddHotKey(key)
  }

  render() {
    const { key } = this.state;
    const {self} = this.props;

    return (
      <PopUpButton
        name='add-hotkey'
        onShow={this.clearState}
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
            {key || <span>&nbsp;</span>}
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
  self: state.popUp['add-hotkey'],
});

const mapDispatchToProps = (dispatch) => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHotKeyButton);
