import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux'
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as popUpActions from '../../actions/popUpActions'

import {Row} from 'react-bootstrap';
import Col from '../layout/Col';
import Icon from '../common/Icon';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKeyboard from '@fortawesome/fontawesome-pro-light/faKeyboard'
import faUserAstronaut from '@fortawesome/fontawesome-pro-light/faUserAstronaut'

import HotKey from './HotKeyButton';
import HotkeyAction from './HotkeyAction';
import { debug } from 'builder-util';

const getItemStyle = (isDragging, draggableStyle, isTop) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  paddingTop: 16,
  // styles we need to apply on draggables
  ...draggableStyle,
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class HotKeyTable extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      items: this.props.hotkeyOptions
    }

    this.onDragEnd = this.onDragEnd.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyState = this.renderEmptyState.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  renderEmptyState(){
    return (
      <Row className='align-items-center my-md-5 py-md-5 mx-md-5 px-md-5 mb-md-3'>
        <Col sm={3} className='mb-4 mb-md-0'>
          <h1 className='display-1 text-center'>
            <FontAwesomeIcon icon={faUserAstronaut} />
          </h1>
        </Col>
        <Col sm={12} md={9}>
          <h2>
            Looks like you don't have any hotkeys added,
            hit the plus button to add one now
          </h2>
        </Col>
      </Row>
    )
  }

  renderRow(item, i){
    const {hotkeyOptions} = this.props

    return (
      <Draggable key={item.hotKey + i} draggableId={item.hotKey + i} index={i}>
        {(dp, ds) => (
          <div
            ref={dp.innerRef}
            {...dp.draggableProps}
            {...dp.dragHandleProps}
            style={getItemStyle(
              ds.isDragging,
              dp.draggableProps.style,
              i === 0
            )}>
            <Row >
              <Col>
                <HotKey value={item.hotKey} index={i} className={`${ds.isDragging ? 'c-drop-shadow' : ''}`} />
              </Col>
              <Col>
                <HotkeyAction hotkey={item} className={`${ds.isDragging ? 'c-drop-shadow' : ''}`} />
              </Col>
            </Row>
          </div>
        )}
      </Draggable>
    )
  }

  // TODO: split things out into separate components.
  render() {
    const {hotkeyOptions} = this.props
    const {items} = this.state;

    if(!hotkeyOptions)
      return this.renderEmptyState()

    return (
      <div>
        <Row>
          <Col sm={6} className='col'>
            <h5>Key</h5>
          </Col>
          <Col sm={6} className='col'>
            <h5>Action</h5>
          </Col>
        </Row>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(dropP, dropS) => (
              <div
                ref={dropP.innerRef}
                className={`${dropS.isDraggingOver ? '' : ''}`} >
                {items.map(this.renderRow)}
                {dropP.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mdp = dispatch => ({
  popup_actions: bindActionCreators(popUpActions, dispatch),
})

export default connect(null, mdp)(HotKeyTable)
