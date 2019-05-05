import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Transition from 'react-addons-css-transition-group'

import About from '../../view/About/About'
import Featured from '../../view/Featured/Featured'
import Form from '../../view/Project/Form'
import Gallery from '../../view/Gallery/Gallery'
import Navigation from '../../components/Navigation/Navigation'
import Project from '../../view/Project/Project'
import Literature from '../../view/Literature/Literature'
import NoMatch from './NoMatch';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div class="row" id="header">
          <h1>Kirsten Bergman</h1>
          <Navigation />
        </div>

        <div class="grid row" id="content">
          <div class="grid-item grid-12">
            <Switch>
              <Route exact path="/" component={Featured} />
              <Route path="/gallery/:id" component={Project} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/literature/:id" component={Project} />
              <Route path="/literature" component={Literature} />
              <Route path="/about" component={About} />
              <Route path="/edit/:id" component={Form} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
