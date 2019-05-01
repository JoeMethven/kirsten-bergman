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
          styles = content.featuredImage.style,
          refinedStyle = {}

    for (var style in styles) refinedStyle[style] = styles[style];

    if ('maxHeight' in refinedStyle) {
      refinedStyle.maxHeight = 'calc(100vh - ' + refinedStyle.maxHeight + ')'
    }

    return (
      <span class="gallery-image" style={{backgroundImage: "url(" + content.featuredImage.image + ")", refinedStyle}} onClick={this.itemClicked.bind(this, content.id)}/>
    )
  }
}

export default Item
