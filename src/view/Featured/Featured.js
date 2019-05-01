import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectStore from '../../app/stores/ProjectStore'
import Slider from '../../components/Slider/Slider'

class Featured extends React.Component {
  constructor() {
    super()
    this.navigate = this.navigate.bind(this)
  }

  navigate(id) {
    this.props.history.push('/gallery/' + id)
  }

  render() {
    return (
      <div class="gallery">
        <Slider className="gallery-item" controls={false} transition={true} content={ProjectStore.getAll()} clicked={this.navigate} />
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
