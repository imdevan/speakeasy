import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// import ReactSpinner from './common/ReactSpinner';
import ScrollToTop from './ScrollToTop';

import {Helmet} from "react-helmet";
// =======
// ROUTES
// =======
import WelcomePage from './welcome/WelcomePage';
import BlogPage from './blog/BlogPage';
import PostPage from './blog/post/PostPage';
import AboutPage from './about/AboutPage';
import Error404Page from './error/Error404Page';

export default class App extends Component {
  render(){
    return (
      <div id="contentWrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>React Starter + Wordpress</title>
        </Helmet>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path='/blog/:postSlug' component={PostPage} />
          <Route path="/blog" component={BlogPage} />
          <Route component={Error404Page} />
        </Switch>
      </div>
    )
  }
}
