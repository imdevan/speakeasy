import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkTheme from '../config/darkTheme.js';

export default class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkTheme)} >
        <div>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}

        >
          <div className='py-5 my-5'>

          <Link to={'/'} className='my-5 c-no-underline'>
            <MenuItem onTouchTap={this.handleClose}
              className='flex align-center'>
              <span>
                Home
              </span>
            </MenuItem>
          </Link>
          <Link to={'/blog'} className='my-5 c-no-underline'>
            <MenuItem onTouchTap={this.handleClose}
              className='flex align-center'>
              <span>
                Blog
              </span>
            </MenuItem>
          </Link>
          <Link to={'/about'} className='my-5 c-no-underline'>
            <MenuItem onTouchTap={this.handleClose}
              className='flex align-center'>
              <span>
                About
              </span>
            </MenuItem>
          </Link>
        </div>
        </Drawer>
      </div>
    </MuiThemeProvider>
    );
  }
}
