import React from 'react'
import Transition from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'

import Item from './Item'

class Slider extends React.Component {
  constructor() {
    super()

    this.previousItem = this.previousItem.bind(this)
    this.nextItem = this.nextItem.bind(this)

    this.state = {
      itemIndex: 0,
      timeout: null
    }
  }

  componentDidMount() {
    if (this.props.transition) {
      this.loopItems(this.state.itemIndex)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  loopItems() {
    const { content } = this.props

    let index = this.state.itemIndex

    index++
    if (typeof content[index] === 'undefined') index = 0

    this.setState({
      timeout: setTimeout(() => {
        this.setState({itemIndex: index})

        this.loopItems(this.state.itemIndex)
      }, this.props.slideDuration)
    })
  }

  previousItem() {
    let index = this.state.itemIndex - 1
    if (index < 0) index = this.state.itemIndex

    this.setState({
      itemIndex: index
    })
  }

  nextItem() {
    let index = this.state.itemIndex + 1
    if (index > this.state.items.length) index = 0

    this.setState({
      itemIndex: index
    })
  }

  addControls() {
    return (
      <div>
        <i class="fa fa-chevron-left left" onClick={this.previousItem} />
        <i class="fa fa-chevron-right right" onClick={this.nextItem} />
      </div>
    )
  }

  render() {
    const { content, controls, clicked, className } = this.props,
          index = this.state.itemIndex,
          classes = className || '',
          clickClass = clicked ? ' clickable' : '';

    let addControls = null;

    if (!content.length) {
      return null;
    }

    if (controls) {
      addControls = this.addControls();
    }

    return (
      <div class={classes + clickClass}>
        {controls}
        <Transition transitionName="gallery" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={1000} transitionLeaveTimeout={1100}>
          <Item key={content[index]._id} content={content[index]} clicked={clicked} />
        </Transition>
      </div>
    )
  }
}

Slider.propTypes = {
  slideDuration: PropTypes.number
}

Slider.defaultProps = {
  slideDuration: 5000
}

export default Slider
