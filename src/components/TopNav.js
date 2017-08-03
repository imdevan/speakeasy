import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Svg from './Svg';
import menuIcon from '../assets/images/menu.svg'
import closeIcon from '../assets/images/close.svg'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  onClose = () => this.setState({open: false});
  onOpen = () => this.setState({open: true});

  render() {
  const {className} = this.props;
  const {open} = this.state;
  const links = [
    {
      to: '/',
      label: 'Home'
    },{
      to: '/blog',
      label: 'Blog'
    },{
      to: '/about',
      label: 'About'
    },{
      to: '/referals',
      label: 'Referals'
    },{
      to: '/webinars',
      label: 'Webinars'
    },{
      to: '/Community',
      label: 'Community'
    }
  ];

  const Icon = open ? (
    <div
      onClick={this.onClose}
      className='c-top-nav-menu-icon p-3'>
      <Svg
        src={closeIcon}
        size={24} />
    </div>
    ) : (
      <div
        onClick={this.onOpen}
        className='c-top-nav-menu-icon p-3'>
        <Svg
          src={menuIcon}
          size={24} />
    </div>
    );

  return (
    <div className='c-top-nav-container'>
      <div className='py-4' />
      <div className='w-100 fixed-top'>
        <Grid>
          <Row className='pt-4'>
            <Col sm={12}>
                {Icon}
            </Col>
          </Row>
        </Grid>
      </div>
      {this.state.open && (
        <div className='c-top-nav-drawer py-5'>
          <div className='c-top-nav-menu py-5 my-5'
            data-open={this.state.open}>
            {links.map((link, i) => <Link
              key={i} to={link.to}
              onClick={this.onClose}
              className='c-top-nav-menu-item'>
              <h1>
                {link.label}
              </h1>
            </Link>
          )}
        </div>
      </div>
      )}
    </div>

    );
  }
}
