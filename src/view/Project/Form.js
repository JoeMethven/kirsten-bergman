import React from "react";

export default class Form extends React.Component {
  render() {
    const { content } = this.props
    let title, date, description, images

    if (content) {
      title = content.title
      date = content.date
      description = content.description
      images = content.images
    } else {
      title = ''
      date = ''
      description = ''
      images = ''
    }

    if (images) {
      images = images.map(image => <img src={image} />)
    }

    return (
      <form>
        <input type="text" placeholder="Title" value={title}/>
        <input type="date" placeholder="Date" value={date} />
        <textarea>
          {description}
        </textarea>
        {images}
      </form>
    )
  }
}
