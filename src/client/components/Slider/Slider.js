import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'

import Item from './Item'

class Slider extends React.Component {
  constructor() {
    super();

    this.previousItem = this.previousItem.bind(this);
    this.nextItem = this.nextItem.bind(this);

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
      <ul class="slider-controls">
        { this.props.content.map((item, index) => (
          <li key={item.id} onClick={() => this.setState({itemIndex: index})} />
        )) }
      </ul>
    )
  }

  render() {
    const { content, clicked } = this.props,
          index = this.state.itemIndex,
          clickClass = clicked ? ' clickable' : '';

    let controls = null;

    if (!content.length) {
      return null;
    }

    if (this.props.controls) {
      controls = this.addControls();
    }

    return (
      <div class={`slider ${clickClass}`}>
        {controls}

        <Item key={content[index].id} id={content[index].id} image={content[index].image} clicked={clicked} />
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
