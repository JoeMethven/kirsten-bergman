import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'

import Item from './Item'

class Slider extends React.Component {
  constructor() {
    super();

    this.previousItem = this.previousItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.startTransition = this.startTransition.bind(this);
    this.endTransition = this.endTransition.bind(this);

    this.state = {
      itemIndex: 0,
      transitionInterval: null,
      controlTimeout: null
    }
  }

  componentDidMount() {
    this.startTransition();
  }

  componentWillUnmount() {
    this.endTransition();
    this.endControlTimeout();
  }

  // loopItems() {
  //   const { content } = this.props
  //
  //   let index = this.state.itemIndex
  //
  //   index++
  //   if (typeof content[index] === 'undefined') index = 0
  //
  //   this.setState({
  //     timeout: setTimeout(() => {
  //       this.setState({itemIndex: index})
  //
  //       this.loopItems(this.state.itemIndex)
  //     }, this.props.slideDuration)
  //   })
  // }

  endTransition() {
    if (this.props.transition) {
      clearInterval(this.state.transitionInterval);
    }
  }

  startTransition() {
    if (this.props.transition) {
      this.setState({ transitionInterval: setInterval(this.nextItem, this.props.sliderDuration) });
    }
  }

  previousItem() {
    let index = this.state.itemIndex - 1
    if (index < 0) index = this.state.itemIndex

    this.setState({
      itemIndex: index
    })
  }

  nextItem() {
    console.log("nextItem", this.state.itemIndex);
    let index = this.state.itemIndex + 1
    if (index >= this.props.items.length) index = 0

    this.setState({
      itemIndex: index
    })
  }

  endControlTimeout() {
    clearTimeout(this.state.controlTimeout);
  }

  controlClicked(index) {
    this.endTransition();

    clearTimeout(this.state.controlTimeout);

    this.setState({
      itemIndex: index,
      controlTimeout: setTimeout(() => {
        if (this.state.itemIndex === index) this.startTransition();
      }, this.props.sliderDuration)
    });
  }

  addControls() {
    return (
      <ul class="slider-controls">
        { this.props.items.map((item, index) => (
          <li key={item.id} onClick={() => this.controlClicked(index)} />
        )) }
      </ul>
    )
  }

  render() {
    const { items, clicked } = this.props,
          index = this.state.itemIndex,
          clickClass = clicked ? ' clickable' : '';

    let controls = null;

    if (!items.length) {
      return null;
    }

    if (this.props.controls) {
      controls = this.addControls();
    }

    console.log("index", index);
    console.log("items[index]", items[index]);

    return (
      <div class={`slider ${clickClass}`}>
        {controls}

        <Item key={items[index].id} id={items[index].id} image={items[index].image} clicked={clicked} />
      </div>
    )
  }
}

Slider.propTypes = {
  sliderDuration: PropTypes.number,
  transition: PropTypes.bool,
  items: PropTypes.array.isRequired,
  controls: PropTypes.bool
}

Slider.defaultProps = {
  sliderDuration: 5000,
  transition: true,
  controls: false
}

export default Slider
