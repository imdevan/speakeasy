import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as popUpActions from '../../actions/popUpActions'

import ClickOutsideContainer from '../utility/ClickOutsideContainer';
import SCC from '../layout/SingleColContainer';

class PopUp extends Component {
  constructor(props, context) {
    super(props, context);

    this.clickOutside = this.clickOutside.bind(this)
  }

  clickOutside() {
    const { onClickOutside, overRideClickOutside, popup_actions, name } = this.props;

    if (!overRideClickOutside) {
      popup_actions.hide(name);
    }

    if (onClickOutside) {
      onClickOutside();
    }
  }

  componentWillMount() {
    const { name, self, popup_actions, onShow, onHide } = this.props;

    if (!self) {
      popup_actions.create(name, onShow, onHide);
    }
  }

  componentWillUnmount() {
    const { name, popup_actions } = this.props;

    popup_actions.destroy(name);
  }

  render() {
    const { children, onClickOutside, popUpBodyClass, popUpContainerClass, self } = this.props;

    if (!self || !self.show)
      return null

    return (
      <div className={`${popUpContainerClass}`}>
        <SCC
          className='h-100'
          rowProps={{className: 'justify-content-center align-items-center h-100'}}
          colProps={{md: 8}}>
          <ClickOutsideContainer className={`${popUpBodyClass}`}
            onClickOutside={this.clickOutside}>
            {children}
          </ClickOutsideContainer>
        </SCC>
      </div>
    );
  }
}

PopUp.propTypes = {
  name: PropTypes.string.isRequired
};

PopUp.defaultProps = {
  popUpBodyClass: 'c-pop-up__body',
  popUpContainerClass: 'c-pop-up__container',
  overRideClickOutside: false,
  onShow: () => {},
  onHide: () => {},
};

const mapStateToProps = (state, ownProps) => ({
  self: state.popUp[ownProps.name],
});

const mapDispatchToProps = (dispatch) => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
