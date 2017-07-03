import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// import '../assets/styles/components/App.scss';

// import ReactSpinner from './common/ReactSpinner';
import NavBar from './common/NavBar';
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
          <title>WesVance: Business, Code & Design for Creative Entreprnuers</title>
          <link rel="canonical" href="http://wesvance.com/" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path='/posts/:postSlug' component={PostPage} />
          <Route path="/posts" component={BlogPage} />
          <Route component={Error404Page} />
        </Switch>
      </div>
    )
  }
}
