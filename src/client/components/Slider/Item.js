import React from 'react'

class Item extends React.Component {
  constructor() {
    super()
    this.itemClicked = this.itemClicked.bind(this)
  }

  itemClicked(id) {
    const { clicked } = this.props
    clicked(id)
  }

  render() {
    const { id, image, clicked } = this.props,
          clickedFn = typeof clicked === 'function' ? () => clicked(id) : null;

    return (
      <span class="slider-item" style={{backgroundImage: `url(${image})`}} onClick={clickedFn}/>
    )
  }
}

export default Item
