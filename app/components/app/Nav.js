import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {Grid, Row} from 'react-bootstrap';
import Col from '../layout/Col'
import {bindActionCreators, compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class Nav extends Component {
  constructor(props, context){
    super(props, context);
    this.renderNavLinks = this.renderNavLinks.bind(this);
    this.state = {}
  }
  generateNavLink(location, profile) {
    const link = location.pathname && location.pathname === '/settings' ? (
      <Link to='/' className='c-link'>
        Home
      </Link>
    ) : (
      <Link to='/settings' className='c-link'>
        Hi, {profile.displayName}
      </Link>
    );

    this.setState({link})
  }
  componentWillReceiveProps(nextProps){
    this.generateNavLink(nextProps.location, nextProps.profile)
  }
  renderNavLinks(){
    const {link} = this.state;

    return (
      <Row>
        <Col>
          {link && link}
        </Col>
      </Row>
    )
  }

  render(){
    const {profile} = this.props;

    if(!isLoaded(profile) || (isLoaded(profile) && isEmpty(profile)))
      return null

    return (
      <div>
        <Grid>
          <Row>
            <Col className='py-4 text-right'>
              {this.renderNavLinks()}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: state.firebase.profile
});

export default compose(
  firebaseConnect ([
    'profile'
  ]),
  connect(mapStateToProps, null)
)(withRouter(Nav))
