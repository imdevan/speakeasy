import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import {Helmet} from "react-helmet"
// =======
// ROUTES
// =======
import TopNav from './components/TopNav';

import Home from './views/home/Home'
import Blog from './views/blog/Blog'
import Post from './views/blog/post/Post'
import Project from './views/projects/Project'
import About from './views/about/About'
import Referrals from './views/referrals/Referrals'
import Error404 from './views/error/404'
// Meta data
import project from './config/project'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  render(){
    return (
      <div id="contentWrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.title}</title>
        </Helmet>
        <TopNav className='fixed-top'/>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/referrals" component={Referrals} />
          <Route path="/about" component={About} />
          <Route path='/blog/:postSlug' component={Post} />
          <Route path="/blog" component={Blog} />
          <Route path='/projects/:projectSlug' component={Project} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}
