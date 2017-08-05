import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import {Helmet} from "react-helmet"
// =======
// ROUTES
// =======
import Home from './views/home/Home'
import Blog from './views/blog/Blog'
import Page from './views/page/Page'
import Post from './views/blog/post/Post'
import About from './views/about/About'
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path='/blog/:postSlug' component={Post} />
          <Route path="/blog" component={Blog} />
          <Route path="/referrals" component={Page} pageUrl={'referrals'}/>
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}
