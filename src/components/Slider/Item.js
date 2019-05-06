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
    const { content } = this.props,
          image = `data:${content.images[0].contentType};base64,${content.images[0].data}`;

    return (
      <span class="slider-item" style={{backgroundImage: `url(${image})`}} onClick={this.itemClicked.bind(this, content._id)}/>
    )
  }
}

export default Item
