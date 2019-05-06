import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Slider from '../../components/Slider/Slider'

class Featured extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    fetch('/api/projects')
        .then((res) => res.json())
        .then(json => this.setState({
          projects: json
        }));
  }

  navigate(id) {
    this.props.history.push('/projects/' + id);
  }

  render() {
    return (
      <div class='feature'>
        <Slider controls={false} transition={true} content={this.state.projects} clicked={this.navigate} />
      </div>
    )
  }
}

Featured.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const FeaturedWithRouter = withRouter(Featured);

export default FeaturedWithRouter
