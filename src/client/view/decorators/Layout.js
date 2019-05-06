import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import Transition from 'react-addons-css-transition-group'

import About from '../About/About'
import Featured from '../Featured/Featured'
import Form from '../Project/Form'
import Projects from '../Projects/Projects'
import ProjectsCreate from '../Projects/Create';
import Navigation from '../../components/Navigation/Navigation'
import Project from '../Project/Project'
import Literature from '../Literature/Literature'
import NoMatch from './NoMatch';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      offsetTop: null,
      resize: null
    }
  }

  componentDidMount() {
    const fn = () => this.refs.content.style.height = `calc(100vh - ${this.refs.content.getBoundingClientRect().top}px)`;

    fn();
    window.addEventListener('resize', fn);

    this.setState({
      resize: fn
    })
  }

  componentWillUnmount() {
    window.removeEventListener(this.state.resize);
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>Kirsten Bergman</h1>
          <Navigation />
        </div>

        <div id="content" ref="content">
          <Switch>
            <Route exact path="/" component={Featured} />
            <Route path="/projects/create" component={ProjectsCreate} />
            <Route path="/projects/:id" component={Project} />
            <Route path="/projects" component={Projects} />
            <Route path="/literature/:id" component={Project} />
            <Route path="/literature" component={Literature} />
            <Route path="/about" component={About} />
            <Route path="/edit/:id" component={Form} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Layout
